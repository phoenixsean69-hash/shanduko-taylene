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
  dashboard: ['Dashboard', 'Cooperative operations overview'],
  members: ['Member Registry', 'Search and manage cooperative member records'],
  newMember: ['Create Member Record', 'Capture member, spouse, next-of-kin and beneficiary details'],
  transactions: ['Transaction Processing', 'Route incoming payments to the correct isolated ledger'],
  adminLedger: ['Admin Fees Ledger', 'Operational administration and compliance income'],
  developmentLedger: ['Development Fees Ledger', 'Land development and infrastructure income'],
  audit: ['Audit & Controls', 'Trace receipts, deposits and ledger allocation events'],
};

const money = (value) => `$${Number(value).toLocaleString('en-US', { minimumFractionDigits: 2 })}`;

function navLink(key, label, icon) {
  const href = key === 'newMember' ? '#/new-member' : `#/${key.replace('Ledger', '-ledger')}`;
  return `<li class="nav-item"><a href="${href}" class="nav-link" data-page="${key}"><i class="nav-icon bi ${icon}"></i><p>${label}</p></a></li>`;
}

function shell() {
  return `
  <body class="layout-fixed sidebar-expand-lg bg-body-tertiary">
    <div class="app-wrapper">
      <nav class="app-header navbar navbar-expand bg-body shadow-sm">
        <div class="container-fluid">
          <ul class="navbar-nav">
            <li class="nav-item"><a class="nav-link" data-lte-toggle="sidebar" href="#" role="button"><i class="bi bi-list"></i></a></li>
            <li class="nav-item d-none d-md-block"><a href="#/dashboard" class="nav-link">Shanduko Housing Cooperative</a></li>
          </ul>
          <ul class="navbar-nav ms-auto align-items-center">
            <li class="nav-item me-2 d-none d-md-block">
              <div class="top-search"><i class="bi bi-search"></i><input id="globalSearch" class="form-control form-control-sm" placeholder="Search here..." /></div>
            </li>
            <li class="nav-item dropdown"><a class="nav-link" data-bs-toggle="dropdown" href="#"><i class="bi bi-bell"></i><span class="navbar-badge badge text-bg-warning">3</span></a><div class="dropdown-menu dropdown-menu-lg dropdown-menu-end"><span class="dropdown-item dropdown-header">3 Notifications</span><div class="dropdown-divider"></div><a href="#" class="dropdown-item"><i class="bi bi-receipt me-2"></i> 2 receipts awaiting review</a><div class="dropdown-divider"></div><a href="#" class="dropdown-item"><i class="bi bi-person-plus me-2"></i> New member record queued</a></div></li>
            <li class="nav-item dropdown ms-1"><a class="nav-link d-flex align-items-center gap-2" data-bs-toggle="dropdown" href="#"><span class="avatar-sm">SM</span><span class="d-none d-md-inline">Administrator</span><i class="bi bi-chevron-down small"></i></a><ul class="dropdown-menu dropdown-menu-end"><li><h6 class="dropdown-header">Admin control account</h6></li><li><a class="dropdown-item" href="#/audit"><i class="bi bi-shield-check me-2"></i>Audit & Controls</a></li><li><a class="dropdown-item" href="#"><i class="bi bi-box-arrow-right me-2"></i>Sign out</a></li></ul></li>
          </ul>
        </div>
      </nav>

      <aside class="app-sidebar bg-dark shadow" data-bs-theme="dark">
        <div class="sidebar-brand">
          <a href="#/dashboard" class="brand-link">
            <span class="brand-mark"><i class="bi bi-buildings-fill"></i></span>
            <span class="brand-text fw-semibold">SHANDUKO</span>
          </a>
        </div>
        <div class="sidebar-wrapper">
          <nav class="mt-2">
            <ul class="nav sidebar-menu flex-column" data-lte-toggle="treeview" role="menu" data-accordion="false" id="navigation">
              <li class="nav-header">WORKSPACE</li>
              ${navLink('dashboard', 'Dashboard', 'bi-grid-1x2-fill')}
              ${navLink('members', 'Member Registry', 'bi-people-fill')}
              ${navLink('newMember', 'New Member', 'bi-person-plus-fill')}
              <li class="nav-header">FINANCE</li>
              ${navLink('transactions', 'Transactions', 'bi-receipt')}
              ${navLink('adminLedger', 'Admin Fees Ledger', 'bi-wallet2')}
              ${navLink('developmentLedger', 'Development Ledger', 'bi-buildings')}
              <li class="nav-header">CONTROL</li>
              ${navLink('audit', 'Audit & Controls', 'bi-shield-check')}
            </ul>
          </nav>
        </div>
        <div class="sidebar-footer-box mx-3 mb-3 p-3 rounded-3">
          <div class="d-flex gap-2 align-items-center"><i class="bi bi-shield-lock-fill fs-5"></i><div><strong>Secure Session</strong><small class="d-block text-white-50">Admin control account</small></div></div>
        </div>
      </aside>

      <main class="app-main">
        <div class="app-content-header">
          <div class="container-fluid">
            <div class="row align-items-center">
              <div class="col-sm-7"><h3 class="mb-0" id="pageTitle">Dashboard</h3><div class="text-secondary small mt-1" id="pageSubtitle">Cooperative operations overview</div></div>
              <div class="col-sm-5"><ol class="breadcrumb float-sm-end mb-0"><li class="breadcrumb-item"><a href="#/dashboard">Home</a></li><li class="breadcrumb-item active" id="breadcrumbCurrent">Dashboard</li></ol></div>
            </div>
          </div>
        </div>
        <div class="app-content">
          <div class="container-fluid" id="page"></div>
        </div>
      </main>

      <footer class="app-footer"><strong>Shanduko Housing Cooperative</strong><div class="float-end d-none d-sm-inline">Registry & Financial Management Portal · v1.0</div></footer>
    </div>
  </body>`;
}

function dashboard() {
  return `
  <div class="row g-3 mb-3">
    ${infoBox('Registered Members', '1,248', '18 added this month', 'bi-people-fill', 'primary')}
    ${infoBox('Receipts Processed', '326', '12% vs last month', 'bi-receipt-cutoff', 'warning')}
    ${infoBox('Admin Fees', '$8,420', 'Current period', 'bi-wallet2', 'success')}
    ${infoBox('Development Fees', '$42,860', 'Current period', 'bi-buildings', 'info')}
  </div>

  <div class="row g-3">
    <div class="col-xl-8">
      <div class="card card-outline card-primary h-100">
        <div class="card-header"><h3 class="card-title">Collections Overview</h3><div class="card-tools"><span class="badge text-bg-light me-1"><i class="bi bi-circle-fill text-primary me-1"></i> Admin</span><span class="badge text-bg-light"><i class="bi bi-circle-fill text-success me-1"></i> Development</span></div></div>
        <div class="card-body"><div class="chart-placeholder tall"><div class="bars">${barSet([52,74,39,82,58,72,92],[74,62,48,68,51,64,76])}</div><div class="chart-axis"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div></div></div>
      </div>
    </div>
    <div class="col-xl-4">
      <div class="card card-outline card-primary h-100">
        <div class="card-header"><h3 class="card-title">Receipt Insights</h3><div class="card-tools"><span class="text-muted small">This week</span></div></div>
        <div class="card-body"><svg class="trend-chart" viewBox="0 0 520 220" preserveAspectRatio="none"><path d="M10 170 C70 140 84 157 128 122 S204 145 250 98 S318 115 360 81 S434 130 510 50" fill="none" stroke="var(--bs-primary)" stroke-width="4"/><path d="M10 188 C68 169 87 142 128 159 S198 132 250 142 S318 119 360 137 S436 113 510 102" fill="none" stroke="#20c997" stroke-width="4"/></svg><div class="d-flex justify-content-between text-muted small px-2"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div></div>
      </div>
    </div>

    <div class="col-xl-8">
      <div class="card h-100">
        <div class="card-header"><h3 class="card-title">Recent Transactions</h3><div class="card-tools"><a href="#/transactions" class="btn btn-tool">View all <i class="bi bi-arrow-right"></i></a></div></div>
        <div class="card-body p-0 table-responsive"><table class="table table-hover align-middle mb-0"><thead><tr><th>Receipt</th><th>Member / Stand</th><th>Ledger</th><th>Amount</th><th>Status</th></tr></thead><tbody>
          <tr><td><code>SHND-2026-B0899</code></td><td><strong>Tendai Kwenda</strong><div class="text-muted small">Stand 0812</div></td><td><span class="badge text-bg-info">Development</span></td><td><strong>$1,200.00</strong></td><td><span class="badge text-bg-success">Committed</span></td></tr>
          <tr><td><code>SHND-2026-B0892</code></td><td><strong>John T. Moyo</strong><div class="text-muted small">Stand 1402</div></td><td><span class="badge text-bg-info">Development</span></td><td><strong>$450.00</strong></td><td><span class="badge text-bg-success">Committed</span></td></tr>
          <tr><td><code>SHND-2026-B0495</code></td><td><strong>Farai Ndlovu</strong><div class="text-muted small">Stand 1109</div></td><td><span class="badge text-bg-primary">Admin</span></td><td><strong>$35.00</strong></td><td><span class="badge text-bg-success">Committed</span></td></tr>
        </tbody></table></div>
      </div>
    </div>
    <div class="col-xl-4">
      <div class="card card-outline card-warning h-100"><div class="card-header"><h3 class="card-title">Control Health</h3></div><div class="card-body"><div class="control-row"><div><i class="bi bi-receipt-cutoff text-primary"></i><span>Paper receipts linked</span></div><strong>100%</strong></div><div class="control-row"><div><i class="bi bi-shield-check text-success"></i><span>Ledger separation</span></div><strong>Locked</strong></div><div class="control-row"><div><i class="bi bi-camera text-info"></i><span>Identity photos</span></div><strong>98%</strong></div><div class="control-row"><div><i class="bi bi-bank text-warning"></i><span>Bank context captured</span></div><strong>100%</strong></div></div></div>
    </div>
  </div>`;
}

function infoBox(title, value, note, icon, tone) {
  return `<div class="col-sm-6 col-xl-3"><div class="info-box shadow-sm"><span class="info-box-icon text-bg-${tone}"><i class="bi ${icon}"></i></span><div class="info-box-content"><span class="info-box-text">${title}</span><span class="info-box-number">${value}</span><span class="text-muted small">${note}</span></div></div></div>`;
}

function barSet(a, b) {
  return a.map((v, i) => `<div class="bar-group"><span class="bar bar-a" style="height:${v}%"></span><span class="bar bar-b" style="height:${b[i]}%"></span></div>`).join('');
}

function membersPage() {
  const rows = members.map(m => `<tr><td><code>${m.id}</code></td><td><strong>${m.name}</strong><div class="text-muted small">${m.stand}</div></td><td>${m.spouse}</td><td>${money(m.balance)}</td><td><span class="badge ${m.status === 'Active' ? 'text-bg-success' : 'text-bg-warning'}">${m.status}</span></td><td><button class="btn btn-sm btn-outline-secondary" data-member="${m.id}"><i class="bi bi-eye"></i></button></td></tr>`).join('');
  return `<div class="card card-outline card-primary"><div class="card-header"><h3 class="card-title">Cooperative Member Registry</h3><div class="card-tools d-flex gap-2"><div class="input-group input-group-sm" style="width:260px"><span class="input-group-text"><i class="bi bi-search"></i></span><input id="memberSearch" class="form-control" placeholder="Search members..." /></div><a href="#/new-member" class="btn btn-primary btn-sm"><i class="bi bi-plus-lg me-1"></i>New Member</a></div></div><div class="card-body p-0 table-responsive"><table class="table table-striped table-hover align-middle mb-0"><thead><tr><th>Member ID</th><th>Primary member</th><th>Spouse</th><th>Recorded balance</th><th>Status</th><th></th></tr></thead><tbody id="memberRows">${rows}</tbody></table></div></div>`;
}

function newMemberPage() {
  return `<form id="memberForm"><div class="card card-outline card-primary"><div class="card-header"><h3 class="card-title">1. Primary Member & Spouse Identity</h3></div><div class="card-body"><div class="row g-3"><div class="col-md-6"><label class="form-label">Full Name (Primary)</label><input class="form-control" name="name" value="John Tatenda Moyo" required></div><div class="col-md-6"><label class="form-label">Spouse Full Name</label><input class="form-control" value="Mary R. Moyo"></div><div class="col-md-6"><label class="form-label">National ID Number</label><input class="form-control" value="63-1234567-X-45" required></div><div class="col-md-6"><label class="form-label">Spouse National ID</label><input class="form-control" value="63-7654321-Y-45"></div><div class="col-md-6"><label class="form-label">Stand / Plot Number</label><input class="form-control" value="Stand 1402, Phase 2" required></div><div class="col-md-3"><div class="upload-tile"><i class="bi bi-person-bounding-box"></i><strong>Member photo</strong><small>Upload image</small></div></div><div class="col-md-3"><div class="upload-tile"><i class="bi bi-camera"></i><strong>Spouse photo</strong><small>Upload image</small></div></div></div></div></div><div class="card card-outline card-secondary"><div class="card-header"><h3 class="card-title">2. Legal Dependents & Trust Hierarchy</h3></div><div class="card-body"><div class="row g-4"><div class="col-md-6"><h6 class="fw-semibold">Next of Kin</h6><label class="form-label">Full Name & Relationship</label><input class="form-control mb-3" value="Blessing Moyo (Brother)"><label class="form-label">Contact Telephone</label><input class="form-control" value="+263 77 210 0234"></div><div class="col-md-6"><h6 class="fw-semibold">Primary Beneficiary</h6><label class="form-label">Beneficiary Name</label><input class="form-control mb-3" value="Tinashe Moyo (Son)"><label class="form-label">Allocation Rights (%)</label><input class="form-control" value="100% Asset Claim"></div></div><div class="d-flex justify-content-end gap-2 mt-4"><button type="reset" class="btn btn-light border">Clear Form</button><button class="btn btn-primary" type="submit">Save Member Record <i class="bi bi-arrow-right ms-1"></i></button></div></div></div></form>`;
}

function transactionsPage() {
  return `<div class="row g-3"><div class="col-lg-7"><div class="card card-outline card-primary"><div class="card-header"><h3 class="card-title">Central Transaction Processing</h3></div><div class="card-body"><div class="alert alert-info"><div class="d-flex gap-2"><i class="bi bi-shield-lock-fill fs-5"></i><div><strong>Accounting Protocol Rule</strong><div class="small">Choose the target allocation account first. The transaction router locks the entry to the selected isolated ledger.</div></div></div></div><h6 class="fw-semibold text-uppercase text-secondary small">1. Target Allocation Account</h6><div class="row g-2 mb-4"><div class="col-md-6"><label class="account-choice"><input type="radio" name="account" value="admin"> <span><strong>Admin Fees</strong><small>Operational & compliance costs</small></span></label></div><div class="col-md-6"><label class="account-choice selected"><input type="radio" name="account" value="development" checked> <span><strong>Development Fees</strong><small>Land & infrastructure</small></span></label></div></div><h6 class="fw-semibold text-uppercase text-secondary small">2. Member / Stand</h6><div class="input-group"><span class="input-group-text"><i class="bi bi-search"></i></span><input class="form-control" value="Stand 1402 — John Tatenda Moyo"></div></div></div></div><div class="col-lg-5"><form id="transactionForm" class="card card-outline card-success"><div class="card-header"><h3 class="card-title">Transaction Fields</h3></div><div class="card-body"><label class="form-label">Receipt Number (from paper book)</label><input class="form-control mb-3" value="SHND-2026-B0892" required><label class="form-label">Date of Bank Deposit</label><input class="form-control mb-3" value="26 / 06 / 2026" required><div class="row"><div class="col-6"><label class="form-label">Amount (USD)</label><input class="form-control" value="450.00" required></div><div class="col-6"><label class="form-label">Bank Clearing Branch</label><input class="form-control" value="NMB Bank — Excellence Centre" required></div></div></div><div class="card-footer d-flex justify-content-end gap-2"><button type="reset" class="btn btn-light border">Clear</button><button class="btn btn-success" type="submit">Commit Transaction <i class="bi bi-arrow-right ms-1"></i></button></div></form></div></div>`;
}

function ledgerPage(kind) {
  const data = kind === 'admin' ? adminLedger : developmentLedger;
  const title = kind === 'admin' ? 'Admin Fees Ledger' : 'Development Fees Ledger';
  const description = kind === 'admin' ? 'Operational administration, compliance certificates and staff overheads.' : 'Civil engineering, trenching, road layers and electrical connectivity.';
  const total = data.reduce((s, r) => s + r[4], 0);
  const rows = data.map(r => `<tr><td><code>${r[0]}</code></td><td>${r[1]}</td><td><strong>${r[2].split(' — ')[1]}</strong><div class="text-muted small">${r[2].split(' — ')[0]}</div></td><td>${r[3]}</td><td><strong>${money(r[4])}</strong></td><td><span class="badge text-bg-success">Verified</span></td></tr>`).join('');
  return `<div class="row g-3 mb-3">${infoBox('Period receipts', String(data.length), 'Paper-linked entries', 'bi-receipt', 'primary')}${infoBox('Ledger total', money(total), 'Current sample period', 'bi-cash-stack', 'success')}${infoBox('Integrity', 'Balanced', 'Source documents matched', 'bi-check2-circle', 'warning')}</div><div class="card card-outline card-primary"><div class="card-header"><h3 class="card-title">${title}</h3><div class="card-tools"><span class="text-muted small me-2">${description}</span><button class="btn btn-sm btn-outline-secondary"><i class="bi bi-download me-1"></i>Export</button></div></div><div class="card-body p-0 table-responsive"><table class="table table-hover align-middle mb-0"><thead><tr><th>Receipt #</th><th>Processing date</th><th>Member / Stand</th><th>Bank branch context</th><th>Amount</th><th>Status</th></tr></thead><tbody>${rows}</tbody></table></div></div>`;
}

function auditPage() {
  return `<div class="row g-3"><div class="col-lg-7"><div class="card card-outline card-primary"><div class="card-header"><h3 class="card-title">Audit Trail</h3></div><div class="card-body">${auditEvent('bi-receipt','Transaction committed','SHND-2026-B0899 routed to Development Fees for Stand 0812.','Today, 14:32')}${auditEvent('bi-person-plus','Member record created','John Tatenda Moyo — Stand 1402, Phase 2.','Yesterday, 10:18')}${auditEvent('bi-shield-check','Paper receipt matched','SHND-2026-B0892 reconciled to NMB Bank — Excellence Centre.','26/06/2026')}</div></div></div><div class="col-lg-5"><div class="card card-outline card-success"><div class="card-header"><h3 class="card-title">Control Checklist</h3></div><div class="card-body">${['Receipt number captured from paper book','Deposit date recorded','Bank branch recorded','Ledger allocation separated','Identity evidence linked'].map(x => `<div class="d-flex align-items-center gap-2 py-2 border-bottom"><i class="bi bi-check-circle-fill text-success"></i><span>${x}</span></div>`).join('')}</div></div></div></div>`;
}

function auditEvent(icon, title, text, time) {
  return `<div class="d-flex gap-3 py-3 border-bottom"><span class="audit-icon"><i class="bi ${icon}"></i></span><div class="flex-grow-1"><strong>${title}</strong><div class="text-muted small">${text}</div></div><time class="text-muted small text-nowrap">${time}</time></div>`;
}

function render() {
  const raw = location.hash.replace('#/', '') || 'dashboard';
  const map = { 'new-member': 'newMember', 'admin-ledger': 'adminLedger', 'development-ledger': 'developmentLedger' };
  const key = map[raw] || raw;
  const actual = ['dashboard','members','newMember','transactions','adminLedger','developmentLedger','audit'].includes(key) ? key : 'dashboard';
  const [title, subtitle] = pageMeta[actual];
  document.querySelector('#pageTitle').textContent = title;
  document.querySelector('#pageSubtitle').textContent = subtitle;
  document.querySelector('#breadcrumbCurrent').textContent = title;
  document.querySelectorAll('.sidebar-menu .nav-link').forEach(a => a.classList.toggle('active', a.dataset.page === actual));
  const pageMap = { dashboard, members: membersPage, newMember: newMemberPage, transactions: transactionsPage, adminLedger: () => ledgerPage('admin'), developmentLedger: () => ledgerPage('development'), audit: auditPage };
  document.querySelector('#page').innerHTML = pageMap[actual]();
  wireEvents(actual);
}

function wireEvents(actual) {
  if (actual === 'members') {
    document.querySelector('#memberSearch')?.addEventListener('input', e => { const q = e.target.value.toLowerCase(); document.querySelectorAll('#memberRows tr').forEach(r => r.style.display = r.innerText.toLowerCase().includes(q) ? '' : 'none'); });
    document.querySelectorAll('[data-member]').forEach(b => b.addEventListener('click', () => toast(`Opened member ${b.dataset.member}`, 'success')));
  }
  if (actual === 'newMember') document.querySelector('#memberForm')?.addEventListener('submit', e => { e.preventDefault(); toast('Member record validated and ready to save.', 'success'); });
  if (actual === 'transactions') {
    document.querySelector('#transactionForm')?.addEventListener('submit', e => { e.preventDefault(); toast('Transaction committed to the selected isolated ledger.', 'success'); });
    document.querySelectorAll('.account-choice').forEach(label => label.addEventListener('click', () => { document.querySelectorAll('.account-choice').forEach(l => l.classList.remove('selected')); label.classList.add('selected'); }));
  }
}

function toast(message, type='info') {
  const el = document.createElement('div'); el.className = `toast-msg ${type}`; el.innerHTML = `<i class="bi ${type === 'success' ? 'bi-check-circle-fill' : 'bi-info-circle-fill'}"></i>${message}`; document.body.appendChild(el); setTimeout(() => el.classList.add('show'), 10); setTimeout(() => { el.classList.remove('show'); setTimeout(() => el.remove(), 250); }, 2600);
}

document.documentElement.lang = 'en';
document.body.className = 'layout-fixed sidebar-expand-lg bg-body-tertiary';
document.body.innerHTML = shell().replace(/^\s*<body[^>]*>/, '').replace(/<\/body>\s*$/, '');
document.querySelector('#globalSearch')?.addEventListener('keydown', e => { if (e.key === 'Enter' && e.target.value.trim()) { location.hash = '#/members'; setTimeout(() => { const input = document.querySelector('#memberSearch'); if (input) { input.value = e.target.value; input.dispatchEvent(new Event('input')); } }, 0); } });
window.addEventListener('hashchange', render);
render();
