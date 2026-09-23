import {
  Account,
  Client,
  Query,
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
  membershipRegisterTableId:
    import.meta.env.VITE_APPWRITE_MEMBERSHIP_REGISTER_TABLE_ID ||
    'membership_register',
});

export const client = new Client()
  .setEndpoint(APPWRITE.endpoint)
  .setProject(APPWRITE.projectId);

export const account = new Account(client);
export const tablesDB = new TablesDB(client);

export { Query };