import {
  adminLedger,
  developmentLedger,
  money
} from '../../data/appData.js';

function tracker({
  icon,
  title,
  href,
  records
}) {
  const total =
    records.reduce(
      (sum, record) => sum + record[4],
      0
    );

  return `
    <a
      class="finance-tracking-card"
      href="${href}"
      style="text-decoration:none"
    >
      <span class="finance-tracking-icon">
        <i class="bi ${icon}"></i>
      </span>

      <span class="finance-tracking-copy">
        <strong>${title}</strong>
        <small>
          ${records.length} tracked records
        </small>
      </span>

      <span class="finance-tracking-total">
        <small>Total tracked</small>
        <strong>${money(total)}</strong>
      </span>

      <i class="bi bi-chevron-right"></i>
    </a>
  `;
}

export function FinanceTracking() {
  return `
    <section class="surface-card">

      <header class="surface-card-header">
        <div>
          <h2>Finance Tracking</h2>
          <p>
            Read-only overview of the two isolated finance ledgers
          </p>
        </div>
      </header>

      <div class="finance-tracking-grid">

        ${tracker({
          icon: 'bi-wallet2',
          title: 'Admin Finance Tracking',
          href: '#/admin-ledger',
          records: adminLedger,
        })}

        ${tracker({
          icon: 'bi-building',
          title: 'Development Finance Tracking',
          href: '#/development-ledger',
          records: developmentLedger,
        })}

      </div>

    </section>
  `;
}