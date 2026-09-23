import {
  Account,
  Client,
  ID,
  Permission,
  Query,
  Role,
  Storage,
  TablesDB,
} from 'appwrite';

export const APPWRITE = Object.freeze({
  endpoint:
    import.meta.env.VITE_APPWRITE_ENDPOINT ||
    'https://syd.cloud.appwrite.io/v1',

  projectId:
    import.meta.env.VITE_APPWRITE_PROJECT_ID ||
    'shanduko-id',

  databaseId:
    import.meta.env.VITE_APPWRITE_DATABASE_ID ||
    'shanduko',

  memberRecordsTableId:
    import.meta.env.VITE_APPWRITE_MEMBER_RECORDS_TABLE_ID ||
    'member_records',

  adminLedgerTableId:
    import.meta.env.VITE_APPWRITE_ADMIN_LEDGER_TABLE_ID ||
    'admin_ledger',

  developmentLedgerTableId:
    import.meta.env.VITE_APPWRITE_DEVELOPMENT_LEDGER_TABLE_ID ||
    'development_ledger',

  auditTableId:
    import.meta.env.VITE_APPWRITE_AUDIT_TABLE_ID ||
    'audit_events',

  profileTableId:
    import.meta.env.VITE_APPWRITE_PROFILE_TABLE_ID ||
    'cooperative_profile',

  contactsTableId:
    import.meta.env.VITE_APPWRITE_CONTACTS_TABLE_ID ||
    'cooperative_contacts',

  memberPhotosBucketId:
    import.meta.env.VITE_APPWRITE_MEMBER_PHOTOS_BUCKET_ID ||
    'member_photos',

  adminTeamId: 'shanduko-admins',
});

export const client =
  new Client()
    .setEndpoint(APPWRITE.endpoint)
    .setProject(APPWRITE.projectId);

export const account =
  new Account(client);

export const tablesDB =
  new TablesDB(client);

export const storage =
  new Storage(client);

export {
  ID,
  Permission,
  Query,
  Role,
};