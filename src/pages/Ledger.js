import { adminLedger, developmentLedger } from '../data/appData.js';
import { LedgerTable } from '../components/finance/LedgerTable.js';

export function AdminLedger() {
  return LedgerTable({
    title: 'Admin Fees Ledger',
    description: 'Operational administration, compliance certificates and staff overheads.',
    data: adminLedger,
  });
}

export function DevelopmentLedger() {
  return LedgerTable({
    title: 'Development Fees Ledger',
    description: 'Civil engineering, trenching, road layers and electrical connectivity.',
    data: developmentLedger,
  });
}
