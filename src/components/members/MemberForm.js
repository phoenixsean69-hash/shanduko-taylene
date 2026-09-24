const MAX_BENEFICIARIES = 5;

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function selected(value, expected) {
  return String(value ?? '') === expected
    ? 'selected'
    : '';
}

function beneficiaryCard(
  beneficiary = {},
  index = 0
) {
  const hasPhoto =
    Boolean(
      beneficiary.photoFileId
    );

  return `
    <article
      class="beneficiary-card"
      data-beneficiary-card
    >

      <div class="beneficiary-card-head">
        <div>
          <strong>
            Beneficiary ${index + 1}
          </strong>

          <small>
            Maximum 5 beneficiaries per member
          </small>
        </div>

        <button
          type="button"
          class="beneficiary-remove"
          data-remove-beneficiary
          aria-label="Remove beneficiary"
        >
          <i class="bi bi-trash3"></i>
        </button>
      </div>

      <input
        type="hidden"
        data-beneficiary-id
        value="${escapeHtml(
          beneficiary.$id || ''
        )}"
      >

      <input
        type="hidden"
        data-beneficiary-current-photo
        value="${escapeHtml(
          beneficiary.photoFileId || ''
        )}"
      >

      <div class="row g-3">

        <div class="col-md-5">
          <label class="form-label">
            Full Name
          </label>

          <input
            class="form-control"
            data-beneficiary-name
            value="${escapeHtml(
              beneficiary.fullName || ''
            )}"
          >
        </div>

        <div class="col-md-4">
          <label class="form-label">
            Relationship
          </label>

          <input
            class="form-control"
            data-beneficiary-relationship
            value="${escapeHtml(
              beneficiary.relationship || ''
            )}"
          >
        </div>

        <div class="col-md-3">
          <label class="form-label">
            Allocation (%)
          </label>

          <input
            class="form-control"
            data-beneficiary-allocation
            type="number"
            min="0"
            max="100"
            step="0.01"
            value="${escapeHtml(
              beneficiary.allocationPct ?? ''
            )}"
          >
        </div>

        <div class="col-md-6">
          <label class="upload-tile beneficiary-upload">
            <input
              type="file"
              data-beneficiary-photo
              accept="image/jpeg,image/png,image/webp"
              hidden
            >

            <i class="bi bi-person-vcard"></i>

            <strong>
              ${
                hasPhoto
                  ? 'Replace beneficiary photo'
                  : 'Add beneficiary photo'
              }
            </strong>

            <small>
              ${
                hasPhoto
                  ? 'Photo currently on file'
                  : 'Optional'
              }
            </small>
          </label>
        </div>

        ${
          hasPhoto
            ? `
              <div class="col-md-6 d-flex align-items-center">
                <label class="photo-remove-check">
                  <input
                    type="checkbox"
                    data-beneficiary-remove-photo
                  >
                  <span>
                    Remove current beneficiary photo
                  </span>
                </label>
              </div>
            `
            : ''
        }

      </div>

    </article>
  `;
}

export function MemberForm({
  mode = 'create',
  member = null,
  beneficiaries = [],
  loading = false,
  error = '',
} = {}) {
  const editing =
    mode === 'edit';

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

  const memberData =
    member || {};

  const beneficiaryRows =
    beneficiaries.length
      ? beneficiaries
      : [];

  return `
    <form
      id="memberForm"
      data-form-mode="${editing ? 'edit' : 'create'}"
      data-member-id="${escapeHtml(memberData.$id || '')}"
    >

      <section
        class="card shanduko-card card-outline card-primary mb-3"
      >

        <header class="card-header member-form-section-head">
          <div>
            <h3 class="card-title">
              1. Primary Member Identity
            </h3>

            ${
              editing
                ? `
                  <small>
                    ${escapeHtml(memberData.memberCode || '')}
                  </small>
                `
                : ''
            }
          </div>

          ${
            editing
              ? `
                <span class="edit-mode-badge">
                  <i class="bi bi-pencil-square"></i>
                  Editing
                </span>
              `
              : ''
          }
        </header>

        <div class="card-body">

          <div class="row g-3">

            <div class="col-md-6">
              <label class="form-label">
                First Name(s)
              </label>

              <input
                class="form-control"
                name="firstNames"
                value="${escapeHtml(memberData.firstNames || '')}"
                autocomplete="given-name"
                required
              >
            </div>

            <div class="col-md-6">
              <label class="form-label">
                Surname
              </label>

              <input
                class="form-control"
                name="surname"
                value="${escapeHtml(memberData.surname || '')}"
                autocomplete="family-name"
                required
              >
            </div>

            <div class="col-md-6">
              <label class="form-label">
                National ID Number
              </label>

              <input
                class="form-control"
                name="nationalId"
                value="${escapeHtml(memberData.nationalId || '')}"
                required
              >
            </div>

            <div class="col-md-6">
              <label class="form-label">
                WhatsApp Contact
              </label>

              <input
                class="form-control"
                name="whatsappContact"
                value="${escapeHtml(memberData.whatsappContact || '')}"
                autocomplete="tel"
                required
              >
            </div>

            <div class="col-md-4">
              <label class="form-label">
                Stand / Plot Number
              </label>

              <input
                class="form-control"
                name="standNumber"
                value="${escapeHtml(memberData.standNumber || '')}"
                inputmode="numeric"
                pattern="[0-9]+"
                required
              >
            </div>

            <div class="col-md-4">
              <label class="form-label">
                Record Status
              </label>

              <select
                class="form-select"
                name="status"
              >
                <option
                  value="registered"
                  ${selected(memberData.status, 'registered')}
                >
                  Registered
                </option>

                <option
                  value="pending"
                  ${
                    !memberData.status ||
                    memberData.status === 'pending'
                      ? 'selected'
                      : ''
                  }
                >
                  Pending
                </option>

                <option
                  value="suspended"
                  ${selected(memberData.status, 'suspended')}
                >
                  Suspended
                </option>

                <option
                  value="archived"
                  ${selected(memberData.status, 'archived')}
                >
                  Archived
                </option>
              </select>
            </div>

            <div class="col-md-4">
              <label class="form-label">
                Verification
              </label>

              <select
                class="form-select"
                name="verificationStatus"
              >
                <option
                  value="source_register"
                  ${selected(memberData.verificationStatus, 'source_register')}
                >
                  Source Register
                </option>

                <option
                  value="pending"
                  ${
                    !memberData.verificationStatus ||
                    memberData.verificationStatus === 'pending'
                      ? 'selected'
                      : ''
                  }
                >
                  Pending
                </option>

                <option
                  value="verified"
                  ${selected(memberData.verificationStatus, 'verified')}
                >
                  Verified
                </option>

                <option
                  value="rejected"
                  ${selected(memberData.verificationStatus, 'rejected')}
                >
                  Rejected
                </option>
              </select>
            </div>

            <div class="col-md-6">
              <label class="form-label">
                Spouse Full Name
              </label>

              <input
                class="form-control"
                name="spouseFullName"
                value="${escapeHtml(memberData.spouseFullName || '')}"
              >
            </div>

            <div class="col-md-6">
              <label class="form-label">
                Spouse National ID
              </label>

              <input
                class="form-control"
                name="spouseNationalId"
                value="${escapeHtml(memberData.spouseNationalId || '')}"
              >
            </div>

            <div class="col-md-6">
              <label class="upload-tile">
                <input
                  type="file"
                  name="memberPhoto"
                  accept="image/jpeg,image/png,image/webp"
                  hidden
                >

                <i class="bi bi-person-bounding-box"></i>

                <strong>
                  ${
                    memberData.memberPhotoFileId
                      ? 'Replace member photo'
                      : 'Add member photo'
                  }
                </strong>

                <small>
                  ${
                    memberData.memberPhotoFileId
                      ? 'Photo currently on file'
                      : 'Optional'
                  }
                </small>
              </label>

              ${
                memberData.memberPhotoFileId
                  ? `
                    <label class="photo-remove-check mt-2">
                      <input
                        type="checkbox"
                        name="removeMemberPhoto"
                      >
                      <span>
                        Remove current member photo
                      </span>
                    </label>
                  `
                  : ''
              }
            </div>

            <div class="col-md-6">
              <label class="upload-tile">
                <input
                  type="file"
                  name="spousePhoto"
                  accept="image/jpeg,image/png,image/webp"
                  hidden
                >

                <i class="bi bi-camera"></i>

                <strong>
                  ${
                    memberData.spousePhotoFileId
                      ? 'Replace spouse photo'
                      : 'Add spouse photo'
                  }
                </strong>

                <small>
                  ${
                    memberData.spousePhotoFileId
                      ? 'Photo currently on file'
                      : 'Optional'
                  }
                </small>
              </label>

              ${
                memberData.spousePhotoFileId
                  ? `
                    <label class="photo-remove-check mt-2">
                      <input
                        type="checkbox"
                        name="removeSpousePhoto"
                      >
                      <span>
                        Remove current spouse photo
                      </span>
                    </label>
                  `
                  : ''
              }
            </div>

          </div>

        </div>

      </section>

      <section
        class="card shanduko-card mb-3"
      >

        <header class="card-header">
          <h3 class="card-title">
            2. Next of Kin
          </h3>
        </header>

        <div class="card-body">

          <div class="row g-3">

            <div class="col-md-4">
              <label class="form-label">
                Full Name
              </label>

              <input
                class="form-control"
                name="nextOfKinName"
                value="${escapeHtml(memberData.nextOfKinName || '')}"
              >
            </div>

            <div class="col-md-4">
              <label class="form-label">
                Relationship
              </label>

              <input
                class="form-control"
                name="nextOfKinRelationship"
                value="${escapeHtml(memberData.nextOfKinRelationship || '')}"
              >
            </div>

            <div class="col-md-4">
              <label class="form-label">
                Contact Telephone
              </label>

              <input
                class="form-control"
                name="nextOfKinPhone"
                value="${escapeHtml(memberData.nextOfKinPhone || '')}"
                autocomplete="tel"
              >
            </div>

          </div>

        </div>

      </section>

      <section
        class="card shanduko-card mb-3"
      >

        <header class="card-header beneficiary-section-header">
          <div>
            <h3 class="card-title">
              3. Beneficiaries
            </h3>

            <small>
              Add up to 5 people. Combined allocation cannot exceed 100%.
            </small>
          </div>

          <button
            type="button"
            id="addBeneficiaryButton"
            class="secondary-button"
          >
            <i class="bi bi-person-plus"></i>
            Add Beneficiary
          </button>
        </header>

        <div class="card-body">

          <div
            id="beneficiaryList"
            class="beneficiary-list"
            data-beneficiary-limit="${MAX_BENEFICIARIES}"
          >
            ${
              beneficiaryRows
                .map(
                  (beneficiary, index) =>
                    beneficiaryCard(
                      beneficiary,
                      index
                    )
                )
                .join('')
            }
          </div>

          <div
            id="beneficiaryEmptyState"
            class="beneficiary-empty ${
              beneficiaryRows.length
                ? 'd-none'
                : ''
            }"
          >
            <i class="bi bi-people"></i>
            <span>No beneficiaries added yet.</span>
          </div>

          <div class="beneficiary-summary">
            <span>
              <strong id="beneficiaryCount">
                ${beneficiaryRows.length}
              </strong>
              / 5 beneficiaries
            </span>

            <span>
              Allocation:
              <strong id="beneficiaryAllocationTotal">
                ${beneficiaryRows.reduce(
                  (total, row) =>
                    total +
                    Number(
                      row.allocationPct || 0
                    ),
                  0
                ).toFixed(2)}
              </strong>%
            </span>
          </div>

        </div>

      </section>

      <section
        class="card shanduko-card mb-3"
      >

        <header class="card-header">
          <h3 class="card-title">
            4. Notes
          </h3>
        </header>

        <div class="card-body">
          <textarea
            class="form-control"
            name="notes"
            rows="4"
            placeholder="Optional administrative notes"
          >${escapeHtml(memberData.notes || '')}</textarea>
        </div>

      </section>

      <div
        id="memberFormError"
        class="auth-error mb-3"
        role="alert"
        hidden
      ></div>

      <div class="member-form-footer">

        <a
          href="#/members"
          class="secondary-button"
          style="text-decoration:none"
        >
          Cancel
        </a>

        ${
          !editing
            ? `
              <button
                type="reset"
                class="secondary-button"
              >
                Clear Form
              </button>
            `
            : ''
        }

        <button
          id="saveMemberButton"
          class="primary-button"
          type="submit"
        >
          <i class="bi bi-check2-circle"></i>
          ${
            editing
              ? 'Save Changes'
              : 'Save Member Record'
          }
        </button>

      </div>

    </form>
  `;
}

export function createBeneficiaryCard(
  index
) {
  return beneficiaryCard(
    {},
    index
  );
}