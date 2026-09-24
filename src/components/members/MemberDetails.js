function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function display(value) {
  const normalized =
    String(value ?? '').trim();

  return normalized || '—';
}

function titleCase(value) {
  return String(value ?? '')
    .replaceAll('_', ' ')
    .replace(
      /\b\w/g,
      character =>
        character.toUpperCase()
    );
}

function detail({
  label,
  value,
}) {
  return `
    <div class="member-detail-item">
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(display(value))}</strong>
    </div>
  `;
}

function photoCard({
  label,
  url,
  icon,
}) {
  return `
    <div class="member-photo-card">

      <div class="member-photo-frame">
        ${
          url
            ? `
              <img
                src="${escapeHtml(url)}"
                alt="${escapeHtml(label)}"
              >
            `
            : `
              <i class="bi ${icon}"></i>
            `
        }
      </div>

      <strong>
        ${escapeHtml(label)}
      </strong>

      <small>
        ${
          url
            ? 'Photo on file'
            : 'No photo added'
        }
      </small>

    </div>
  `;
}

function beneficiaryCard(
  beneficiary,
  index
) {
  return `
    <article class="member-beneficiary-view">

      <div class="member-beneficiary-photo">
        ${
          beneficiary.photoUrl
            ? `
              <img
                src="${escapeHtml(
                  beneficiary.photoUrl
                )}"
                alt="${escapeHtml(
                  beneficiary.fullName
                )}"
              >
            `
            : `
              <i class="bi bi-person"></i>
            `
        }
      </div>

      <div class="member-beneficiary-copy">
        <span>
          Beneficiary ${index + 1}
        </span>

        <strong>
          ${escapeHtml(
            beneficiary.fullName
          )}
        </strong>

        <small>
          ${escapeHtml(
            display(
              beneficiary.relationship
            )
          )}
        </small>
      </div>

      <div class="member-beneficiary-allocation">
        <span>Allocation</span>

        <strong>
          ${Number(
            beneficiary.allocationPct ||
            0
          ).toFixed(2)}%
        </strong>
      </div>

    </article>
  `;
}

export function MemberDetails({
  member = null,
  beneficiaries = [],
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
        Loading member record...
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

  if (!member) {
    return `
      <section class="surface-card real-data-state">
        Member record not found.
      </section>
    `;
  }

  const source =
    member.createdSource ===
      'legacy_register'
      ? 'Membership Register'
      : 'Added by Administrator';

  return `
    <div class="member-read-page">

      <section class="surface-card">

        <header class="member-read-header">

          <div class="member-read-heading">
            <span class="member-read-avatar">
              ${escapeHtml(
                String(
                  member.firstNames ||
                  member.fullName ||
                  'M'
                ).charAt(0).toUpperCase()
              )}
            </span>

            <div>
              <span class="eyebrow">
                ${escapeHtml(member.memberCode)}
              </span>

              <h2>
                ${escapeHtml(member.fullName)}
              </h2>

              <div class="member-read-badges">
                <span class="status-badge">
                  ${escapeHtml(
                    titleCase(member.status)
                  )}
                </span>

                <span class="ledger-badge admin">
                  ${escapeHtml(source)}
                </span>
              </div>
            </div>
          </div>

          <div class="member-read-actions">

            <a
              href="#/members"
              class="secondary-button"
              style="text-decoration:none"
            >
              <i class="bi bi-arrow-left"></i>
              Back
            </a>

            <a
              href="#/edit-member?member=${encodeURIComponent(member.$id)}"
              class="primary-button"
              style="text-decoration:none"
            >
              <i class="bi bi-pencil-square"></i>
              Edit
            </a>

            <button
              type="button"
              class="danger-button"
              data-delete-member="${escapeHtml(member.$id)}"
            >
              <i class="bi bi-trash3"></i>
              Delete
            </button>

          </div>

        </header>

      </section>

      <div class="member-read-grid">

        <section class="surface-card">

          <header class="surface-card-header">
            <div>
              <h2>Member Identity</h2>
              <p>Primary cooperative record</p>
            </div>
          </header>

          <div class="member-detail-grid">
            ${detail({
              label: 'First Name(s)',
              value: member.firstNames,
            })}

            ${detail({
              label: 'Surname',
              value: member.surname,
            })}

            ${detail({
              label: 'National ID',
              value: member.nationalId,
            })}

            ${detail({
              label: 'Stand / Plot',
              value: member.standNumber,
            })}

            ${detail({
              label: 'WhatsApp Contact',
              value: member.whatsappContact,
            })}

            ${detail({
              label: 'Verification',
              value: titleCase(
                member.verificationStatus
              ),
            })}
          </div>

        </section>

        <section class="surface-card">

          <header class="surface-card-header">
            <div>
              <h2>Images</h2>
              <p>Member and spouse photographs</p>
            </div>
          </header>

          <div class="member-photo-grid">
            ${photoCard({
              label: 'Member Photo',
              url: member.memberPhotoUrl,
              icon: 'bi-person-bounding-box',
            })}

            ${photoCard({
              label: 'Spouse Photo',
              url: member.spousePhotoUrl,
              icon: 'bi-camera',
            })}
          </div>

        </section>

        <section class="surface-card">

          <header class="surface-card-header">
            <div>
              <h2>Household Details</h2>
              <p>Spouse and next of kin</p>
            </div>
          </header>

          <div class="member-detail-grid">
            ${detail({
              label: 'Spouse Full Name',
              value: member.spouseFullName,
            })}

            ${detail({
              label: 'Spouse National ID',
              value: member.spouseNationalId,
            })}

            ${detail({
              label: 'Next of Kin',
              value: member.nextOfKinName,
            })}

            ${detail({
              label: 'Relationship',
              value:
                member.nextOfKinRelationship,
            })}

            ${detail({
              label: 'Next of Kin Contact',
              value: member.nextOfKinPhone,
            })}
          </div>

        </section>

        <section class="surface-card">

          <header class="surface-card-header">
            <div>
              <h2>Record Information</h2>
              <p>Administrative record state</p>
            </div>
          </header>

          <div class="member-detail-grid">
            ${detail({
              label: 'Record Status',
              value:
                titleCase(member.status),
            })}

            ${detail({
              label: 'Source',
              value: source,
            })}

            ${detail({
              label: 'Created',
              value:
                member.$createdAt
                  ? new Date(
                      member.$createdAt
                    ).toLocaleDateString(
                      'en-GB'
                    )
                  : '—',
            })}

            ${detail({
              label: 'Last Updated',
              value:
                member.$updatedAt
                  ? new Date(
                      member.$updatedAt
                    ).toLocaleDateString(
                      'en-GB'
                    )
                  : '—',
            })}
          </div>

        </section>

      </div>

      <section class="surface-card">

        <header class="surface-card-header">
          <div>
            <h2>Beneficiaries</h2>
            <p>
              ${beneficiaries.length} of 5 beneficiary slots used
            </p>
          </div>
        </header>

        <div class="member-beneficiary-list">
          ${
            beneficiaries.length
              ? beneficiaries
                  .map(
                    beneficiaryCard
                  )
                  .join('')
              : `
                <div class="real-data-empty">
                  No beneficiaries added.
                </div>
              `
          }
        </div>

      </section>

      <section class="surface-card">

        <header class="surface-card-header">
          <div>
            <h2>Administrative Notes</h2>
          </div>
        </header>

        <div class="member-notes">
          ${escapeHtml(
            display(member.notes)
          )}
        </div>

      </section>

      <dialog
        id="deleteMemberDialog"
        class="member-delete-dialog"
      >

        <div class="member-delete-icon">
          <i class="bi bi-trash3"></i>
        </div>

        <h3>Delete member record?</h3>

        <p>
          This permanently removes this member record,
          its beneficiary records and stored images.
          This action cannot be undone.
        </p>

        <div class="member-delete-dialog-actions">

          <button
            type="button"
            class="secondary-button"
            data-cancel-delete
          >
            Cancel
          </button>

          <button
            type="button"
            class="danger-button"
            data-confirm-delete="${escapeHtml(member.$id)}"
          >
            Delete Record
          </button>

        </div>

      </dialog>

    </div>
  `;
}