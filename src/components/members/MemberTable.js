function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function renderRows(members) {
  return members.map(member => {
    const fullName =
      `${member.firstNames || ''} ${member.surname || ''}`.trim();

    return `
      <tr>
        <td>
          <code>${escapeHtml(member.registerOrder)}</code>
        </td>

        <td>
          <strong>${escapeHtml(fullName)}</strong>
          <small>${escapeHtml(member.nationalId)}</small>
        </td>

        <td>
          <strong>${escapeHtml(member.standNumber)}</strong>
        </td>

        <td>
          ${escapeHtml(member.whatsappContact)}
        </td>

        <td>
          <span class="ledger-badge admin">
            Source Register
          </span>
        </td>

        <td>
          <span class="status-badge">
            Registered
          </span>
        </td>
      </tr>
    `;
  }).join('');
}

export function MemberTable({
  members = [],
  loading = false,
  error = '',
} = {}) {
  const body = loading
    ? `
      <tr>
        <td colspan="6" class="registry-state">
          <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
          Loading the cooperative register from Appwrite...
        </td>
      </tr>
    `
    : error
      ? `
        <tr>
          <td colspan="6" class="registry-state registry-state-error">
            <i class="bi bi-exclamation-triangle"></i>
            ${escapeHtml(error)}
          </td>
        </tr>
      `
      : renderRows(members);

  return `
    <section class="surface-card">

      <header class="surface-card-header">
        <div>
          <h2>78 Stands Membership Register</h2>
          <p>
            Live Shanduko cooperative source register from Appwrite
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
            placeholder="Search name, stand, National ID or contact..."
            ${loading ? 'disabled' : ''}
          >
        </label>

        <span class="table-note">
          ${loading
            ? 'Connecting to Appwrite...'
            : `${members.length} authoritative register records loaded`}
        </span>

      </div>

      <div class="table-scroll">

        <table class="data-table">

          <thead>
            <tr>
              <th>Register #</th>
              <th>Member</th>
              <th>Stand / Plot</th>
              <th>WhatsApp Contact</th>
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