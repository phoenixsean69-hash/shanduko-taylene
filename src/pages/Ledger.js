import {
  formatCurrencyFromCents,
  formatDate,
} from '../services/liveData.js';

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

export function LedgerView({
  kind,
  rows = [],
  loading = false,
  error = '',
} = {}) {
  const development =
    kind === 'development';

  const title =
    development
      ? 'Development Finance Tracking'
      : 'Admin Finance Tracking';

  const subtitle =
    development
      ? 'Infrastructure and development finance records.'
      : 'Administrative finance records.';

  const total =
    rows.reduce(
      (sum, row) =>
        sum + Number(row.amountCents || 0),
      0
    );

  let body = '';

  if (loading) {
    body = `
      <tr>
        <td colspan="6" class="registry-state">
          <span
            class="spinner-border spinner-border-sm"
            aria-hidden="true"
          ></span>
          Loading finance records...
        </td>
      </tr>
    `;
  } else if (error) {
    body = `
      <tr>
        <td
          colspan="6"
          class="registry-state registry-state-error"
        >
          ${escapeHtml(error)}
        </td>
      </tr>
    `;
  } else if (!rows.length) {
    body = `
      <tr>
        <td colspan="6" class="registry-state">
          No ${development ? 'development' : 'admin'}
          finance records exist yet.
        </td>
      </tr>
    `;
  } else {
    body = rows.map(row => `
      <tr>

        <td>
          <code>
            ${escapeHtml(
              row.receiptNumber ||
              row.$id
            )}
          </code>
        </td>

        <td>
          ${formatDate(
            row.depositDate ||
            row.$createdAt
          )}
        </td>

        <td>
          <strong>
            ${escapeHtml(
              row.memberName ||
              '—'
            )}
          </strong>

          <small>
            ${escapeHtml(
              row.standNumber ||
              '—'
            )}
          </small>
        </td>

        <td>
          ${escapeHtml(
            row.bankBranch ||
            '—'
          )}
        </td>

        <td class="amount">
          ${formatCurrencyFromCents(
            row.amountCents
          )}
        </td>

        <td>
          <span class="status-badge">
            ${escapeHtml(
              row.status ||
              'recorded'
            )}
          </span>
        </td>

      </tr>
    `).join('');
  }

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

        <button
          class="secondary-button"
          type="button"
        >
          <i class="bi bi-download"></i>
          Export
        </button>

      </header>

      <div class="ledger-summary">

        <div>
          <span>Records</span>
          <strong>${rows.length}</strong>
        </div>

        <div>
          <span>Total Tracked</span>
          <strong>
            ${formatCurrencyFromCents(total)}
          </strong>
        </div>

        <div>
          <span>Tracking State</span>
          <strong>Current</strong>
        </div>

      </div>

      <div class="table-scroll">

        <table class="data-table ledger-table">

          <thead>
            <tr>
              <th>Reference</th>
              <th>Record Date</th>
              <th>Member Association</th>
              <th>Reference / Branch</th>
              <th>Tracked Amount (USD)</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            ${body}
          </tbody>

        </table>

      </div>

    </section>
  `;
}

export function AdminLedger() {
  return LedgerView({
    kind: 'admin',
    loading: true,
  });
}

export function DevelopmentLedger() {
  return LedgerView({
    kind: 'development',
    loading: true,
  });
}