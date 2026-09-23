import {
  money
} from '../../data/appData.js';

export function LedgerTable({
  kind,
  title,
  subtitle,
  data
}) {
  const total =
    data.reduce(
      (sum, record) => sum + record[4],
      0
    );

  const development =
    kind === 'development';

  return `
    <section
      class="surface-card ledger-view ${
        development
          ? 'development-ledger'
          : 'admin-ledger'
      }"
    >

      <header class="surface-card-header ledger-head">
        <div>
          <div class="ledger-label">
            ${development ? 'TRACK B' : 'TRACK A'}
          </div>

          <h2>${title}</h2>
          <p>${subtitle}</p>
        </div>

        <button class="secondary-button">
          <i class="bi bi-download"></i>
          Export
        </button>
      </header>

      <div class="ledger-summary">
        <div>
          <span>Tracked Records</span>
          <strong>${data.length}</strong>
        </div>

        <div>
          <span>Total Tracked</span>
          <strong>${money(total)}</strong>
        </div>

        <div>
          <span>Record Integrity</span>
          <strong>Verified</strong>
        </div>
      </div>

      <div class="table-scroll">

        <table class="data-table ledger-table">

          <thead>
            <tr>
              <th>Record / Receipt Ref</th>
              <th>Record Date</th>
              <th>Member Association</th>
              <th>Reference / Branch</th>
              <th>Tracked Amount (USD)</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            ${data.map(record => `
              <tr>
                <td>
                  <code>${record[0]}</code>
                </td>

                <td>${record[1]}</td>

                <td>
                  <strong>${record[2]}</strong>
                </td>

                <td>${record[3]}</td>

                <td class="amount">
                  ${money(record[4])}
                </td>

                <td>
                  <span class="status-badge">
                    Verified
                  </span>
                </td>
              </tr>
            `).join('')}
          </tbody>

        </table>

      </div>

    </section>
  `;
}