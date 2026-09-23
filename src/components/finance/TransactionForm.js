import {adminLedger,developmentLedger,bankBranches} from '../../data/appData.js';
import {LedgerTable} from './LedgerTable.js';

export function TransactionForm(){
  return `
    <div class="proposal-header">
      <div>
        <strong>SHANDUKO SYSTEM OPERATOR DASHBOARD</strong>
        <span>ADMIN CONTROL ACCOUNT</span>
      </div>
      <div class="module-tabs">
        <button type="button" class="module-tab active" data-tab="processing">Central Transaction Processing Node</button>
        <button type="button" class="module-tab" data-tab="admin">View Admin Ledger</button>
        <button type="button" class="module-tab" data-tab="development">View Development Ledger</button>
      </div>
    </div>

    <div class="tab-panels">
      <div class="tab-panel active" data-panel="processing">
        <div class="notice-box"><i class="bi bi-info-circle-fill"></i><div><strong>Accounting Protocol Rule:</strong> Choose the target allocation account first. The transaction router will lock down properties and push data cleanly to the respective isolated module to prevent bookkeeping errors.</div></div>
        <div class="transaction-layout">
          <section class="surface-card">
            <header class="surface-card-header"><div><h2>1. Target Allocation Account Type</h2></div></header>
            <div class="account-choices">
              <label class="account-option"><input type="radio" name="ledger" value="admin"><span><strong>Admin Fees Sub-Ledger</strong><small>Operational administration and compliance</small></span></label>
              <label class="account-option selected"><input type="radio" name="ledger" value="development" checked><span><strong>Development Fees Sub-Ledger</strong><small>Physical land optimisation and infrastructure</small></span></label>
            </div>
            <div class="field-block"><label>2. SEARCH PRIMARY MEMBER / STAND NUMBER</label><div class="search-field"><i class="bi bi-search"></i><input value="Stand 1402 — John Tatenda Moyo"></div></div>
          </section>

          <form id="transactionForm" class="surface-card">
            <header class="surface-card-header"><div><h2>Transaction Fields Input</h2><p>Paper receipt and bank deposit evidence</p></div></header>
            <div class="form-stack compact-form">
              <div><label>RECEIPT NUMBER (FROM PAPER BOOK)</label><input value="SHND-2026-B0892" required></div>
              <div><label>DATE OF BANK DEPOSIT</label><input type="date" value="2026-06-26" required></div>
              <div class="three-fields">
                <div><label>AMOUNT PAID ($ USD)</label><input type="number" value="450.00" min="0" step="0.01" required></div>
                <div><label>BANK CLEARING BRANCH</label><select>${bankBranches.map(x=>`<option ${x.startsWith('NMB')?'selected':''}>${x}</option>`).join('')}</select></div>
              </div>
            </div>
            <div class="form-actions"><button type="reset" class="secondary-button">Clear Form</button><button type="submit" class="success-button">Commit Transaction <i class="bi bi-arrow-right"></i></button></div>
          </form>
        </div>
      </div>

      <div class="tab-panel" data-panel="admin">
        ${LedgerTable({kind:'admin',title:'Admin Fees Ledger View',subtitle:'Operational administration, compliance certificates and staff overhead structures.',data:adminLedger})}
      </div>

      <div class="tab-panel" data-panel="development">
        ${LedgerTable({kind:'development',title:'Development Fees Ledger View',subtitle:'Civil engineering, trenching, structural road layer bases and electrical substation connectivity.',data:developmentLedger})}
      </div>
    </div>
  `;
}

