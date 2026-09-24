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

function sumCents(rows) {
  return rows.reduce(
    (total, row) =>
      total + Number(row.amountCents || 0),
    0
  );
}

function Stat({
  icon,
  label,
  value,
  note,
  tone,
}) {
  return `
    <article class="stat-card ${tone}">
      <div class="stat-icon">
        <i class="bi ${icon}"></i>
      </div>

      <div class="stat-copy">
        <span class="stat-label">
          ${escapeHtml(label)}
        </span>

        <strong>
          ${escapeHtml(value)}
        </strong>

        <small>
          ${escapeHtml(note)}
        </small>
      </div>
    </article>
  `;
}

function financeCard({
  label,
  icon,
  rows,
  href,
}) {
  const total =
    sumCents(rows);

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
        <strong>${escapeHtml(label)}</strong>
        <small>
          ${rows.length} real tracked record${
            rows.length === 1 ? '' : 's'
          }
        </small>
      </span>

      <span class="finance-tracking-total">
        <small>Total tracked</small>
        <strong>
          ${formatCurrencyFromCents(total)}
        </strong>
      </span>

      <i class="bi bi-chevron-right"></i>
    </a>
  `;
}

function recentFinanceRows(
  adminLedger,
  developmentLedger
) {
  return [
    ...adminLedger.map(row => ({
      ...row,
      ledgerName: 'Admin Finance',
      ledgerClass: 'admin',
    })),

    ...developmentLedger.map(row => ({
      ...row,
      ledgerName: 'Development Finance',
      ledgerClass: 'development',
    })),
  ]
    .sort((a, b) => {
      return (
        new Date(
          b.depositDate ||
          b.$createdAt ||
          0
        ).getTime() -
        new Date(
          a.depositDate ||
          a.$createdAt ||
          0
        ).getTime()
      );
    })
    .slice(0, 6);
}

export function Dashboard({
  data = null,
  loading = false,
  error = '',
} = {}) {
  if (loading) {
    return `
      <section class="surface-card real-data-state">
        <span
          class="spinner-border spinner-border-sm"
          aria-hidden="true"
        ></span>
        Loading dashboard...
      </section>
    `;
  }

  if (error) {
    return `
      <section class="surface-card real-data-state real-data-error">
        <i class="bi bi-exclamation-triangle"></i>
        ${escapeHtml(error)}
      </section>
    `;
  }

  if (!data) {
    return '';
  }

  const {
    members,
    adminLedger,
    developmentLedger,
    auditEvents,
    profile,
    contacts,
  } = data;

  const adminTotal =
    sumCents(adminLedger);

  const developmentTotal =
    sumCents(developmentLedger);

  const legacyMembers =
    members.filter(
      member =>
        member.createdSource ===
        'legacy_register'
    ).length;

  const adminCreatedMembers =
    members.filter(
      member =>
        member.createdSource ===
        'admin_web'
    ).length;

  const pendingMembers =
    members.filter(
      member =>
        member.verificationStatus ===
        'pending'
    ).length;

  const recentFinance =
    recentFinanceRows(
      adminLedger,
      developmentLedger
    );

  return `
    <div class="stats-grid">

      ${Stat({
        icon: 'bi-people-fill',
        label: 'Member Records',
        value: String(members.length),
        note:
          `${legacyMembers} registered + ` +
          `${adminCreatedMembers} added through the system`,
        tone: 'pink',
      })}

      ${Stat({
        icon: 'bi-wallet2',
        label: 'Admin Finance',
        value:
          formatCurrencyFromCents(
            adminTotal
          ),
        note:
          `${adminLedger.length} tracked records`,
        tone: 'green',
      })}

      ${Stat({
        icon: 'bi-building',
        label: 'Development Finance',
        value:
          formatCurrencyFromCents(
            developmentTotal
          ),
        note:
          `${developmentLedger.length} tracked records`,
        tone: 'purple',
      })}

      ${Stat({
        icon: 'bi-shield-check',
        label: 'Audit Events',
        value: String(auditEvents.length),
        note:
          'Recorded audit events',
        tone: 'amber',
      })}

    </div>

    <div class="feature-grid">

      <div class="span-2">
        <section class="surface-card">

          <header class="surface-card-header">
            <div>
              <h2>Finance Tracking</h2>
              <p>
                Administrative and development finance activity
              </p>
            </div>
          </header>

          <div class="finance-tracking-grid dashboard-finance-grid">

            ${financeCard({
              label: 'Admin Finance Tracking',
              icon: 'bi-wallet2',
              rows: adminLedger,
              href: '#/admin-ledger',
            })}

            ${financeCard({
              label: 'Development Finance Tracking',
              icon: 'bi-building',
              rows: developmentLedger,
              href: '#/development-ledger',
            })}

          </div>

        </section>
      </div>

      <div class="span-1">
        <section class="surface-card">

          <header class="surface-card-header">
            <div>
              <h2>Data Integrity</h2>
              <p>Current record status</p>
            </div>
          </header>

          <div class="control-list">

            <div class="control-row">
              <div>
                <span class="control-icon">
                  <i class="bi bi-journal-check"></i>
                </span>
                <span>Source register migrated</span>
              </div>

              <strong>${legacyMembers}</strong>
            </div>

            <div class="control-row">
              <div>
                <span class="control-icon">
                  <i class="bi bi-person-plus"></i>
                </span>
                <span>Admin-created members</span>
              </div>

              <strong>${adminCreatedMembers}</strong>
            </div>

            <div class="control-row">
              <div>
                <span class="control-icon">
                  <i class="bi bi-hourglass-split"></i>
                </span>
                <span>Pending verification</span>
              </div>

              <strong>${pendingMembers}</strong>
            </div>

            <div class="control-row">
              <div>
                <span class="control-icon">
                  <i class="bi bi-shield-check"></i>
                </span>
                <span>Audit events</span>
              </div>

              <strong>${auditEvents.length}</strong>
            </div>

          </div>

        </section>
      </div>

      <div class="span-3">
        <section class="surface-card">

          <header class="surface-card-header">
            <div>
              <h2>Cooperative Profile</h2>
              <p>
                Registration details and official contacts
              </p>
            </div>
          </header>

          ${
            profile
              ? `
                <div class="cooperative-profile-grid">

                  <div>
                    <span>Cooperative</span>
                    <strong>
                      ${escapeHtml(
                        profile.cooperativeName
                      )}
                    </strong>
                  </div>

                  <div>
                    <span>Registration</span>
                    <strong>
                      ${escapeHtml(
                        profile.registrationReference
                      )}
                    </strong>
                  </div>

                  <div>
                    <span>Area</span>
                    <strong>
                      ${escapeHtml(
                        profile.area
                      )}
                    </strong>
                  </div>

                  <div>
                    <span>Address</span>
                    <strong>
                      ${escapeHtml(
                        `${profile.address}, ${profile.city}`
                      )}
                    </strong>
                  </div>

                </div>
              `
              : `
                <div class="real-data-empty">
                  No cooperative profile row exists.
                </div>
              `
          }

          <div class="official-contact-grid">
            ${
              contacts.length
                ? contacts.map(contact => `
                    <div class="official-contact">
                      <i class="bi bi-person-lines-fill"></i>

                      <span>
                        <strong>
                          ${escapeHtml(
                            contact.contactName
                          )}
                        </strong>

                        <small>
                          ${escapeHtml(
                            contact.phone
                          )}
                        </small>
                      </span>
                    </div>
                  `).join('')
                : `
                  <div class="real-data-empty">
                    No cooperative contact rows exist.
                  </div>
                `
            }
          </div>

        </section>
      </div>

      <div class="span-3">
        <section class="surface-card">

          <header class="surface-card-header">
            <div>
              <h2>Recent Finance Records</h2>
              <p>
                Recent activity across both finance tracking areas
              </p>
            </div>
          </header>

          ${
            recentFinance.length
              ? `
                <div class="table-scroll">
                  <table class="data-table">

                    <thead>
                      <tr>
                        <th>Reference</th>
                        <th>Date</th>
                        <th>Member / Stand</th>
                        <th>Tracking Area</th>
                        <th>Amount</th>
                        <th>Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      ${recentFinance.map(row => `
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
                            <span
                              class="ledger-badge ${row.ledgerClass}"
                            >
                              ${escapeHtml(
                                row.ledgerName
                              )}
                            </span>
                          </td>

                          <td>
                            <strong>
                              ${formatCurrencyFromCents(
                                row.amountCents
                              )}
                            </strong>
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
                      `).join('')}
                    </tbody>

                  </table>
                </div>
              `
              : `
                <div class="real-data-empty">
                  No finance tracking records yet.
                </div>
              `
          }

        </section>
      </div>

    </div>
  `;
}