import {
  APPWRITE,
  Query,
  tablesDB,
} from '../lib/appwrite.js';

export async function listMembershipRegister() {
  const response = await tablesDB.listRows({
    databaseId: APPWRITE.databaseId,
    tableId: APPWRITE.membershipRegisterTableId,
    queries: [
      Query.limit(100),
    ],
  });

  return [...response.rows].sort(
    (a, b) =>
      Number(a.registerOrder || 0) -
      Number(b.registerOrder || 0)
  );
}