const MAX_BENEFICIARIES = 5;

const RELATIONSHIPS = [
  'Spouse',
  'Son',
  'Daughter',
  'Father',
  'Mother',
  'Brother',
  'Sister',
  'Grandchild',
  'Grandfather',
  'Grandmother',
  'Uncle',
  'Aunt',
  'Cousin',
  'Niece',
  'Nephew',
  'Guardian',
  'Relative',
];

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

function relationshipInput({
  value = '',
  selectName = '',
  manualName = '',
  selectData = '',
  manualData = '',
} = {}) {
  const normalized =
    String(value ?? '').trim();

  const known =
    RELATIONSHIPS.includes(
      normalized
    );

  const selectValue =
    known
      ? normalized
      : normalized
        ? '__other__'
        : '';

  return `
    <div data-relationship-control>

      <select
        class="form-select"
        ${selectName ? `name="${selectName}"` : ''}
        ${selectData}
        data-relationship-select
      >
        <option value="">
          Select relationship
        </option>

        ${RELATIONSHIPS.map(
          relationship => `
            <option
              value="${escapeHtml(relationship)}"
              ${
                selected(
                  selectValue,
                  relationship
                )
              }
            >
              ${escapeHtml(relationship)}
            </option>
          `
        ).join('')}

        <option
          value="__other__"
          ${
            selectValue === '__other__'
              ? 'selected'
              : ''
          }
        >
          Other / Manual entry
        </option>
      </select>

      <div
        class="relationship-manual ${
          selectValue === '__other__'
            ? ''
            : 'd-none'
        }"
        data-relationship-manual-wrap
      >
        <input
          class="form-control mt-2"
          ${manualName ? `name="${manualName}"` : ''}
          ${manualData}
          data-relationship-manual
          placeholder="Enter relationship"
          value="${
            selectValue === '__other__'
              ? escapeHtml(normalized)
              : ''
          }"
        >
      </div>

    </div>
  `;
}

function photoPicker({
  inputName = '',
  inputData = '',
  label,
  currentUrl = '',
  hasCurrentPhoto = false,
  removeName = '',
  removeData = '',
} = {}) {
  return `
    <div class="photo-editor">

      <label class="upload-tile photo-upload-tile">

        <input
          type="file"
          ${inputName ? `name="${inputName}"` : ''}
          ${inputData}
          accept="image/jpeg,image/png,image/webp"
          hidden
        >

        <span
          class="picked-image-preview ${
            currentUrl
              ? 'has-preview'
              : ''
          }"
          data-image-preview
          data-current-image="${escapeHtml(currentUrl)}"
        >
          ${
            currentUrl
              ? `
                <img
                  src="${escapeHtml(currentUrl)}"
                  alt="${escapeHtml(label)}"
                >
              `
              : `
                <i class="bi bi-image"></i>
              `
          }
        </span>

        <span class="photo-upload-copy">
          <strong>
            ${
              hasCurrentPhoto
                ? `Replace ${escapeHtml(label)}`
                : `Add ${escapeHtml(label)}`
            }
          </strong>

          <small data-file-caption>
            ${
              hasCurrentPhoto
                ? 'Photo currently on file'
                : 'Choose image'
            }
          </small>
        </span>

      </label>

      ${
        hasCurrentPhoto
          ? `
            <label class="photo-remove-check mt-2">
              <input
                type="checkbox"
                ${removeName ? `name="${removeName}"` : ''}
                ${removeData}
              >
              <span>
                Remove current ${escapeHtml(label)}
              </span>
            </label>
          `
          : ''
      }

    </div>
  `;
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

          ${relationshipInput({
            value:
              beneficiary.relationship || '',

            selectData:
              'data-beneficiary-relationship-select',

            manualData:
              'data-beneficiary-relationship-manual',
          })}
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
            step="5"
            inputmode="numeric"
            value="${escapeHtml(
              beneficiary.allocationPct ?? ''
            )}"
          >

          <small class="field-hint">
            Changes in 5% steps
          </small>
        </div>

        <div class="col-12">
          ${photoPicker({
            inputData:
              'data-beneficiary-photo',

            label:
              'beneficiary photo',

            currentUrl:
              beneficiary.photoUrl || '',

            hasCurrentPhoto:
              hasPhoto,

            removeData:
              'data-beneficiary-remove-photo',
          })}
        </div>

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
    beneficiaries || [];

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
              ${photoPicker({
                inputName:
                  'memberPhoto',

                label:
                  'member photo',

                currentUrl:
                  memberData.memberPhotoUrl || '',

                hasCurrentPhoto:
                  Boolean(
                    memberData.memberPhotoFileId
                  ),

                removeName:
                  'removeMemberPhoto',
              })}
            </div>

            <div class="col-md-6">
              ${photoPicker({
                inputName:
                  'spousePhoto',

                label:
                  'spouse photo',

                currentUrl:
                  memberData.spousePhotoUrl || '',

                hasCurrentPhoto:
                  Boolean(
                    memberData.spousePhotoFileId
                  ),

                removeName:
                  'removeSpousePhoto',
              })}
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

              ${relationshipInput({
                value:
                  memberData.nextOfKinRelationship || '',

                selectName:
                  'nextOfKinRelationshipSelect',

                manualName:
                  'nextOfKinRelationshipManual',
              })}
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
              Maximum 5 people. Total allocation cannot exceed 100%.
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

          <div
            id="beneficiaryAllocationWarning"
            class="beneficiary-allocation-warning"
            hidden
          >
            <i class="bi bi-exclamation-triangle"></i>
            Total beneficiary allocation cannot exceed 100%.
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
                ).toFixed(0)}
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