import {
  APPWRITE,
  ID,
  Permission,
  Query,
  Role,
  storage,
  tablesDB,
} from '../lib/appwrite.js';

const PAGE_SIZE = 100;

export const MAX_BENEFICIARIES = 5;

function normalize(value) {
  return String(value ?? '').trim();
}

function nullable(value) {
  const normalized =
    normalize(value);

  return normalized || null;
}

export function formatCurrencyFromCents(value) {
  const amount =
    Number(value || 0) / 100;

  return new Intl.NumberFormat(
    'en-US',
    {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }
  ).format(amount);
}

export function formatDate(value) {
  if (!value) {
    return '—';
  }

  const parsed =
    new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    return String(value);
  }

  return new Intl.DateTimeFormat(
    'en-GB',
    {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }
  ).format(parsed);
}

async function listAllRows(
  tableId,
  extraQueries = []
) {
  const rows = [];

  for (
    let offset = 0;
    ;
    offset += PAGE_SIZE
  ) {
    const response =
      await tablesDB.listRows({
        databaseId:
          APPWRITE.databaseId,

        tableId,

        queries: [
          ...extraQueries,
          Query.limit(PAGE_SIZE),
          Query.offset(offset),
        ],
      });

    rows.push(
      ...response.rows
    );

    if (
      response.rows.length <
      PAGE_SIZE
    ) {
      break;
    }
  }

  return rows;
}

function byNewest(a, b) {
  const aDate =
    new Date(
      a.depositDate ||
      a.$createdAt ||
      0
    ).getTime();

  const bDate =
    new Date(
      b.depositDate ||
      b.$createdAt ||
      0
    ).getTime();

  return bDate - aDate;
}

export async function listMemberRecords() {
  const rows =
    await listAllRows(
      APPWRITE.memberRecordsTableId
    );

  return rows.sort((a, b) => {
    const aOrder =
      Number(
        a.sourceRegisterOrder ||
        0
      );

    const bOrder =
      Number(
        b.sourceRegisterOrder ||
        0
      );

    if (aOrder && bOrder) {
      return aOrder - bOrder;
    }

    if (aOrder) {
      return -1;
    }

    if (bOrder) {
      return 1;
    }

    return normalize(a.fullName)
      .localeCompare(
        normalize(b.fullName)
      );
  });
}

export async function getMemberRecord(
  memberId
) {
  return await tablesDB.getRow({
    databaseId:
      APPWRITE.databaseId,

    tableId:
      APPWRITE.memberRecordsTableId,

    rowId:
      memberId,
  });
}

export async function listAllBeneficiaries() {
  return await listAllRows(
    APPWRITE.beneficiariesTableId
  );
}

export async function listMemberBeneficiaries(
  memberId
) {
  const rows =
    await listAllRows(
      APPWRITE.beneficiariesTableId,
      [
        Query.equal(
          'memberRecordId',
          [memberId]
        )
      ]
    );

  return rows.sort(
    (a, b) =>
      Number(a.displayOrder || 0) -
      Number(b.displayOrder || 0)
  );
}

export async function listMembersWithBeneficiaryCounts() {
  const [
    members,
    beneficiaries,
  ] = await Promise.all([
    listMemberRecords(),
    listAllBeneficiaries(),
  ]);

  const counts =
    new Map();

  for (const beneficiary of beneficiaries) {
    const memberId =
      String(
        beneficiary.memberRecordId
      );

    counts.set(
      memberId,
      (counts.get(memberId) || 0) + 1
    );
  }

  return members.map(
    member => ({
      ...member,

      beneficiaryCount:
        counts.get(
          String(member.$id)
        ) || 0,
    })
  );
}

export async function listAdminLedger() {
  const rows =
    await listAllRows(
      APPWRITE.adminLedgerTableId
    );

  return rows.sort(byNewest);
}

export async function listDevelopmentLedger() {
  const rows =
    await listAllRows(
      APPWRITE.developmentLedgerTableId
    );

  return rows.sort(byNewest);
}

export async function listAuditEvents() {
  const rows =
    await listAllRows(
      APPWRITE.auditTableId
    );

  return rows.sort(
    (a, b) =>
      new Date(
        b.$createdAt || 0
      ).getTime() -
      new Date(
        a.$createdAt || 0
      ).getTime()
  );
}

export async function getCooperativeProfile() {
  const rows =
    await listAllRows(
      APPWRITE.profileTableId
    );

  return rows[0] || null;
}

export async function listCooperativeContacts() {
  const rows =
    await listAllRows(
      APPWRITE.contactsTableId
    );

  return rows.sort(
    (a, b) =>
      Number(a.displayOrder || 0) -
      Number(b.displayOrder || 0)
  );
}

export async function loadDashboardData() {
  const [
    members,
    adminLedger,
    developmentLedger,
    auditEvents,
    profile,
    contacts,
  ] = await Promise.all([
    listMemberRecords(),
    listAdminLedger(),
    listDevelopmentLedger(),
    listAuditEvents(),
    getCooperativeProfile(),
    listCooperativeContacts(),
  ]);

  return {
    members,
    adminLedger,
    developmentLedger,
    auditEvents,
    profile,
    contacts,
  };
}

async function uploadPhoto(file) {
  if (!file) {
    return null;
  }

  const uploaded =
    await storage.createFile({
      bucketId:
        APPWRITE.memberPhotosBucketId,

      fileId:
        ID.unique(),

      file,

      permissions: [
        Permission.read(
          Role.team(
            APPWRITE.adminTeamId
          )
        ),

        Permission.update(
          Role.team(
            APPWRITE.adminTeamId
          )
        ),

        Permission.delete(
          Role.team(
            APPWRITE.adminTeamId
          )
        ),
      ],
    });

  return uploaded.$id;
}

async function safelyDeletePhoto(
  fileId
) {
  if (!fileId) {
    return;
  }

  try {
    await storage.deleteFile({
      bucketId:
        APPWRITE.memberPhotosBucketId,

      fileId,
    });
  } catch {
    // Best-effort cleanup only.
  }
}

function memberCodeFromStand(
  stand
) {
  const normalized =
    normalize(stand);

  if (!/^\d+$/.test(normalized)) {
    throw new Error(
      'Stand / Plot Number must contain digits only.'
    );
  }

  return `SH-${normalized.padStart(6, '0')}`;
}

function collectMemberValues(form) {
  const values =
    Object.fromEntries(
      new FormData(form).entries()
    );

  const firstNames =
    normalize(values.firstNames);

  const surname =
    normalize(values.surname);

  const nationalId =
    normalize(values.nationalId);

  const standNumber =
    normalize(values.standNumber);

  const whatsappContact =
    normalize(values.whatsappContact);

  if (
    !firstNames ||
    !surname ||
    !nationalId ||
    !standNumber ||
    !whatsappContact
  ) {
    throw new Error(
      'Complete all required member identity fields.'
    );
  }

  const status =
    normalize(values.status) ||
    'pending';

  const verificationStatus =
    normalize(
      values.verificationStatus
    ) ||
    'pending';

  return {
    values,

    data: {
      memberCode:
        memberCodeFromStand(
          standNumber
        ),

      fullName:
        `${firstNames} ${surname}`.trim(),

      surname,
      firstNames,
      nationalId,
      standNumber,
      whatsappContact,

      spouseFullName:
        nullable(
          values.spouseFullName
        ),

      spouseNationalId:
        nullable(
          values.spouseNationalId
        ),

      nextOfKinName:
        nullable(
          values.nextOfKinName
        ),

      nextOfKinRelationship:
        nullable(
          values.nextOfKinRelationship
        ),

      nextOfKinPhone:
        nullable(
          values.nextOfKinPhone
        ),

      status,
      verificationStatus,

      notes:
        nullable(
          values.notes
        ),
    },
  };
}

function collectBeneficiarySlots(form) {
  const cards =
    [
      ...form.querySelectorAll(
        '[data-beneficiary-card]'
      ),
    ];

  const populated = [];

  for (const [index, card] of cards.entries()) {
    const fullName =
      normalize(
        card.querySelector(
          '[data-beneficiary-name]'
        )?.value
      );

    const relationship =
      normalize(
        card.querySelector(
          '[data-beneficiary-relationship]'
        )?.value
      );

    const allocationText =
      normalize(
        card.querySelector(
          '[data-beneficiary-allocation]'
        )?.value
      );

    const photoInput =
      card.querySelector(
        '[data-beneficiary-photo]'
      );

    const beneficiaryId =
      normalize(
        card.querySelector(
          '[data-beneficiary-id]'
        )?.value
      );

    const currentPhotoFileId =
      normalize(
        card.querySelector(
          '[data-beneficiary-current-photo]'
        )?.value
      );

    const removeCurrentPhoto =
      Boolean(
        card.querySelector(
          '[data-beneficiary-remove-photo]'
        )?.checked
      );

    const hasAnyValue =
      fullName ||
      relationship ||
      allocationText ||
      photoInput?.files?.length ||
      beneficiaryId;

    if (!hasAnyValue) {
      continue;
    }

    if (!fullName) {
      throw new Error(
        `Beneficiary ${index + 1} requires a full name.`
      );
    }

    const allocationPct =
      Number(allocationText);

    if (
      !Number.isFinite(
        allocationPct
      ) ||
      allocationPct < 0 ||
      allocationPct > 100
    ) {
      throw new Error(
        `Beneficiary ${index + 1} allocation must be between 0 and 100.`
      );
    }

    populated.push({
      beneficiaryId:
        beneficiaryId || null,

      fullName,
      relationship:
        relationship || null,

      allocationPct,

      displayOrder:
        populated.length + 1,

      newPhoto:
        photoInput?.files?.[0] ||
        null,

      currentPhotoFileId:
        currentPhotoFileId || null,

      removeCurrentPhoto,
    });
  }

  if (
    populated.length >
    MAX_BENEFICIARIES
  ) {
    throw new Error(
      `A member can have a maximum of ${MAX_BENEFICIARIES} beneficiaries.`
    );
  }

  const allocationTotal =
    populated.reduce(
      (total, item) =>
        total +
        Number(
          item.allocationPct || 0
        ),
      0
    );

  if (allocationTotal > 100.000001) {
    throw new Error(
      'Beneficiary allocations cannot exceed 100% in total.'
    );
  }

  return populated;
}

function compactMemberSnapshot(row) {
  if (!row) {
    return null;
  }

  const keys = [
    'memberCode',
    'fullName',
    'surname',
    'firstNames',
    'nationalId',
    'standNumber',
    'whatsappContact',
    'spouseFullName',
    'spouseNationalId',
    'nextOfKinName',
    'nextOfKinRelationship',
    'nextOfKinPhone',
    'status',
    'verificationStatus',
    'createdSource',
    'memberPhotoFileId',
    'spousePhotoFileId',
    'notes',
  ];

  return Object.fromEntries(
    keys.map(
      key => [
        key,
        row[key] ?? null,
      ]
    )
  );
}

async function writeAudit({
  memberId,
  action,
  user,
  summary,
  before,
  after,
}) {
  try {
    await tablesDB.createRow({
      databaseId:
        APPWRITE.databaseId,

      tableId:
        APPWRITE.auditTableId,

      rowId:
        ID.unique(),

      data: {
        entityType:
          'member',

        entityId:
          memberId,

        action,

        actorUserId:
          user.$id,

        actorRole:
          'administrator',

        summary,

        beforeJson:
          before
            ? JSON.stringify(before)
            : null,

        afterJson:
          after
            ? JSON.stringify(after)
            : null,

        verificationResult:
          'not_required',

        deviceContext:
          typeof navigator !== 'undefined'
            ? navigator.userAgent
            : null,
      },
    });
  } catch (error) {
    console.warn(
      'Audit event could not be recorded:',
      error
    );
  }
}

async function syncBeneficiaries({
  memberId,
  form,
  user,
}) {
  const desired =
    collectBeneficiarySlots(
      form
    );

  const existing =
    await listMemberBeneficiaries(
      memberId
    );

  const existingMap =
    new Map(
      existing.map(
        row => [
          String(row.$id),
          row,
        ]
      )
    );

  const desiredExistingIds =
    new Set(
      desired
        .map(
          item =>
            item.beneficiaryId
        )
        .filter(Boolean)
    );

  for (
    const beneficiaryId of desiredExistingIds
  ) {
    if (
      !existingMap.has(
        beneficiaryId
      )
    ) {
      throw new Error(
        'A beneficiary record changed while you were editing. Reload the member and try again.'
      );
    }
  }

  const createdRows = [];
  const modifiedRows = [];
  const deletedRows = [];
  const newPhotoIds = [];
  const oldPhotosToDelete = [];

  try {
    for (const item of desired) {
      let photoFileId =
        item.currentPhotoFileId ||
        null;

      if (item.newPhoto) {
        const uploadedId =
          await uploadPhoto(
            item.newPhoto
          );

        newPhotoIds.push(
          uploadedId
        );

        if (photoFileId) {
          oldPhotosToDelete.push(
            photoFileId
          );
        }

        photoFileId =
          uploadedId;
      }
      else if (
        item.removeCurrentPhoto
      ) {
        if (photoFileId) {
          oldPhotosToDelete.push(
            photoFileId
          );
        }

        photoFileId =
          null;
      }

      const data = {
        memberRecordId:
          memberId,

        fullName:
          item.fullName,

        relationship:
          item.relationship,

        allocationPct:
          item.allocationPct,

        photoFileId,

        displayOrder:
          item.displayOrder,

        createdByUserId:
          user.$id,
      };

      if (item.beneficiaryId) {
        const before =
          existingMap.get(
            item.beneficiaryId
          );

        modifiedRows.push(
          before
        );

        await tablesDB.updateRow({
          databaseId:
            APPWRITE.databaseId,

          tableId:
            APPWRITE.beneficiariesTableId,

          rowId:
            item.beneficiaryId,

          data,
        });
      }
      else {
        const created =
          await tablesDB.createRow({
            databaseId:
              APPWRITE.databaseId,

            tableId:
              APPWRITE.beneficiariesTableId,

            rowId:
              ID.unique(),

            data,
          });

        createdRows.push(
          created
        );
      }
    }

    for (const oldRow of existing) {
      if (
        desiredExistingIds.has(
          String(oldRow.$id)
        )
      ) {
        continue;
      }

      deletedRows.push(
        oldRow
      );

      await tablesDB.deleteRow({
        databaseId:
          APPWRITE.databaseId,

        tableId:
          APPWRITE.beneficiariesTableId,

        rowId:
          oldRow.$id,
      });

      if (oldRow.photoFileId) {
        oldPhotosToDelete.push(
          oldRow.photoFileId
        );
      }
    }
  } catch (error) {
    for (const created of createdRows) {
      try {
        await tablesDB.deleteRow({
          databaseId:
            APPWRITE.databaseId,

          tableId:
            APPWRITE.beneficiariesTableId,

          rowId:
            created.$id,
        });
      } catch {
        // Best effort rollback.
      }
    }

    for (const oldRow of modifiedRows) {
      try {
        await tablesDB.updateRow({
          databaseId:
            APPWRITE.databaseId,

          tableId:
            APPWRITE.beneficiariesTableId,

          rowId:
            oldRow.$id,

          data: {
            memberRecordId:
              oldRow.memberRecordId,

            fullName:
              oldRow.fullName,

            relationship:
              oldRow.relationship ??
              null,

            allocationPct:
              oldRow.allocationPct,

            photoFileId:
              oldRow.photoFileId ??
              null,

            displayOrder:
              oldRow.displayOrder,

            createdByUserId:
              oldRow.createdByUserId ??
              null,
          },
        });
      } catch {
        // Best effort rollback.
      }
    }

    for (const oldRow of deletedRows) {
      try {
        await tablesDB.createRow({
          databaseId:
            APPWRITE.databaseId,

          tableId:
            APPWRITE.beneficiariesTableId,

          rowId:
            oldRow.$id,

          data: {
            memberRecordId:
              oldRow.memberRecordId,

            fullName:
              oldRow.fullName,

            relationship:
              oldRow.relationship ??
              null,

            allocationPct:
              oldRow.allocationPct,

            photoFileId:
              oldRow.photoFileId ??
              null,

            displayOrder:
              oldRow.displayOrder,

            createdByUserId:
              oldRow.createdByUserId ??
              null,
          },
        });
      } catch {
        // Best effort rollback.
      }
    }

    await Promise.all(
      newPhotoIds.map(
        safelyDeletePhoto
      )
    );

    throw error;
  }

  await Promise.all(
    [...new Set(
      oldPhotosToDelete.filter(Boolean)
    )].map(
      safelyDeletePhoto
    )
  );

  return await listMemberBeneficiaries(
    memberId
  );
}

function buildMemberUpdateData({
  form,
  currentMember,
  user,
  createMode,
}) {
  const {
    values,
    data,
  } =
    collectMemberValues(
      form
    );

  if (createMode) {
    data.createdSource =
      'admin_web';

    data.createdByUserId =
      user.$id;
  }
  else {
    data.createdSource =
      currentMember.createdSource;

    data.createdByUserId =
      currentMember.createdByUserId ??
      user.$id;
  }

  return {
    values,
    data,
  };
}

async function prepareMemberPhotos({
  form,
  currentMember,
}) {
  const newMemberPhoto =
    form.elements.memberPhoto
      ?.files?.[0] ||
    null;

  const newSpousePhoto =
    form.elements.spousePhoto
      ?.files?.[0] ||
    null;

  const removeMemberPhoto =
    Boolean(
      form.elements.removeMemberPhoto
        ?.checked
    );

  const removeSpousePhoto =
    Boolean(
      form.elements.removeSpousePhoto
        ?.checked
    );

  const uploadedIds = [];
  const oldPhotosToDelete = [];

  let memberPhotoFileId =
    currentMember?.memberPhotoFileId ||
    null;

  let spousePhotoFileId =
    currentMember?.spousePhotoFileId ||
    null;

  if (newMemberPhoto) {
    const uploadedId =
      await uploadPhoto(
        newMemberPhoto
      );

    uploadedIds.push(
      uploadedId
    );

    if (memberPhotoFileId) {
      oldPhotosToDelete.push(
        memberPhotoFileId
      );
    }

    memberPhotoFileId =
      uploadedId;
  }
  else if (removeMemberPhoto) {
    if (memberPhotoFileId) {
      oldPhotosToDelete.push(
        memberPhotoFileId
      );
    }

    memberPhotoFileId =
      null;
  }

  if (newSpousePhoto) {
    const uploadedId =
      await uploadPhoto(
        newSpousePhoto
      );

    uploadedIds.push(
      uploadedId
    );

    if (spousePhotoFileId) {
      oldPhotosToDelete.push(
        spousePhotoFileId
      );
    }

    spousePhotoFileId =
      uploadedId;
  }
  else if (removeSpousePhoto) {
    if (spousePhotoFileId) {
      oldPhotosToDelete.push(
        spousePhotoFileId
      );
    }

    spousePhotoFileId =
      null;
  }

  return {
    uploadedIds,
    oldPhotosToDelete,
    memberPhotoFileId,
    spousePhotoFileId,
  };
}

function restoreMemberData(
  member
) {
  return {
    memberCode:
      member.memberCode,

    fullName:
      member.fullName,

    surname:
      member.surname,

    firstNames:
      member.firstNames,

    nationalId:
      member.nationalId,

    standNumber:
      member.standNumber,

    whatsappContact:
      member.whatsappContact,

    spouseFullName:
      member.spouseFullName ??
      null,

    spouseNationalId:
      member.spouseNationalId ??
      null,

    nextOfKinName:
      member.nextOfKinName ??
      null,

    nextOfKinRelationship:
      member.nextOfKinRelationship ??
      null,

    nextOfKinPhone:
      member.nextOfKinPhone ??
      null,

    status:
      member.status,

    verificationStatus:
      member.verificationStatus,

    createdSource:
      member.createdSource,

    sourceRegisterId:
      member.sourceRegisterId ??
      null,

    sourceRegisterOrder:
      member.sourceRegisterOrder ??
      null,

    createdByUserId:
      member.createdByUserId ??
      null,

    ownerUserId:
      member.ownerUserId ??
      null,

    memberPhotoFileId:
      member.memberPhotoFileId ??
      null,

    spousePhotoFileId:
      member.spousePhotoFileId ??
      null,

    notes:
      member.notes ??
      null,
  };
}

export async function saveMemberRecord({
  form,
  user,
  memberId = null,
}) {
  if (!form) {
    throw new Error(
      'Member form was not found.'
    );
  }

  if (!user?.$id) {
    throw new Error(
      'An authenticated administrator is required.'
    );
  }

  const createMode =
    !memberId;

  const currentMember =
    createMode
      ? null
      : await getMemberRecord(
          memberId
        );

  collectBeneficiarySlots(
    form
  );

  const {
    data,
  } =
    buildMemberUpdateData({
      form,
      currentMember,
      user,
      createMode,
    });

  const photoState =
    await prepareMemberPhotos({
      form,
      currentMember,
    });

  data.memberPhotoFileId =
    photoState.memberPhotoFileId;

  data.spousePhotoFileId =
    photoState.spousePhotoFileId;

  let savedMember = null;

  try {
    if (createMode) {
      savedMember =
        await tablesDB.createRow({
          databaseId:
            APPWRITE.databaseId,

          tableId:
            APPWRITE.memberRecordsTableId,

          rowId:
            ID.unique(),

          data,
        });
    }
    else {
      savedMember =
        await tablesDB.updateRow({
          databaseId:
            APPWRITE.databaseId,

          tableId:
            APPWRITE.memberRecordsTableId,

          rowId:
            memberId,

          data,
        });
    }

    try {
      await syncBeneficiaries({
        memberId:
          savedMember.$id,

        form,
        user,
      });
    } catch (beneficiaryError) {
      if (createMode) {
        const partialBeneficiaries =
          await listMemberBeneficiaries(
            savedMember.$id
          ).catch(
            () => []
          );

        for (
          const beneficiary of partialBeneficiaries
        ) {
          try {
            await tablesDB.deleteRow({
              databaseId:
                APPWRITE.databaseId,

              tableId:
                APPWRITE.beneficiariesTableId,

              rowId:
                beneficiary.$id,
            });

            if (
              beneficiary.photoFileId
            ) {
              await safelyDeletePhoto(
                beneficiary.photoFileId
              );
            }
          } catch {
            // Best effort cleanup.
          }
        }

        await tablesDB.deleteRow({
          databaseId:
            APPWRITE.databaseId,

          tableId:
            APPWRITE.memberRecordsTableId,

          rowId:
            savedMember.$id,
        });
      }
      else {
        await tablesDB.updateRow({
          databaseId:
            APPWRITE.databaseId,

          tableId:
            APPWRITE.memberRecordsTableId,

          rowId:
            memberId,

          data:
            restoreMemberData(
              currentMember
            ),
        });
      }

      throw beneficiaryError;
    }

    await Promise.all(
      [...new Set(
        photoState.oldPhotosToDelete
          .filter(Boolean)
      )].map(
        safelyDeletePhoto
      )
    );

    await writeAudit({
      memberId:
        savedMember.$id,

      action:
        createMode
          ? 'member_created'
          : 'member_updated',

      user,

      summary:
        createMode
          ? `Member ${savedMember.memberCode} created`
          : `Member ${savedMember.memberCode} updated`,

      before:
        createMode
          ? null
          : compactMemberSnapshot(
              currentMember
            ),

      after:
        compactMemberSnapshot(
          savedMember
        ),
    });

    return savedMember;
  } catch (error) {
    await Promise.all(
      photoState.uploadedIds
        .filter(Boolean)
        .map(
          safelyDeletePhoto
        )
    );

    throw error;
  }
}