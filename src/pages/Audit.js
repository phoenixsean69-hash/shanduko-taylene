import {
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

function iconFor(entityType) {
  const icons = {
    member: 'bi-person-check',
    transaction: 'bi-journal-text',
    admin_ledger: 'bi-wallet2',
    development_ledger: 'bi-building',
    auth: 'bi-person-lock',
    system: 'bi-gear',
  };

  return icons[entityType] ||
    'bi-shield-check';
}

export function Audit({
  events = [],
  loading = false,
  error = '',
} = {}) {
  let eventsHtml = '';

  if (loading) {
    eventsHtml = `
      <div class="real-data-state">
        <span
          class="spinner-border spinner-border-sm"
          aria-hidden="true"
        ></span>
        Loading audit trail...
      </div>
    `;
  } else if (error) {
    eventsHtml = `
      <div class="real-data-state real-data-error">
        ${escapeHtml(error)}
      </div>
    `;
  } else if (!events.length) {
    eventsHtml = `
      <div class="real-data-empty">
        No audit events have been recorded yet.
      </div>
    `;
  } else {
    eventsHtml = `
      <div class="audit-list">
        ${events.map(event => `
          <div class="audit-event">

            <span class="audit-icon">
              <i
                class="bi ${iconFor(
                  event.entityType
                )}"
              ></i>
            </span>

            <div>
              <strong>
                ${escapeHtml(
                  event.action ||
                  'Audit event'
                )}
              </strong>

              <p>
                ${escapeHtml(
                  event.summary ||
                  `${event.entityType || 'record'} ${event.entityId || ''}`
                )}
              </p>

              <small>
                Actor:
                ${escapeHtml(
                  event.actorRole ||
                  event.actorUserId ||
                  'system'
                )}
              </small>
            </div>

            <time>
              ${formatDate(
                event.$createdAt
              )}
            </time>

          </div>
        `).join('')}
      </div>
    `;
  }

  return `
    <div class="audit-grid">

      <section class="surface-card">

        <header class="surface-card-header">
          <div>
            <h2>Audit Trail</h2>
            <p>
              Recorded system activity and control events
            </p>
          </div>
        </header>

        ${eventsHtml}

      </section>

      <section class="surface-card">

        <header class="surface-card-header">
          <div>
            <h2>Current Control State</h2>
            <p>
              Based on actual stored audit data
            </p>
          </div>
        </header>

        <div class="check-list">

          <div>
            <i class="bi bi-database-check"></i>
            <span>
              Audit events stored:
              ${events.length}
            </span>
          </div>

          <div>
            <i class="bi bi-shield-lock"></i>
            <span>
              Browser access is authenticated
            </span>
          </div>

          <div>
            <i class="bi bi-journal-check"></i>
            <span>
              No sample audit events are displayed
            </span>
          </div>

        </div>

      </section>

    </div>
  `;
}