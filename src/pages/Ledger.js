import {
  adminLedger,
  developmentLedger
} from '../data/appData.js';

import {
  LedgerTable
} from '../components/finance/LedgerTable.js';

export function AdminLedger() {
  return LedgerTable({
    kind: 'admin',
    title: 'Admin Finance Tracking',
    subtitle:
      'Read-only tracking of administrative finance records and supporting references.',
    data: adminLedger,
  });
}

export function DevelopmentLedger() {
  return LedgerTable({
    kind: 'development',
    title: 'Development Finance Tracking',
    subtitle:
      'Read-only tracking of infrastructure and development finance records.',
    data: developmentLedger,
  });
}