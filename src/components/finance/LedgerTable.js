import { money } from '../../data/appData.js';

export function LedgerTable({ title, description, data }) {
  const total = data.reduce((sum, row) => sum + row[4], 0);
  const rows = data.map(row => {
    const [receipt, date, memberStand, branch, amount] = row;
    const [stand, member] = memberStand.split(' — ');
    return `
      <tr>
        <td><code>${receipt}</code></td>
        <td>${date}</td>
        <td><strong>${member}</strong><div class="table-subtext">${stand}</div></td>
        <td>${branch}</td>
        <td><strong>${money(amount)}</strong></td>
        <td><span class="badge rounded-pill text-bg-success">Verified</span></td>
      </tr>
    `;
  }).join('');

  return `
    <div class="dashboard-stat-grid ledger-stats mb-3">
      <div class="info-box shanduko-stat-card"><span class="info-box-icon text-bg-primary"><i class="bi bi-receipt"></i></span><div class="info-box-content"><span class="info-box-text">Period receipts</span><span class="info-box-number">${data.length}</span><span class="info-box-note">Paper-linked entries</span></div></div>
      <div class="info-box shanduko-stat-card"><span class="info-box-icon text-bg-success"><i class="bi bi-cash-stack"></i></span><div class="info-box-content"><span class="info-box-text">Ledger total</span><span class="info-box-number">${money(total)}</span><span class="info-box-note">Current sample period</span></div></div>
      <div class="info-box shanduko-stat-card"><span class="info-box-icon text-bg-warning"><i class="bi bi-check2-circle"></i></span><div class="info-box-content"><span class="info-box-text">Integrity</span><span class="info-box-number">Balanced</span><span class="info-box-note">Source documents matched</span></div></div>
    </div>

    <section class="card shanduko-card">
      <header class="card-header">
        <h3 class="card-title">${title}</h3>
        <div class="card-tools d-flex align-items-center gap-2"><span class="card-note">${description}</span><button class="btn btn-sm btn-outline-secondary"><i class="bi bi-download me-1"></i>Export</button></div>
      </header>
      <div class="card-body p-0 table-responsive">
        <table class="table table-hover align-middle mb-0 shanduko-table">
          <thead><tr><th>Receipt #</th><th>Processing date</th><th>Member / Stand</th><th>Bank branch context</th><th>Amount</th><th>Status</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </section>
  `;
}
