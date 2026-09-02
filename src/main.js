import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'admin-lte/dist/css/adminlte.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'admin-lte/dist/js/adminlte.min.js';
import './style.css';

const members = [
  { id: 'SH-001402', name: 'John Tatenda Moyo', stand: '1402, Phase 2', spouse: 'Mary R. Moyo', status: 'Active', balance: 4500 },
  { id: 'SH-000244', name: 'Chipo Gumbo', stand: '0244', spouse: '—', status: 'Active', balance: 1250 },
  { id: 'SH-001109', name: 'Farai Ndlovu', stand: '1109', spouse: '—', status: 'Active', balance: 860 },
  { id: 'SH-000812', name: 'Tendai Kwenda', stand: '0812', spouse: '—', status: 'Pending', balance: 1200 },
];

const adminLedger = [
  ['SHND-2026-B0411', '12/04/2026', 'Stand 0244 — Chipo Gumbo', 'CBZ Bank — Kwame Nkrumah', 50],
  ['SHND-2026-B0495', '19/05/2026', 'Stand 1109 — Farai Ndlovu', 'EcoCash Business Wallet', 35],
];

const developmentLedger = [
  ['SHND-2026-B0892', '26/06/2026', 'Stand 1402 — John T. Moyo', 'NMB Bank — Excellence Centre', 450],
  ['SHND-2026-B0899', '26/06/2026', 'Stand 0812 — Tendai Kwenda', 'CABS — Central Branch', 1200],
];

const pageMeta = {
  dashboard: ['Dashboard', 'Overview of cooperative operations and financial activity'],
  members: ['Member Registry', 'Search and manage cooperative member records'],
  newMember: ['Create Member Record', 'Capture member, spouse, next-of-kin and beneficiary details'],
  transactions: ['Transaction Processing', 'Route incoming payments to the correct isolated ledger'],
  adminLedger: ['Admin Fees Ledger', 'Operational administration and compliance income'],
  developmentLedger: ['Development Fees Ledger', 'Land development and infrastructure income'],
  audit: ['Audit & Controls', 'Trace receipts, deposits and ledger allocation events'],
};

const money = (value) => `$${Number(value).toLocaleString('en-US', { minimumFractionDigits: 2 })}`;

function shell() {
  return `
    <div class="app-shell">
      <aside class="sidebar">
        <div class="brand"><div class="brand-icon"><i class="bi bi-link-45deg"></i></div><div><div class="brand-name">Dabong</div><div class="brand-sub">SHANDUKO PORTAL</div></div></div>
        <nav class="side-nav">
          <div class="nav-section-label">MENU</div>
          ${navItem('dashboard', 'Dashboard', 'bi-grid-1x2-fill')}
          ${navItem('members', 'Member Registry', 'bi-people-fill')}
          ${navItem('newMember', 'New Member', 'bi-person-plus-fill')}
          <div class="nav-section-label finance-label">FINANCE</div>
          ${navItem('transactions', 'Transactions', 'bi-receipt')}
          ${navItem('adminLedger', 'Admin Fees Ledger', 'bi-wallet2')}
          ${navItem('developmentLedger', 'Development Ledger', 'bi-buildings')}
          <div class="nav-section-label">CONTROL</div>
          ${navItem('audit', 'Audit & Controls', 'bi-shield-check')}
        </nav>
        <div class="sidebar-pro-card">
          <div class="pro-orb"><i class="bi bi-stars"></i></div>
          <strong>Shanduko Pro</strong>
          <span>Audit-ready cooperative workflows</span>
          <button type="button">View Controls</button>
        </div>
        <div class="sidebar-footer"><i class="bi bi-shield-lock-fill"></i><span>Secure admin session</span></div>
      </aside>

      <main class="main-area">
        <header class="topbar">
          <div class="topbar-left"><button class="mobile-menu" id="mobileMenu"><i class="bi bi-list"></i></button><h1 id="pageTitle">Dashboard</h1></div>
          <div class="topbar-actions">
            <div class="searchbox"><i class="bi bi-search"></i><input id="globalSearch" placeholder="Search here..." /></div>
            <div class="locale"><span class="flag">🇿🇼</span> Eng (US) <i class="bi bi-chevron-down"></i></div>
            <button class="icon-btn" title="Notifications"><i class="bi bi-bell"></i><span class="dot"></span></button>
            <div class="profile"><div class="avatar">SM</div><div class="profile-copy"><strong>Shon J.</strong><span>Admin</span></div><i class="bi bi-chevron-down"></i></div>
          </div>
        </header>
        <div class="content-wrap">
          <div class="page-heading"><div><div class="eyebrow" id="pageEyebrow">SHANDUKO HOUSING COOPERATIVE</div><p id="pageSubtitle">Overview of cooperative operations and financial activity</p></div><button class="export-btn" id="globalExport"><i class="bi bi-download"></i> Export</button></div>
          <div id="page"></div>
        </div>
      </main>
    </div>`;
}

function navItem(key, label, icon) {
  const href = key === 'newMember' ? '#/new-member' : `#/${key.replace('Ledger','-ledger').replace('newMember','new-member')}`;
  return `<a class="side-link" data-page="${key}" href="${href}"><i class="bi ${icon}"></i><span>${label}</span></a>`;
}

function dashboard() {
  return `
    <section class="hero-card">
      <div><span class="hero-kicker">TODAY'S COOPERATIVE ACTIVITY</span><h2>Keep every member and payment in one place.</h2><p>Monitor registrations, incoming receipts and separated accounting streams from a single admin workspace.</p></div>
      <div class="hero-pill"><i class="bi bi-check-circle-fill"></i><span>Audit protocol<br><strong>Active</strong></span></div>
    </section>

    <div class="metric-grid">
      ${metricCard('Registered Members', '1,248', '+18 this month', 'bi-people-fill', 'pink')}
      ${metricCard('Receipts Processed', '326', '+12% vs last month', 'bi-receipt-cutoff', 'yellow')}
      ${metricCard('Admin Fees', '$8,420', '+8.4% this period', 'bi-wallet2', 'green')}
      ${metricCard('Development Fees', '$42,860', '+14.2% this period', 'bi-buildings', 'purple')}
    </div>

    <div class="dashboard-grid top-row">
      <div class="panel-card sales-panel">
        <div class="panel-head"><div><h3>Collections Overview</h3><span>Monthly receipt activity</span></div><div class="legend"><span><i class="legend-dot blue"></i> Admin</span><span><i class="legend-dot teal"></i> Development</span></div></div>
        <div class="chart-area"><div class="y-labels"><span>5k</span><span>4k</span><span>3k</span><span>2k</span><span>1k</span><span>0</span></div><div class="bar-chart">${bars([58,70,38,82,62,76,96],[84,72,48,64,55,69,78])}<div class="x-labels"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div></div></div>
      </div>
      <div class="panel-card insights-panel">
        <div class="panel-head"><div><h3>Receipt Insights</h3><span>Processing trend</span></div><div class="select-chip">This week <i class="bi bi-chevron-down"></i></div></div>
        <div class="line-chart"><svg viewBox="0 0 420 180" preserveAspectRatio="none"><defs><linearGradient id="fillA" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stop-color="#7866f5" stop-opacity=".24"/><stop offset="100%" stop-color="#7866f5" stop-opacity="0"/></linearGradient></defs><path d="M8 138 C50 108, 60 124, 92 96 S138 116, 170 75 S220 84, 260 63 S315 102, 352 74 S389 88, 412 44 L412 180 L8 180 Z" fill="url(#fillA)"/><path d="M8 138 C50 108, 60 124, 92 96 S138 116, 170 75 S220 84, 260 63 S315 102, 352 74 S389 88, 412 44" fill="none" stroke="#7c68f4" stroke-width="3"/><path d="M8 158 C50 142, 60 130, 92 146 S138 128, 170 134 S220 109, 260 121 S315 136, 352 110 S389 127, 412 95" fill="none" stroke="#23c9a8" stroke-width="3"/></svg><div class="line-footer"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div></div>
      </div>
      <div class="panel-card target-panel">
        <div class="panel-head"><div><h3>Target vs Reality</h3><span>Monthly allocation</span></div></div>
        <div class="target-bars">${targetBars([48,62,56,76,59,84],[62,72,68,92,73,100])}</div>
        <div class="target-values"><div><span><i class="bi bi-lock-fill"></i> Reality</span><strong>$42,860</strong></div><div><span><i class="bi bi-bullseye"></i> Target</span><strong>$50,000</strong></div></div>
      </div>
    </div>

    <div class="dashboard-grid bottom-row">
      <div class="panel-card table-panel"><div class="panel-head"><div><h3>Recent Transactions</h3><span>Latest committed receipts</span></div><a class="view-link" href="#/transactions">View all <i class="bi bi-arrow-right"></i></a></div><div class="table-wrap"><table class="clean-table"><thead><tr><th>Receipt</th><th>Member / Stand</th><th>Type</th><th>Amount</th><th>Status</th></tr></thead><tbody>
        <tr><td class="receipt">SHND-2026-B0899</td><td><strong>Tendai Kwenda</strong><small>Stand 0812</small></td><td><span class="tag purple">Development</span></td><td><strong>$1,200.00</strong></td><td><span class="status success">Committed</span></td></tr>
        <tr><td class="receipt">SHND-2026-B0892</td><td><strong>John T. Moyo</strong><small>Stand 1402</small></td><td><span class="tag purple">Development</span></td><td><strong>$450.00</strong></td><td><span class="status success">Committed</span></td></tr>
        <tr><td class="receipt">SHND-2026-B0495</td><td><strong>Farai Ndlovu</strong><small>Stand 1109</small></td><td><span class="tag blue">Admin</span></td><td><strong>$35.00</strong></td><td><span class="status success">Committed</span></td></tr>
      </tbody></table></div></div>
      <div class="panel-card control-panel"><div class="panel-head"><div><h3>Control Health</h3><span>System safeguards</span></div></div><div class="health-list">
        ${healthItem('bi-lock-fill','Ledger balances locked','Direct balance edits disabled','good')}
        ${healthItem('bi-person-vcard-fill','Identity evidence','Member, spouse & beneficiary photos','info')}
        ${healthItem('bi-diagram-3-fill','Ledger separation','Admin & Development streams isolated','warn')}
      </div><a class="control-link" href="#/audit">Open audit controls <i class="bi bi-arrow-right"></i></a></div>
    </div>`;
}

function metricCard(label, value, change, icon, tone) {
  return `<div class="metric-card ${tone}"><div class="metric-top"><span>${label}</span><div class="metric-icon"><i class="bi ${icon}"></i></div></div><strong>${value}</strong><small>${change}</small></div>`;
}
function bars(a,b){return a.map((x,i)=>`<div class="bar-group"><div class="bar blue" style="height:${x}%"></div><div class="bar teal" style="height:${b[i]}%"></div></div>`).join('');}
function targetBars(a,b){return a.map((x,i)=>`<div class="target-group"><div class="target-col green" style="height:${x}%"></div><div class="target-col yellow" style="height:${b[i]}%"></div></div>`).join('');}
function healthItem(icon,title,sub,tone){return `<div class="health-item"><div class="health-icon ${tone}"><i class="bi ${icon}"></i></div><div><strong>${title}</strong><span>${sub}</span></div><i class="bi bi-check-circle-fill check"></i></div>`;}

function membersPage(){
  const rows = members.map(m => `<tr><td class="receipt">${m.id}</td><td><strong>${m.name}</strong><small>${m.stand}</small></td><td>${m.spouse}</td><td>${money(m.balance)}</td><td><span class="status ${m.status==='Active'?'success':'pending'}">${m.status}</span></td><td><button class="mini-btn" data-member="${m.id}">View</button></td></tr>`).join('');
  return `<div class="content-panel"><div class="panel-head"><div><h3>Cooperative Member Registry</h3><span>Complete identity and stand records</span></div><a href="#/new-member" class="primary-btn"><i class="bi bi-plus-lg"></i> New member</a></div><div class="toolbar"><div class="search-inline"><i class="bi bi-search"></i><input id="memberSearch" placeholder="Search member, stand or ID..." /></div><div class="toolbar-note"><i class="bi bi-shield-check"></i> Records protected</div></div><div class="table-wrap"><table class="clean-table"><thead><tr><th>Member ID</th><th>Primary member</th><th>Spouse</th><th>Recorded balance</th><th>Status</th><th></th></tr></thead><tbody id="memberRows">${rows}</tbody></table></div></div>`;
}

function newMemberPage(){
  return `<form id="memberForm" class="form-layout"><div class="content-panel"><div class="panel-head"><div><h3>Primary Member & Spouse</h3><span>Identity details linked to the allocated stand</span></div><span class="step-chip">1 / 2</span></div><div class="form-grid two"><label>Full Name (Primary)<input name="name" value="John Tatenda Moyo" required /></label><label>Spouse Full Name<input name="spouse" value="Mary R. Moyo" /></label><label>National ID Number<input name="id" value="63-1234567-X-45" required /></label><label>Spouse National ID<input value="63-7654321-Y-45" /></label><label>Stand / Plot Number<input value="Stand 1402, Phase 2" required /></label><div class="photo-slot"><i class="bi bi-person-bounding-box"></i><strong>Member photo</strong><span>Upload image</span></div><div class="photo-slot"><i class="bi bi-camera"></i><strong>Spouse photo</strong><span>Upload image</span></div></div></div><div class="content-panel"><div class="panel-head"><div><h3>Legal Dependents & Trust Hierarchy</h3><span>Next of kin and primary beneficiary records</span></div><span class="step-chip">2 / 2</span></div><div class="form-grid two"><div class="nested"><h4>Next of Kin</h4><label>Full Name & Relationship<input value="Blessing Moyo (Brother)" /></label><label>Contact Telephone<input value="+263 77 210 0234" /></label></div><div class="nested"><h4>Primary Beneficiary</h4><label>Beneficiary Name<input value="Tinashe Moyo (Son)" /></label><label>Allocation Rights (%)<input value="100% Asset Claim" /></label><div class="photo-slot small"><i class="bi bi-image"></i><strong>Beneficiary photo</strong></div></div></div><div class="form-actions"><button type="reset" class="secondary-btn">Clear form</button><button type="submit" class="primary-btn">Save member record <i class="bi bi-arrow-right"></i></button></div></div></form>`;
}

function transactionsPage(){
  return `<div class="transaction-grid"><div class="content-panel protocol"><div class="panel-head"><div><h3>Central Transaction Processing</h3><span>Route incoming receipts into an isolated sub-ledger</span></div></div><div class="protocol-box"><i class="bi bi-shield-lock-fill"></i><div><strong>Accounting Protocol Rule</strong><p>Choose the target allocation account first. The transaction router locks the entry to the selected ledger.</p></div></div><div class="section-title">1. Target Allocation Account</div><div class="account-choice"><label><input type="radio" name="account" value="admin" /> <span>Admin Fees Sub-Ledger</span><small>Operational & compliance costs</small></label><label class="selected"><input type="radio" name="account" value="development" checked /> <span>Development Fees Sub-Ledger</span><small>Land & infrastructure costs</small></label></div><div class="section-title">2. Member / Stand</div><div class="member-select"><i class="bi bi-search"></i><input value="Stand 1402 — John Tatenda Moyo" /></div></div><form id="transactionForm" class="content-panel"><div class="panel-head"><div><h3>Transaction Fields</h3><span>Paper receipt and bank clearing information</span></div></div><label>Receipt Number (from paper book)<input value="SHND-2026-B0892" required /></label><label>Date of Bank Deposit<input value="26 / 06 / 2026" required /></label><div class="form-grid two"><label>Amount Paid (USD)<input value="450.00" required /></label><label>Bank Clearing Branch<input value="NMB Bank — Excellence Centre" required /></label></div><div class="form-actions"><button type="reset" class="secondary-btn">Clear form</button><button class="primary-btn" type="submit">Commit Transaction <i class="bi bi-arrow-right"></i></button></div></form></div>`;
}

function ledgerPage(kind){
  const data = kind==='admin'?adminLedger:developmentLedger;
  const title = kind==='admin'?'Admin Fees Ledger':'Development Fees Ledger';
  const description = kind==='admin'?'Operational administration, compliance certificates and staff overheads.':'Civil engineering, trenching, road layers and electrical connectivity.';
  const total=data.reduce((s,r)=>s+r[4],0);
  const rows=data.map(r=>`<tr><td class="receipt">${r[0]}</td><td>${r[1]}</td><td><strong>${r[2].split(' — ')[1]}</strong><small>${r[2].split(' — ')[0]}</small></td><td>${r[3]}</td><td><strong>${money(r[4])}</strong></td><td><span class="status success">Verified</span></td></tr>`).join('');
  return `<div class="ledger-stat-row"><div class="metric-card ${kind==='admin'?'blue-soft':'purple-soft'}"><div class="metric-top"><span>Period receipts</span><div class="metric-icon"><i class="bi bi-receipt"></i></div></div><strong>${data.length}</strong><small>Paper-linked entries</small></div><div class="metric-card green"><div class="metric-top"><span>Ledger total</span><div class="metric-icon"><i class="bi bi-cash-stack"></i></div></div><strong>${money(total)}</strong><small>Current sample period</small></div><div class="metric-card yellow"><div class="metric-top"><span>Integrity</span><div class="metric-icon"><i class="bi bi-check2-circle"></i></div></div><strong>Balanced</strong><small>Source documents matched</small></div></div><div class="content-panel"><div class="panel-head"><div><h3>${title}</h3><span>${description}</span></div><button class="secondary-btn"><i class="bi bi-download"></i> Export</button></div><div class="table-wrap"><table class="clean-table"><thead><tr><th>Receipt #</th><th>Processing date</th><th>Member / Stand</th><th>Bank branch context</th><th>Amount</th><th>Status</th></tr></thead><tbody>${rows}</tbody></table></div></div>`;
}

function auditPage(){return `<div class="audit-grid"><div class="content-panel"><div class="panel-head"><div><h3>Audit Trail</h3><span>Recent immutable processing events</span></div></div><div class="audit-list">${auditEvent('bi-receipt','Transaction committed','SHND-2026-B0899 routed to Development Fees for Stand 0812.','Today, 14:32','purple')}${auditEvent('bi-person-plus','Member record created','John Tatenda Moyo — Stand 1402, Phase 2.','Yesterday, 10:18','blue')}${auditEvent('bi-shield-check','Paper receipt matched','SHND-2026-B0892 reconciled to NMB Bank — Excellence Centre.','26/06/2026','green')}</div></div><div class="content-panel"><div class="panel-head"><div><h3>Control Checklist</h3><span>Required controls before commit</span></div></div><div class="check-list">${['Receipt number captured from paper book','Deposit date recorded','Bank branch recorded','Ledger allocation separated','Identity evidence linked'].map(x=>`<div><i class="bi bi-check-circle-fill"></i><span>${x}</span></div>`).join('')}</div></div></div>`;}
function auditEvent(icon,title,text,time,tone){return `<div class="audit-event"><div class="audit-icon ${tone}"><i class="bi ${icon}"></i></div><div><strong>${title}</strong><span>${text}</span></div><time>${time}</time></div>`;}

function render(){
  const raw=location.hash.replace('#/','')||'dashboard';
  const map={'new-member':'newMember','admin-ledger':'adminLedger','development-ledger':'developmentLedger'};
  const key=map[raw]||raw;
  const actual=['dashboard','members','newMember','transactions','adminLedger','developmentLedger','audit'].includes(key)?key:'dashboard';
  const [title,subtitle]=pageMeta[actual];
  document.querySelector('#pageTitle').textContent=title;
  document.querySelector('#pageSubtitle').textContent=subtitle;
  document.querySelectorAll('.side-link').forEach(a=>a.classList.toggle('active',a.dataset.page===actual));
  document.querySelector('#page').innerHTML={dashboard,members:membersPage,newMember:newMemberPage,transactions:transactionsPage,adminLedger:()=>ledgerPage('admin'),developmentLedger:()=>ledgerPage('development'),audit:auditPage}[actual]();
  wireEvents(actual);
}

function wireEvents(actual){
  if(actual==='members'){
    document.querySelector('#memberSearch')?.addEventListener('input',e=>{const q=e.target.value.toLowerCase();document.querySelectorAll('#memberRows tr').forEach(r=>r.style.display=r.innerText.toLowerCase().includes(q)?'':'none')});
    document.querySelectorAll('[data-member]').forEach(b=>b.addEventListener('click',()=>toast(`Opened member ${b.dataset.member}`)));
  }
  if(actual==='newMember') document.querySelector('#memberForm')?.addEventListener('submit',e=>{e.preventDefault();toast('Member record validated and ready to save.','success')});
  if(actual==='transactions') document.querySelector('#transactionForm')?.addEventListener('submit',e=>{e.preventDefault();toast('Transaction committed to the selected isolated ledger.','success')});
  document.querySelectorAll('.account-choice label').forEach(label=>label.addEventListener('click',()=>{document.querySelectorAll('.account-choice label').forEach(l=>l.classList.remove('selected'));label.classList.add('selected')}));
}

function toast(message,type='info'){const el=document.createElement('div');el.className=`toast-msg ${type}`;el.innerHTML=`<i class="bi ${type==='success'?'bi-check-circle-fill':'bi-info-circle-fill'}"></i>${message}`;document.body.appendChild(el);setTimeout(()=>el.classList.add('show'),10);setTimeout(()=>{el.classList.remove('show');setTimeout(()=>el.remove(),250)},2600)}

document.body.innerHTML=shell();
document.querySelector('#mobileMenu').addEventListener('click',()=>document.body.classList.toggle('sidebar-open'));
document.querySelector('#globalExport').addEventListener('click',()=>toast('Export prepared for the current view.','success'));
document.querySelector('#globalSearch').addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.value.trim()){location.hash='#/members';setTimeout(()=>{const input=document.querySelector('#memberSearch');if(input){input.value=e.target.value;input.dispatchEvent(new Event('input'))}},0)}});
window.addEventListener('hashchange',render);
render();
