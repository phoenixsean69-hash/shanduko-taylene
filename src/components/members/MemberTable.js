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
    ? 'Register'
    : 'Admin';
}

function verificationLabel(value) {
  const normalized =
    String(value || 'pending');

  const labels = {
    source_register: 'Source',
    pending: 'Pending',
    verified: 'Verified',
    rejected: 'Rejected',
  };

  return labels[normalized] || normalized;
}

function statusClass(status) {
  return status === 'pending'
    ? 'pending'
    : '';
}

function memberPhoto(member) {
  return `
    <span class="member-registry-photo">
      ${
        member.memberPhotoUrl
          ? `
            <img
              src="${escapeHtml(member.memberPhotoUrl)}"
              alt="${escapeHtml(member.fullName)}"
            >
          `
          : `
            <span>
              ${escapeHtml(
                String(
                  member.firstNames ||
                  member.fullName ||
                  'M'
                ).charAt(0).toUpperCase()
              )}
            </span>
          `
      }
    </span>
  `;
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
        <td colspan="10" class="registry-state">
          <span
            class="spinner-border spinner-border-sm"
            aria-hidden="true"
          ></span>
          Loading member records...
        </td>
      </tr>
    `;
  } else if (error) {
    body = `
      <tr>
        <td
          colspan="10"
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
        <td colspan="10" class="registry-state">
          No member records found.
        </td>
      </tr>
    `;
  } else {
    body = members.map(member => `
      <tr>

        <td>
          <div class="registry-member-cell">
            ${memberPhoto(member)}

            <div class="registry-member-copy">
              <strong>
                ${escapeHtml(member.fullName)}
              </strong>

              <small>
                ${escapeHtml(member.memberCode)}
              </small>
            </div>
          </div>
        </td>

        <td class="registry-id-cell">
          ${escapeHtml(member.nationalId)}
        </td>

        <td>
          ${escapeHtml(member.standNumber)}
        </td>

        <td class="registry-contact-cell">
          ${escapeHtml(member.whatsappContact)}
        </td>

        <td class="registry-spouse-cell">
          ${escapeHtml(
            member.spouseFullName || '—'
          )}
        </td>

        <td class="registry-center-cell">
          <span class="beneficiary-count">
            ${Number(member.beneficiaryCount || 0)} / 5
          </span>
        </td>

        <td class="registry-center-cell">
          <span
            class="registry-mini-badge"
            title="${
              member.createdSource === 'legacy_register'
                ? 'Membership Register'
                : 'Added by Administrator'
            }"
          >
            ${escapeHtml(sourceLabel(member))}
          </span>
        </td>

        <td class="registry-center-cell">
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

        <td class="registry-center-cell">
          <span class="registry-verification">
            ${escapeHtml(
              verificationLabel(
                member.verificationStatus
              )
            )}
          </span>
        </td>

        <td class="registry-actions-cell">
          <div class="member-row-actions">

            <a
              class="registry-action-button"
              href="#/member?member=${encodeURIComponent(member.$id)}"
              title="View member"
              aria-label="View ${escapeHtml(member.fullName)}"
            >
              <i class="bi bi-eye"></i>
            </a>

            <a
              class="registry-action-button"
              href="#/edit-member?member=${encodeURIComponent(member.$id)}"
              title="Edit member"
              aria-label="Edit ${escapeHtml(member.fullName)}"
            >
              <i class="bi bi-pencil-square"></i>
            </a>

          </div>
        </td>

      </tr>
    `).join('');
  }

  return `
    <section class="surface-card member-registry-card">

      <header class="surface-card-header member-registry-header">
        <div>
          <h2>Cooperative Member Registry</h2>
          <p>Membership and household records</p>
        </div>

        <a
          href="#/new-member"
          class="primary-button member-registry-add"
          style="text-decoration:none"
        >
          <i class="bi bi-person-plus"></i>
          <span>Add Member</span>
        </a>
      </header>

      <div class="table-toolbar member-registry-toolbar">

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
              ? 'Loading...'
              : `${members.length} members`
          }
        </span>

      </div>

      <div class="table-scroll member-registry-scroll">

        <table class="data-table member-registry-table">

          <thead>
            <tr>
              <th>Member</th>
              <th>National ID</th>
              <th>Stand</th>
              <th>WhatsApp</th>
              <th>Spouse</th>
              <th>Benef.</th>
              <th>Source</th>
              <th>Status</th>
              <th>Verify</th>
              <th>Actions</th>
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