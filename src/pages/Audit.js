const events = [
  ['bi-receipt', 'Transaction committed', 'SHND-2026-B0899 routed to Development Fees for Stand 0812.', 'Today, 14:32'],
  ['bi-person-plus', 'Member record created', 'John Tatenda Moyo — Stand 1402, Phase 2.', 'Yesterday, 10:18'],
  ['bi-shield-check', 'Paper receipt matched', 'SHND-2026-B0892 reconciled to NMB Bank — Excellence Centre.', '26/06/2026'],
];

export function Audit() {
  return `
    <div class="row g-3">
      <div class="col-lg-7">
        <section class="card shanduko-card">
          <header class="card-header"><h3 class="card-title">Audit Trail</h3></header>
          <div class="card-body">
            ${events.map(([icon, title, text, time]) => `
              <div class="audit-event">
                <span class="audit-icon"><i class="bi ${icon}"></i></span>
                <div class="flex-grow-1"><strong>${title}</strong><div class="table-subtext">${text}</div></div>
                <time>${time}</time>
              </div>
            `).join('')}
          </div>
        </section>
      </div>
      <div class="col-lg-5">
        <section class="card shanduko-card card-outline card-success">
          <header class="card-header"><h3 class="card-title">Control Checklist</h3></header>
          <div class="card-body">
            ${['Receipt number captured from paper book','Deposit date recorded','Bank branch recorded','Ledger allocation separated','Identity evidence linked'].map(text => `
              <div class="check-row"><i class="bi bi-check-circle-fill text-success"></i><span>${text}</span></div>
            `).join('')}
          </div>
        </section>
      </div>
    </div>
  `;
}
