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

function normalize(value) {
  return String(value ?? '').trim();
}

function optional(data, key, value) {
  const normalized = normalize(value);

  if (normalized) {
    data[key] = normalized;
  }
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

  const parsed = new Date(value);

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

async function listAllRows(tableId) {
  const rows = [];

  for (
    let offset = 0;
    ;
    offset += PAGE_SIZE
  ) {
    const response =
      await tablesDB.listRows({
        databaseId: APPWRITE.databaseId,
        tableId,
        queries: [
          Query.limit(PAGE_SIZE),
          Query.offset(offset),
        ],
      });

    rows.push(...response.rows);

    if (response.rows.length < PAGE_SIZE) {
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
      Number(a.sourceRegisterOrder || 0);

    const bOrder =
      Number(b.sourceRegisterOrder || 0);

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
      .localeCompare(normalize(b.fullName));
  });
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

  return rows.sort((a, b) => {
    return (
      new Date(b.$createdAt || 0).getTime() -
      new Date(a.$createdAt || 0).getTime()
    );
  });
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

async function safelyDeletePhoto(fileId) {
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
    // Cleanup is best effort. Never hide the original create error.
  }
}

function memberCodeFromStand(stand) {
  const normalized =
    normalize(stand);

  if (!/^\d+$/.test(normalized)) {
    throw new Error(
      'Stand / Plot Number must contain digits only.'
    );
  }

  return `SH-${normalized.padStart(6, '0')}`;
}

export async function createMemberRecord({
  form,
  user,
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

  const memberCode =
    memberCodeFromStand(
      standNumber
    );

  const fullName =
    `${firstNames} ${surname}`.trim();

  const memberPhoto =
    form.elements.memberPhoto
      ?.files?.[0] || null;

  const spousePhoto =
    form.elements.spousePhoto
      ?.files?.[0] || null;

  const beneficiaryPhoto =
    form.elements.beneficiaryPhoto
      ?.files?.[0] || null;

  const uploadedIds = [];

  try {
    const [
      memberPhotoFileId,
      spousePhotoFileId,
      beneficiaryPhotoFileId,
    ] = await Promise.all([
      uploadPhoto(memberPhoto),
      uploadPhoto(spousePhoto),
      uploadPhoto(beneficiaryPhoto),
    ]);

    uploadedIds.push(
      memberPhotoFileId,
      spousePhotoFileId,
      beneficiaryPhotoFileId
    );

    const data = {
      memberCode,
      fullName,
      surname,
      firstNames,
      nationalId,
      standNumber,
      whatsappContact,
      status: 'pending',
      verificationStatus: 'pending',
      createdSource: 'admin_web',
      createdByUserId: user.$id,
    };

    optional(
      data,
      'spouseFullName',
      values.spouseFullName
    );

    optional(
      data,
      'spouseNationalId',
      values.spouseNationalId
    );

    optional(
      data,
      'nextOfKinName',
      values.nextOfKinName
    );

    optional(
      data,
      'nextOfKinRelationship',
      values.nextOfKinRelationship
    );

    optional(
      data,
      'nextOfKinPhone',
      values.nextOfKinPhone
    );

    optional(
      data,
      'beneficiaryName',
      values.beneficiaryName
    );

    optional(
      data,
      'beneficiaryRelationship',
      values.beneficiaryRelationship
    );

    const allocation =
      Number(
        String(
          values.beneficiaryAllocationPct ??
          ''
        ).replace('%', '')
      );

    if (
      Number.isFinite(allocation) &&
      allocation >= 0 &&
      allocation <= 100
    ) {
      data.beneficiaryAllocationPct =
        allocation;
    }

    if (memberPhotoFileId) {
      data.memberPhotoFileId =
        memberPhotoFileId;
    }

    if (spousePhotoFileId) {
      data.spousePhotoFileId =
        spousePhotoFileId;
    }

    if (beneficiaryPhotoFileId) {
      data.beneficiaryPhotoFileId =
        beneficiaryPhotoFileId;
    }

    return await tablesDB.createRow({
      databaseId:
        APPWRITE.databaseId,

      tableId:
        APPWRITE.memberRecordsTableId,

      rowId:
        ID.unique(),

      data,
    });
  } catch (error) {
    await Promise.all(
      uploadedIds
        .filter(Boolean)
        .map(safelyDeletePhoto)
    );

    throw error;
  }
}