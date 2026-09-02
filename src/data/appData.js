export const members = [
  { id: 'SH-001402', name: 'John Tatenda Moyo', stand: '1402, Phase 2', spouse: 'Mary R. Moyo', status: 'Active', balance: 4500 },
  { id: 'SH-000244', name: 'Chipo Gumbo', stand: '0244', spouse: '—', status: 'Active', balance: 1250 },
  { id: 'SH-001109', name: 'Farai Ndlovu', stand: '1109', spouse: '—', status: 'Active', balance: 860 },
  { id: 'SH-000812', name: 'Tendai Kwenda', stand: '0812', spouse: '—', status: 'Pending', balance: 1200 },
];

export const adminLedger = [
  ['SHND-2026-B0411', '12/04/2026', 'Stand 0244 — Chipo Gumbo', 'CBZ Bank — Kwame Nkrumah', 50],
  ['SHND-2026-B0495', '19/05/2026', 'Stand 1109 — Farai Ndlovu', 'EcoCash Business Wallet', 35],
];

export const developmentLedger = [
  ['SHND-2026-B0892', '26/06/2026', 'Stand 1402 — John T. Moyo', 'NMB Bank — Excellence Centre', 450],
  ['SHND-2026-B0899', '26/06/2026', 'Stand 0812 — Tendai Kwenda', 'CABS — Central Branch', 1200],
];

export const pageMeta = {
  dashboard: ['Dashboard', 'Cooperative operations overview'],
  members: ['Member Registry', 'Search and manage cooperative member records'],
  newMember: ['Create Member Record', 'Capture member, spouse, next-of-kin and beneficiary details'],
  transactions: ['Transaction Processing', 'Route incoming payments to the correct isolated ledger'],
  adminLedger: ['Admin Fees Ledger', 'Operational administration and compliance income'],
  developmentLedger: ['Development Fees Ledger', 'Land development and infrastructure income'],
  audit: ['Audit & Controls', 'Trace receipts, deposits and ledger allocation events'],
};

export const money = value =>
  `$${Number(value).toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
