export function TransactionForm() {
  return `
    <div class="row g-3">
      <div class="col-lg-7">
        <section class="card shanduko-card card-outline card-primary">
          <header class="card-header"><h3 class="card-title">Central Transaction Processing</h3></header>
          <div class="card-body">
            <div class="protocol-note">
              <i class="bi bi-shield-lock-fill"></i>
              <div><strong>Accounting Protocol Rule</strong><div>Choose the target allocation account first. The router locks the entry to the selected isolated ledger.</div></div>
            </div>

            <h6 class="section-kicker">1. Target Allocation Account</h6>
            <div class="row g-2 mb-4">
              <div class="col-md-6">
                <label class="account-choice">
                  <input type="radio" name="account" value="admin">
                  <span><strong>Admin Fees</strong><small>Operational & compliance costs</small></span>
                </label>
              </div>
              <div class="col-md-6">
                <label class="account-choice selected">
                  <input type="radio" name="account" value="development" checked>
                  <span><strong>Development Fees</strong><small>Land & infrastructure</small></span>
                </label>
              </div>
            </div>

            <h6 class="section-kicker">2. Member / Stand</h6>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-search"></i></span>
              <input class="form-control" value="Stand 1402 — John Tatenda Moyo">
            </div>
          </div>
        </section>
      </div>

      <div class="col-lg-5">
        <form id="transactionForm" class="card shanduko-card card-outline card-success">
          <header class="card-header"><h3 class="card-title">Transaction Fields</h3></header>
          <div class="card-body">
            <label class="form-label">Receipt Number (from paper book)</label>
            <input class="form-control mb-3" value="SHND-2026-B0892" required>

            <label class="form-label">Date of Bank Deposit</label>
            <input class="form-control mb-3" value="26 / 06 / 2026" required>

            <div class="row g-3">
              <div class="col-6"><label class="form-label">Amount (USD)</label><input class="form-control" value="450.00" required></div>
              <div class="col-6"><label class="form-label">Bank Clearing Branch</label><input class="form-control" value="NMB Bank — Excellence Centre" required></div>
            </div>
          </div>
          <footer class="card-footer d-flex justify-content-end gap-2">
            <button type="reset" class="btn btn-light border">Clear</button>
            <button class="btn btn-success" type="submit">Commit Transaction <i class="bi bi-arrow-right ms-1"></i></button>
          </footer>
        </form>
      </div>
    </div>
  `;
}
