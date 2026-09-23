export function MemberForm() {
  return `
    <form id="memberForm">

      <section
        class="card shanduko-card card-outline card-primary mb-3"
      >

        <header class="card-header">
          <h3 class="card-title">
            1. Primary Member Identity
          </h3>
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
                autocomplete="tel"
                required
              >
            </div>

            <div class="col-md-6">
              <label class="form-label">
                Stand / Plot Number
              </label>

              <input
                class="form-control"
                name="standNumber"
                inputmode="numeric"
                pattern="[0-9]+"
                placeholder="e.g. 7843"
                required
              >
            </div>

            <div class="col-md-6">
              <label class="form-label">
                Spouse Full Name
              </label>

              <input
                class="form-control"
                name="spouseFullName"
              >
            </div>

            <div class="col-md-6">
              <label class="form-label">
                Spouse National ID
              </label>

              <input
                class="form-control"
                name="spouseNationalId"
              >
            </div>

            <div class="col-md-3">
              <label class="upload-tile">
                <input
                  type="file"
                  name="memberPhoto"
                  accept="image/jpeg,image/png,image/webp"
                  hidden
                >

                <i class="bi bi-person-bounding-box"></i>
                <strong>Member photo</strong>
                <small>Optional</small>
              </label>
            </div>

            <div class="col-md-3">
              <label class="upload-tile">
                <input
                  type="file"
                  name="spousePhoto"
                  accept="image/jpeg,image/png,image/webp"
                  hidden
                >

                <i class="bi bi-camera"></i>
                <strong>Spouse photo</strong>
                <small>Optional</small>
              </label>
            </div>

          </div>

        </div>

      </section>

      <section
        class="card shanduko-card mb-3"
      >

        <header class="card-header">
          <h3 class="card-title">
            2. Next of Kin & Beneficiary
          </h3>
        </header>

        <div class="card-body">

          <div class="row g-4">

            <div class="col-md-6">

              <h6 class="fw-semibold">
                Next of Kin
              </h6>

              <label class="form-label">
                Full Name
              </label>

              <input
                class="form-control mb-3"
                name="nextOfKinName"
              >

              <label class="form-label">
                Relationship
              </label>

              <input
                class="form-control mb-3"
                name="nextOfKinRelationship"
              >

              <label class="form-label">
                Contact Telephone
              </label>

              <input
                class="form-control"
                name="nextOfKinPhone"
                autocomplete="tel"
              >

            </div>

            <div class="col-md-6">

              <h6 class="fw-semibold">
                Primary Beneficiary
              </h6>

              <label class="form-label">
                Beneficiary Name
              </label>

              <input
                class="form-control mb-3"
                name="beneficiaryName"
              >

              <label class="form-label">
                Relationship
              </label>

              <input
                class="form-control mb-3"
                name="beneficiaryRelationship"
              >

              <label class="form-label">
                Allocation Rights (%)
              </label>

              <input
                class="form-control mb-3"
                name="beneficiaryAllocationPct"
                type="number"
                min="0"
                max="100"
                step="0.01"
              >

              <label class="upload-tile">
                <input
                  type="file"
                  name="beneficiaryPhoto"
                  accept="image/jpeg,image/png,image/webp"
                  hidden
                >

                <i class="bi bi-person-vcard"></i>
                <strong>Beneficiary photo</strong>
                <small>Optional</small>
              </label>

            </div>

          </div>

          <div
            id="memberFormError"
            class="auth-error mt-3"
            role="alert"
            hidden
          ></div>

          <div
            class="d-flex justify-content-end gap-2 mt-4"
          >
            <button
              type="reset"
              class="btn btn-light border"
            >
              Clear Form
            </button>

            <button
              id="saveMemberButton"
              class="btn btn-primary"
              type="submit"
            >
              Save Real Member Record
              <i class="bi bi-arrow-right ms-1"></i>
            </button>
          </div>

        </div>

      </section>

    </form>
  `;
}