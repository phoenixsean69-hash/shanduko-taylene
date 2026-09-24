import {
  APPWRITE,
  ID,
  Query,
  storage,
  tablesDB,
} from '../lib/appwrite.js';

import {
  getMemberRecord,
  listMemberBeneficiaries,
} from './liveData.js';

function photoUrl(fileId) {
  if (!fileId) {
    return '';
  }

  try {
    return String(
      storage.getFileView({
        bucketId:
          APPWRITE.memberPhotosBucketId,

        fileId,
      })
    );
  } catch {
    return '';
  }
}

export async function getMemberReadModel(
  memberId
) {
  const [
    member,
    beneficiaries,
  ] =
    await Promise.all([
      getMemberRecord(
        memberId
      ),

      listMemberBeneficiaries(
        memberId
      ),
    ]);

  return {
    member: {
      ...member,

      memberPhotoUrl:
        photoUrl(
          member.memberPhotoFileId
        ),

      spousePhotoUrl:
        photoUrl(
          member.spousePhotoFileId
        ),
    },

    beneficiaries:
      beneficiaries.map(
        beneficiary => ({
          ...beneficiary,

          photoUrl:
            photoUrl(
              beneficiary.photoFileId
            ),
        })
      ),
  };
}

async function linkedFinanceCount(
  tableId,
  memberId
) {
  const response =
    await tablesDB.listRows({
      databaseId:
        APPWRITE.databaseId,

      tableId,

      queries: [
        Query.equal(
          'memberId',
          [memberId]
        ),
        Query.limit(1),
      ],
    });

  return Number(
    response.total ||
    response.rows.length ||
    0
  );
}

async function deletePhoto(
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
  } catch (error) {
    console.warn(
      'A stored image could not be removed:',
      error
    );
  }
}

function beneficiaryRestoreData(
  row
) {
  return {
    memberRecordId:
      row.memberRecordId,

    fullName:
      row.fullName,

    relationship:
      row.relationship ??
      null,

    allocationPct:
      row.allocationPct,

    photoFileId:
      row.photoFileId ??
      null,

    displayOrder:
      row.displayOrder,

    createdByUserId:
      row.createdByUserId ??
      null,
  };
}

async function writeDeleteAudit({
  member,
  beneficiaries,
  user,
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
          member.$id,

        action:
          'member_deleted',

        actorUserId:
          user.$id,

        actorRole:
          'administrator',

        summary:
          `Member ${member.memberCode} deleted`,

        beforeJson:
          JSON.stringify({
            memberCode:
              member.memberCode,

            fullName:
              member.fullName,

            nationalId:
              member.nationalId,

            standNumber:
              member.standNumber,

            status:
              member.status,

            beneficiaryCount:
              beneficiaries.length,
          }),

        afterJson:
          null,

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
      'Deletion audit event could not be recorded:',
      error
    );
  }
}

export async function deleteMemberRecord({
  memberId,
  user,
}) {
  if (!memberId) {
    throw new Error(
      'No member record was selected.'
    );
  }

  if (!user?.$id) {
    throw new Error(
      'An authenticated administrator is required.'
    );
  }

  const member =
    await getMemberRecord(
      memberId
    );

  const [
    adminLinks,
    developmentLinks,
    beneficiaries,
  ] =
    await Promise.all([
      linkedFinanceCount(
        APPWRITE.adminLedgerTableId,
        memberId
      ),

      linkedFinanceCount(
        APPWRITE.developmentLedgerTableId,
        memberId
      ),

      listMemberBeneficiaries(
        memberId
      ),
    ]);

  if (
    adminLinks > 0 ||
    developmentLinks > 0
  ) {
    throw new Error(
      'This member has finance records and cannot be deleted. Change the member status to Archived instead.'
    );
  }

  const deletedBeneficiaries = [];

  try {
    for (const beneficiary of beneficiaries) {
      await tablesDB.deleteRow({
        databaseId:
          APPWRITE.databaseId,

        tableId:
          APPWRITE.beneficiariesTableId,

        rowId:
          beneficiary.$id,
      });

      deletedBeneficiaries.push(
        beneficiary
      );
    }

    await tablesDB.deleteRow({
      databaseId:
        APPWRITE.databaseId,

      tableId:
        APPWRITE.memberRecordsTableId,

      rowId:
        memberId,
    });
  } catch (error) {
    /*
      If the parent delete fails after beneficiaries were removed,
      restore the removed beneficiary rows before returning the error.
    */
    for (
      const beneficiary of deletedBeneficiaries
    ) {
      try {
        await tablesDB.createRow({
          databaseId:
            APPWRITE.databaseId,

          tableId:
            APPWRITE.beneficiariesTableId,

          rowId:
            beneficiary.$id,

          data:
            beneficiaryRestoreData(
              beneficiary
            ),
        });
      } catch (restoreError) {
        console.error(
          'Beneficiary rollback failed:',
          restoreError
        );
      }
    }

    throw error;
  }

  const imageIds =
    [
      member.memberPhotoFileId,
      member.spousePhotoFileId,
      ...beneficiaries.map(
        beneficiary =>
          beneficiary.photoFileId
      ),
    ].filter(Boolean);

  await Promise.all(
    [...new Set(imageIds)]
      .map(deletePhoto)
  );

  await writeDeleteAudit({
    member,
    beneficiaries,
    user,
  });

  return {
    memberId:
      member.$id,

    memberCode:
      member.memberCode,

    fullName:
      member.fullName,
  };
}