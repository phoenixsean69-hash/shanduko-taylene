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
    ? 'Membership Register'
    : 'Added by Administrator';
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

            <div>
              <strong>
                ${escapeHtml(member.fullName)}
              </strong>

              <small>
                ${escapeHtml(member.memberCode)}
              </small>
            </div>
          </div>
        </td>

        <td>
          ${escapeHtml(member.nationalId)}
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
          <span class="beneficiary-count">
            ${Number(member.beneficiaryCount || 0)} / 5
          </span>
        </td>

        <td>
          <span class="ledger-badge admin">
            ${escapeHtml(
              sourceLabel(member)
            )}
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

        <td>
          ${escapeHtml(
            String(
              member.verificationStatus ||
              'pending'
            ).replaceAll('_', ' ')
          )}
        </td>

        <td>
          <div class="member-row-actions">

            <a
              class="secondary-button"
              href="#/member?member=${encodeURIComponent(member.$id)}"
              style="text-decoration:none"
              title="View member"
            >
              <i class="bi bi-eye"></i>
              View
            </a>

            <a
              class="secondary-button"
              href="#/edit-member?member=${encodeURIComponent(member.$id)}"
              style="text-decoration:none"
              title="Edit member"
            >
              <i class="bi bi-pencil-square"></i>
              Edit
            </a>

          </div>
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
            Membership and household records
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
              ? 'Loading records...'
              : `${members.length} member records`
          }
        </span>

      </div>

      <div class="table-scroll">

        <table class="data-table">

          <thead>
            <tr>
              <th>Member</th>
              <th>National ID</th>
              <th>Stand</th>
              <th>WhatsApp</th>
              <th>Spouse</th>
              <th>Beneficiaries</th>
              <th>Source</th>
              <th>Status</th>
              <th>Verification</th>
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