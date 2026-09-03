export function MemberForm() {
  return `
    <form id="memberForm">
      <section class="card shanduko-card card-outline card-primary mb-3">
        <header class="card-header"><h3 class="card-title">1. Primary Member & Spouse Identity</h3></header>
        <div class="card-body">
          <div class="row g-3">
            <div class="col-md-6"><label class="form-label">Full Name (Primary)</label><input class="form-control" name="name" value="John Tatenda Moyo" required></div>
            <div class="col-md-6"><label class="form-label">Spouse Full Name</label><input class="form-control" value="Mary R. Moyo"></div>
            <div class="col-md-6"><label class="form-label">National ID Number</label><input class="form-control" value="63-1234567-X-45" required></div>
            <div class="col-md-6"><label class="form-label">Spouse National ID</label><input class="form-control" value="63-7654321-Y-45"></div>
            <div class="col-md-6"><label class="form-label">Stand / Plot Number</label><input class="form-control" value="Stand 1402, Phase 2" required></div>
            <div class="col-md-3"><div class="upload-tile"><i class="bi bi-person-bounding-box"></i><strong>Member photo</strong><small>Upload image</small></div></div>
            <div class="col-md-3"><div class="upload-tile"><i class="bi bi-camera"></i><strong>Spouse photo</strong><small>Upload image</small></div></div>
          </div>
        </div>
      </section>

      <section class="card shanduko-card mb-3">
        <header class="card-header"><h3 class="card-title">2. Legal Dependents & Trust Hierarchy</h3></header>
        <div class="card-body">
          <div class="row g-4">
            <div class="col-md-6">
              <h6 class="fw-semibold">Next of Kin</h6>
              <label class="form-label">Full Name & Relationship</label>
              <input class="form-control mb-3" value="Blessing Moyo (Brother)">
              <label class="form-label">Contact Telephone</label>
              <input class="form-control" value="+263 77 210 0234">
            </div>
            <div class="col-md-6">
              <h6 class="fw-semibold">Primary Beneficiary</h6>
              <label class="form-label">Beneficiary Name</label>
              <input class="form-control mb-3" value="Tinashe Moyo (Son)">
              <label class="form-label">Allocation Rights (%)</label>
              <input class="form-control" value="100% Asset Claim">
            </div>
          </div>
          <div class="d-flex justify-content-end gap-2 mt-4">
            <button type="reset" class="btn btn-light border">Clear Form</button>
            <button class="btn btn-primary" type="submit">Save Member Record <i class="bi bi-arrow-right ms-1"></i></button>
          </div>
        </div>
      </section>
    </form>
  `;
}
