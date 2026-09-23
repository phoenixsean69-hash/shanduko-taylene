function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function sourceLabel(member) {
  return member.createdSource === 'legacy_register'
    ? 'Source Register'
    : 'Admin Entry';
}

function statusClass(status) {
  return status === 'pending'
    ? 'pending'
    : '';
}

export function MemberTable({
  members = [],
  loading = false,
  error = '',
} = {}) {
  let body = '';

  if (loading) {
    body = `
      <tr>
        <td colspan="7" class="registry-state">
          <span
            class="spinner-border spinner-border-sm"
            aria-hidden="true"
          ></span>
          Loading real member records from Appwrite...
        </td>
      </tr>
    `;
  } else if (error) {
    body = `
      <tr>
        <td
          colspan="7"
          class="registry-state registry-state-error"
        >
          <i class="bi bi-exclamation-triangle"></i>
          ${escapeHtml(error)}
        </td>
      </tr>
    `;
  } else if (!members.length) {
    body = `
      <tr>
        <td colspan="7" class="registry-state">
          No member records exist in Appwrite yet.
        </td>
      </tr>
    `;
  } else {
    body = members.map(member => `
      <tr>

        <td>
          <code>
            ${escapeHtml(member.memberCode)}
          </code>
        </td>

        <td>
          <strong>
            ${escapeHtml(member.fullName)}
          </strong>

          <small>
            ${escapeHtml(member.nationalId)}
          </small>
        </td>

        <td>
          ${escapeHtml(member.standNumber)}
        </td>

        <td>
          ${escapeHtml(member.whatsappContact)}
        </td>

        <td>
          ${escapeHtml(
            member.spouseFullName || '—'
          )}
        </td>

        <td>
          <span class="ledger-badge admin">
            ${escapeHtml(sourceLabel(member))}
          </span>
        </td>

        <td>
          <span
            class="status-badge ${
              statusClass(member.status)
            }"
          >
            ${escapeHtml(
              member.status || 'pending'
            )}
          </span>
        </td>

      </tr>
    `).join('');
  }

  return `
    <section class="surface-card">

      <header class="surface-card-header">
        <div>
          <h2>Cooperative Member Registry</h2>
          <p>
            Live operational member records from Appwrite
          </p>
        </div>

        <a
          href="#/new-member"
          class="primary-button"
          style="text-decoration:none"
        >
          <i class="bi bi-person-plus"></i>
          <span>Add Member</span>
        </a>
      </header>

      <div class="table-toolbar">

        <label class="table-search">
          <i class="bi bi-search"></i>

          <input
            id="memberSearch"
            placeholder="Search member, stand, ID or contact..."
            ${loading ? 'disabled' : ''}
          >
        </label>

        <span class="table-note">
          ${
            loading
              ? 'Connecting to Appwrite...'
              : `${members.length} real records loaded`
          }
        </span>

      </div>

      <div class="table-scroll">

        <table class="data-table">

          <thead>
            <tr>
              <th>Member ID</th>
              <th>Member</th>
              <th>Stand / Plot</th>
              <th>WhatsApp</th>
              <th>Spouse</th>
              <th>Source</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody id="memberRows">
            ${body}
          </tbody>

        </table>

      </div>

    </section>
  `;
}