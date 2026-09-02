import './style.css';

const state = {
  theme: localStorage.getItem('shanduko-theme') || 'light',
  sidebarCollapsed: false,
  route: location.hash.replace('#/', '') || 'dashboard',
  toast: null,
};

const members = [
  { id: 'SH-001402', name: 'John Tatenda Moyo', initials: 'JM', stand: '1402', phase: 'Phase 2', spouse: 'Mary R. Moyo', status: 'Active', paid: 4500, nextOfKin: 'Blessing Moyo', beneficiary: 'Tinashe Moyo' },
  { id: 'SH-000244', name: 'Chipo Gumbo', initials: 'CG', stand: '0244', phase: 'Phase 1', spouse: '—', status: 'Active', paid: 1250, nextOfKin: 'Rudo Gumbo', beneficiary: 'Tapiwa Gumbo' },
  { id: 'SH-001109', name: 'Farai Ndlovu', initials: 'FN', stand: '1109', phase: 'Phase 2', spouse: '—', status: 'Active', paid: 860, nextOfKin: 'Nyasha Ndlovu', beneficiary: 'Tanaka Ndlovu' },
  { id: 'SH-000812', name: 'Tendai Kwenda', initials: 'TK', stand: '0812', phase: 'Phase 1', spouse: 'Patience Kwenda', status: 'Pending', paid: 1200, nextOfKin: 'Simba Kwenda', beneficiary: 'Rufaro Kwenda' },
  { id: 'SH-001211', name: 'Munashe Chikore', initials: 'MC', stand: '1211', phase: 'Phase 2', spouse: '—', status: 'Active', paid: 2100, nextOfKin: 'Tariro Chikore', beneficiary: 'Munashe Jr.' },
  { id: 'SH-000677', name: 'Rutendo Dube', initials: 'RD', stand: '0677', phase: 'Phase 1', spouse: 'Kudzai Dube', status: 'Active', paid: 980, nextOfKin: 'Tatenda Dube', beneficiary: 'Anesu Dube' },
];

const adminLedger = [
  { receipt: 'SHND-2026-B0411', date: '12 Apr 2026', member: 'Stand 0244 — Chipo Gumbo', bank: 'CBZ Bank — Kwame Nkrumah', amount: 50 },
  { receipt: 'SHND-2026-B0495', date: '19 May 2026', member: 'Stand 1109 — Farai Ndlovu', bank: 'EcoCash Business Wallet', amount: 35 },
  { receipt: 'SHND-2026-B0524', date: '02 Jun 2026', member: 'Stand 0677 — Rutendo Dube', bank: 'CBZ Bank — First Street', amount: 85 },
];

const developmentLedger = [
  { receipt: 'SHND-2026-B0892', date: '26 Jun 2026', member: 'Stand 1402 — John T. Moyo', bank: 'NMB Bank — Excellence Centre', amount: 450 },
  { receipt: 'SHND-2026-B0899', date: '26 Jun 2026', member: 'Stand 0812 — Tendai Kwenda', bank: 'CABS — Central Branch', amount: 1200 },
  { receipt: 'SHND-2026-B0907', date: '28 Jun 2026', member: 'Stand 1211 — Munashe Chikore', bank: 'Stanbic — Samora Machel', amount: 900 },
];

const pageMeta = {
  dashboard: ['Dashboard', 'Overview of the cooperative registry and financial activity'],
  members: ['Member Registry', 'Search and manage cooperative member records'],
  'new-member': ['New Member', 'Capture a complete cooperative member record'],
  transactions: ['Transaction Processing', 'Route incoming funds into the correct isolated ledger'],
  'admin-ledger': ['Admin Fees Ledger', 'Operational administration and compliance income'],
  'development-ledger': ['Development Fees Ledger', 'Land development and infrastructure income'],
  audit: ['Audit & Controls', 'Review receipt matching, allocation and control events'],
};

const icon = (name) => ({
  grid: '<svg viewBox="0 0 24 24"><path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z"/></svg>',
  users: '<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 19c0-3.3 2.7-6 6-6s6 2.7 6 6M15 14c3.2.2 5 2.1 5 5"/></svg>',
  userPlus: '<svg viewBox="0 0 24 24"><circle cx="8" cy="8" r="3"/><path d="M2.5 19c.5-3.3 2.6-5 5.5-5s5 1.7 5.5 5M17 7v6M14 10h6"/></svg>',
  receipt: '<svg viewBox="0 0 24 24"><path d="M5 3h14v18l-3-2-4 2-4-2-3 2z"/><path d="M8 7h8M8 11h8M8 15h5"/></svg>',
  wallet: '<svg viewBox="0 0 24 24"><path d="M4 6h14a2 2 0 0 1 2 2v10H5a2 2 0 0 1-2-2V6a3 3 0 0 1 3-3h11"/><path d="M16 13h4"/></svg>',
  building: '<svg viewBox="0 0 24 24"><path d="M4 20V6l8-3 8 3v14z"/><path d="M8 9h2M14 9h2M8 13h2M14 13h2M8 17h2M14 17h2"/></svg>',
  shield: '<svg viewBox="0 0 24 24"><path d="M12 3l8 3v5c0 5-3.2 8.7-8 10-4.8-1.3-8-5-8-10V6z"/><path d="m8.5 12 2.2 2.2 4.8-5"/></svg>',
  search: '<svg viewBox="0 0 24 24"><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 5 5"/></svg>',
  menu: '<svg viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>',
  bell: '<svg viewBox="0 0 24 24"><path d="M6 17h12l-1.2-1.8V10a4.8 4.8 0 0 0-9.6 0v5.2zM10 20h4"/></svg>',
  moon: '<svg viewBox="0 0 24 24"><path d="M20 15.5A8 8 0 0 1 8.5 4 8 8 0 1 0 20 15.5z"/></svg>',
  sun: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
  arrow: '<svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  check: '<svg viewBox="0 0 24 24"><path d="m5 12 4 4L19 6"/></svg>',
  plus: '<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>',
  filter: '<svg viewBox="0 0 24 24"><path d="M4 6h16M7 12h10M10 18h4"/></svg>',
  more: '<svg viewBox="0 0 24 24"><circle cx="5" cy="12" r="1.3"/><circle cx="12" cy="12" r="1.3"/><circle cx="19" cy="12" r="1.3"/></svg>',
  close: '<svg viewBox="0 0 24 24"><path d="m6 6 12 12M18 6 6 18"/></svg>',
  camera: '<svg viewBox="0 0 24 24"><path d="M4 7h3l1.5-2h7L17 7h3v12H4z"/><circle cx="12" cy="13" r="3.5"/></svg>',
  lock: '<svg viewBox="0 0 24 24"><rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>',
  download: '<svg viewBox="0 0 24 24"><path d="M12 3v12M7 10l5 5 5-5M5 21h14"/></svg>',
  activity: '<svg viewBox="0 0 24 24"><path d="M4 12h4l2-6 4 12 2-6h4"/></svg>',
}[name] || '');

function money(value) {
  return `$${Number(value).toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
}

function navItem(route, label, iconName, badge = '') {
  const active = state.route === route;
  return `<a class="nav-item ${active ? 'active' : ''}" href="#/${route}" title="${label}">
    <span class="nav-icon">${icon(iconName)}</span><span class="nav-label">${label}</span>${badge ? `<span class="nav-badge">${badge}</span>` : ''}
  </a>`;
}

function layout() {
  const meta = pageMeta[state.route] || pageMeta.dashboard;
  return `
    <div class="app ${state.sidebarCollapsed ? 'sidebar-collapsed' : ''}" data-theme="${state.theme}">
      <aside class="sidebar">
        <div class="brand">
          <div class="brand-symbol">S</div>
          <div class="brand-copy"><strong>SHANDUKO</strong><span>HOUSING COOPERATIVE</span></div>
        </div>
        <div class="sidebar-scroll">
          <div class="user-card">
            <div class="avatar avatar-admin">A</div>
            <div class="user-copy"><strong>Admin Control</strong><span>System Operator</span></div>
            <span class="online-dot"></span>
          </div>
          <div class="menu-title">MAIN MENU</div>
          <nav class="nav">
            ${navItem('dashboard', 'Dashboard', 'grid')}
            ${navItem('members', 'Member Registry', 'users', '1,248')}
            ${navItem('new-member', 'New Member', 'userPlus')}
            <div class="menu-title finance">FINANCE</div>
            ${navItem('transactions', 'Process Transaction', 'receipt')}
            ${navItem('admin-ledger', 'Admin Fees Ledger', 'wallet')}
            ${navItem('development-ledger', 'Development Ledger', 'building')}
            <div class="menu-title finance">CONTROL</div>
            ${navItem('audit', 'Audit & Controls', 'shield')}
          </nav>
        </div>
        <div class="sidebar-footer">
          <div class="security-chip">${icon('lock')}<span>Secure session</span><small>v1.0</small></div>
        </div>
      </aside>

      <div class="main-shell">
        <header class="topbar">
          <div class="topbar-left">
            <button class="icon-btn" id="sidebarToggle" aria-label="Toggle sidebar">${icon('menu')}</button>
            <div class="crumbs"><span>Shanduko</span><b>/</b><strong>${meta[0]}</strong></div>
          </div>
          <div class="topbar-right">
            <div class="header-status"><span class="pulse"></span> All systems operational</div>
            <button class="icon-btn" id="themeToggle" aria-label="Toggle theme">${icon(state.theme === 'dark' ? 'sun' : 'moon')}</button>
            <button class="icon-btn notification" aria-label="Notifications">${icon('bell')}<span>3</span></button>
            <div class="profile-menu"><div class="avatar avatar-admin">A</div><div class="profile-copy"><strong>Admin Control</strong><span>Administrator</span></div><span class="profile-caret">⌄</span></div>
          </div>
        </header>

        <main class="content">
          <div class="content-heading">
            <div><div class="eyebrow">SHANDUKO SYSTEM PORTAL</div><h1>${meta[0]}</h1><p>${meta[1]}</p></div>
            ${state.route === 'members' ? `<a class="btn btn-primary" href="#/new-member">${icon('plus')} Add Member</a>` : state.route === 'dashboard' ? `<a class="btn btn-primary" href="#/transactions">${icon('receipt')} New Transaction</a>` : ''}
          </div>
          ${renderPage()}
        </main>
        <footer class="footer"><span><strong>Shanduko Housing Cooperative</strong> · Integrated Member Registry & Audited Financial Management Portal</span><span>Registry v1.0</span></footer>
      </div>
    </div>
    <div id="toast-root"></div>
  `;
}

function statCard(label, value, note, iconName, tone, href) {
  return `<a class="stat-card ${tone}" href="${href || '#'}"><div class="stat-top"><span>${label}</span><span class="stat-icon">${icon(iconName)}</span></div><strong>${value}</strong><div class="stat-foot"><span>${note}</span><span>${icon('arrow')}</span></div></a>`;
}

function dashboardPage() {
  return `
    <section class="hero-panel">
      <div class="hero-copy"><span class="hero-tag">AUDIT-SAFE WORKFLOW</span><h2>Good evening, Administrator.</h2><p>Every receipt is recorded once, verified, and routed into its designated fee ledger.</p><div class="hero-actions"><a class="btn btn-light" href="#/transactions">Process transaction ${icon('arrow')}</a><a class="text-link" href="#/audit">View audit trail</a></div></div>
      <div class="hero-visual"><div class="hero-ring"><div>${icon('shield')}<strong>100%</strong><span>controlled</span></div></div></div>
    </section>
    <div class="stats-grid">
      ${statCard('Registered Members', '1,248', '+18 this month', 'users', 'green', '#/members')}
      ${statCard('Receipts Processed', '326', 'Current month', 'receipt', 'blue', '#/transactions')}
      ${statCard('Admin Fees', '$8,420', 'Current period', 'wallet', 'teal', '#/admin-ledger')}
      ${statCard('Development Fees', '$42,860', 'Current period', 'building', 'amber', '#/development-ledger')}
    </div>
    <div class="dashboard-grid">
      <section class="panel activity-panel"><div class="panel-head"><div><h3>Recent transaction activity</h3><p>Latest committed financial events</p></div><a class="text-link" href="#/transactions">View all ${icon('arrow')}</a></div>
        <div class="table-wrap"><table><thead><tr><th>Receipt</th><th>Member / Stand</th><th>Allocation</th><th>Amount</th><th>Status</th></tr></thead><tbody>
          ${[
            ['SHND-2026-B0899','Stand 0812 — Tendai Kwenda','Development',1200],
            ['SHND-2026-B0892','Stand 1402 — John T. Moyo','Development',450],
            ['SHND-2026-B0495','Stand 1109 — Farai Ndlovu','Admin',35],
            ['SHND-2026-B0411','Stand 0244 — Chipo Gumbo','Admin',50],
          ].map(r => `<tr><td><strong>${r[0]}</strong><span class="muted">Paper receipt</span></td><td>${r[1]}</td><td><span class="pill ${r[2] === 'Admin' ? 'pill-blue' : 'pill-amber'}">${r[2]}</span></td><td class="amount">${money(r[3])}</td><td><span class="status success">${icon('check')} Committed</span></td></tr>`).join('')}
        </tbody></table></div>
      </section>
      <section class="panel control-panel"><div class="panel-head"><div><h3>Control health</h3><p>Key operational safeguards</p></div><a class="icon-btn small" href="#/audit">${icon('arrow')}</a></div>
        <div class="health-list">
          <div class="health-item"><span class="health-icon green">${icon('lock')}</span><div><strong>Balances locked</strong><p>Clerks cannot directly modify balances.</p></div><span class="check-dot">${icon('check')}</span></div>
          <div class="health-item"><span class="health-icon blue">${icon('camera')}</span><div><strong>Identity photos</strong><p>Member, spouse and beneficiary assets are captured.</p></div><span class="check-dot">${icon('check')}</span></div>
          <div class="health-item"><span class="health-icon amber">${icon('building')}</span><div><strong>Ledger separation</strong><p>Admin and Development streams remain isolated.</p></div><span class="check-dot">${icon('check')}</span></div>
        </div>
        <div class="health-summary"><span>Audit readiness</span><strong>98%</strong><div class="progress"><span style="width:98%"></span></div></div>
      </section>
    </div>`;
}

function membersPage() {
  return `<section class="panel"><div class="panel-head members-tools"><div><h3>Cooperative Member Registry</h3><p>Complete identity, stand and beneficiary records</p></div><div class="toolbar"><label class="search-box">${icon('search')}<input id="memberSearch" placeholder="Search name, stand or member ID…"></label><button class="filter-btn">${icon('filter')} Filter</button></div></div>
  <div class="table-wrap"><table id="membersTable"><thead><tr><th>Member</th><th>Stand / Phase</th><th>Spouse</th><th>Paid</th><th>Status</th><th></th></tr></thead><tbody>${members.map(m => `<tr data-search="${`${m.name} ${m.id} ${m.stand} ${m.spouse}`.toLowerCase()}"><td><div class="member-cell"><div class="avatar member-avatar">${m.initials}</div><div><strong>${m.name}</strong><span>${m.id}</span></div></div></td><td><strong>Stand ${m.stand}</strong><span class="muted">${m.phase}</span></td><td>${m.spouse}</td><td class="amount">${money(m.paid)}</td><td><span class="status ${m.status === 'Active' ? 'success' : 'warning'}">${m.status}</span></td><td><button class="more-btn" data-member="${m.id}">${icon('more')}</button></td></tr>`).join('')}</tbody></table></div>
  <div class="panel-foot"><span>Showing <strong id="memberCount">${members.length}</strong> of ${members.length} members</span><div class="pagination"><button disabled>‹</button><button class="active">1</button><button>2</button><button>3</button><button>›</button></div></div>
  </section>`;
}

function newMemberPage() {
  return `<section class="form-layout"><div class="panel"><div class="panel-head"><div><h3>Primary member & spouse identity</h3><p>Core identity and allocated stand information</p></div><span class="step">01</span></div><form id="memberForm" class="form-body"><div class="form-grid two"><label>Full name (primary)<input name="primaryName" value="John Tatenda Moyo" required></label><label>Spouse full name<input name="spouseName" value="Mary R. Moyo"></label><label>National ID number<input name="nationalId" value="63-1234567-X-45" required></label><label>Spouse national ID<input name="spouseId" value="63-7654321-Y-45"></label><label>Stand / Plot number<input name="stand" value="Stand 1402, Phase 2" required></label><label>Member status<select><option>Active</option><option>Pending</option></select></label></div><div class="photo-row"><photo-slot label="Member photo" file="moyo_primary.jpg"></photo-slot><photo-slot label="Spouse photo" file="moyo_spouse.jpg"></photo-slot></div></form></div>
  <div class="panel"><div class="panel-head"><div><h3>Legal dependents & trust hierarchy</h3><p>Next of kin and beneficiary allocation</p></div><span class="step">02</span></div><div class="form-body"><div class="form-grid two"><div class="subpanel"><div class="subhead">Next of kin</div><label>Full name & relationship<input value="Blessing Moyo (Brother)"></label><label>Contact telephone<input value="+263 77 210 0234"></label></div><div class="subpanel"><div class="subhead">Primary beneficiary</div><label>Beneficiary name<input value="Tinashe Moyo (Son)"></label><label>Allocation rights (%)<input value="100% Asset Claim"></label></div></div><div class="form-actions"><button type="button" class="btn btn-secondary" id="clearMember">Clear form</button><button type="button" class="btn btn-primary" id="saveMember">Save member record ${icon('check')}</button></div></div></div></section>`;
}

function photoSlot({label,file}) {
  return `<div class="photo-slot">${icon('camera')}<strong>${label}</strong><span>${file}</span><small>JPG / PNG · identity asset</small></div>`;
}

function transactionsPage() {
  return `<section class="transaction-layout"><div class="panel protocol-panel"><div class="protocol-banner"><div class="protocol-icon">${icon('shield')}</div><div><strong>Accounting protocol rule</strong><p>Choose the target allocation account first. The transaction router locks the ledger destination before commitment.</p></div></div><div class="panel-inner"><div class="section-label">01 · TARGET ALLOCATION ACCOUNT</div><div class="account-cards"><label class="account-card"><input type="radio" name="account" value="admin" checked><div><span class="account-icon blue">${icon('wallet')}</span><strong>Admin Fees</strong><small>Operational & compliance</small></div><span class="radio"></span></label><label class="account-card"><input type="radio" name="account" value="development"><div><span class="account-icon amber">${icon('building')}</span><strong>Development Fees</strong><small>Land & infrastructure</small></div><span class="radio"></span></label></div><div class="section-label top-gap">02 · SEARCH MEMBER / STAND</div><label class="member-search-large">${icon('search')}<input id="transactionMember" value="Stand 1402 — John Tatenda Moyo"><span class="search-tag">Verified</span></label></div></div>
  <div class="panel transaction-form-panel"><div class="panel-head"><div><h3>Transaction fields input</h3><p>Mirror the physical paper receipt and bank trail</p></div><span class="lock-label">${icon('lock')} Locked on commit</span></div><form id="transactionForm" class="form-body"><label>Receipt number (from paper book)<input value="SHND-2026-B0892" required></label><div class="form-grid two"><label>Date of bank deposit<input type="date" value="2026-06-26" required></label><label>Amount paid (USD)<div class="input-prefix"><span>$</span><input value="450.00" required></div></label></div><label>Bank clearing branch<select><option>NMB Bank — Excellence Centre</option><option>CBZ Bank — Kwame Nkrumah</option><option>CABS — Central Branch</option><option>EcoCash Business Wallet</option></select></label><div class="form-actions"><button type="reset" class="btn btn-secondary">Clear form</button><button class="btn btn-primary" type="submit">Commit transaction ${icon('arrow')}</button></div></form></div></section>`;
}

function ledgerPage(kind) {
  const admin = kind === 'admin-ledger';
  const rows = admin ? adminLedger : developmentLedger;
  return `<section class="panel ledger-panel"><div class="ledger-banner ${admin ? 'blue' : 'amber'}"><div><span class="eyebrow">ISOLATED SUB-LEDGER</span><h2>${admin ? 'Admin Fees Ledger' : 'Development Fees Ledger'}</h2><p>${admin ? 'Operational administration, compliance certificates and staff overheads.' : 'Civil engineering, trenching, road layer bases and electrical connectivity.'}</p></div><div class="ledger-total"><span>Current period</span><strong>${admin ? '$8,420.00' : '$42,860.00'}</strong></div></div><div class="ledger-summary"><div><span>Total receipts</span><strong>${rows.length}</strong></div><div><span>Sample period</span><strong>${money(rows.reduce((s,r)=>s+r.amount,0))}</strong></div><div><span>Integrity</span><strong class="good">Balanced</strong></div><button class="filter-btn" id="exportLedger">${icon('download')} Export</button></div><div class="table-wrap"><table><thead><tr><th>Receipt # (Paper)</th><th>Processing date</th><th>Member association</th><th>Bank branch context</th><th class="right">Amount (USD)</th></tr></thead><tbody>${rows.map(r => `<tr><td><strong>${r.receipt}</strong><span class="muted">Paper book</span></td><td>${r.date}</td><td>${r.member}</td><td>${r.bank}</td><td class="right amount">${money(r.amount)}</td></tr>`).join('')}</tbody></table></div><div class="panel-foot"><span>Ledger entries are isolated from the ${admin ? 'Development Fees' : 'Admin Fees'} stream.</span><span class="status success">${icon('check')} Balanced</span></div></section>`;
}

function auditPage() {
  return `<section class="audit-grid"><div class="panel"><div class="panel-head"><div><h3>Audit trail</h3><p>Chronological transaction and registry events</p></div><a href="#/audit" class="icon-btn small">${icon('activity')}</a></div><div class="timeline"><div class="timeline-item"><span class="timeline-dot green">${icon('check')}</span><div><strong>Transaction committed</strong><p>SHND-2026-B0899 routed to Development Fees for Stand 0812.</p><small>Today · 14:32</small></div></div><div class="timeline-item"><span class="timeline-dot blue">${icon('users')}</span><div><strong>Member record created</strong><p>John Tatenda Moyo — Stand 1402, Phase 2.</p><small>Yesterday · 10:18</small></div></div><div class="timeline-item"><span class="timeline-dot amber">${icon('receipt')}</span><div><strong>Paper receipt matched</strong><p>SHND-2026-B0892 reconciled to NMB Bank — Excellence Centre.</p><small>26 Jun 2026</small></div></div><div class="timeline-item"><span class="timeline-dot slate">${icon('shield')}</span><div><strong>Control review passed</strong><p>Ledger separation and mandatory identity fields verified.</p><small>24 Jun 2026</small></div></div></div></div><div class="panel checklist"><div class="panel-head"><div><h3>Control checklist</h3><p>Controls required before commit</p></div></div>${['Receipt number captured from paper book','Deposit date recorded','Bank branch recorded','Member / stand association verified','Ledger allocation separated','Audit event generated'].map(x => `<label><span class="check-box">${icon('check')}</span>${x}</label>`).join('')}<div class="check-footer">${icon('shield')} <strong>6 / 6 controls satisfied</strong></div></div></section>`;
}

function renderPage() {
  switch (state.route) {
    case 'members': return membersPage();
    case 'new-member': return newMemberPage();
    case 'transactions': return transactionsPage();
    case 'admin-ledger': return ledgerPage('admin-ledger');
    case 'development-ledger': return ledgerPage('development-ledger');
    case 'audit': return auditPage();
    default: return dashboardPage();
  }
}

function mount() {
  document.querySelector('#app').innerHTML = layout();
  bindEvents();
}

function toast(message, type = 'success') {
  const root = document.querySelector('#toast-root');
  root.innerHTML = `<div class="toast ${type}"><span>${icon(type === 'success' ? 'check' : 'activity')}</span><div><strong>${type === 'success' ? 'Completed' : 'Notice'}</strong><p>${message}</p></div><button id="toastClose">${icon('close')}</button></div>`;
  requestAnimationFrame(() => root.querySelector('.toast')?.classList.add('show'));
  root.querySelector('#toastClose')?.addEventListener('click', () => root.innerHTML = '');
  setTimeout(() => { root.innerHTML = ''; }, 4200);
}

function bindEvents() {
  document.querySelector('#sidebarToggle')?.addEventListener('click', () => {
    state.sidebarCollapsed = !state.sidebarCollapsed;
    mount();
  });
  document.querySelector('#themeToggle')?.addEventListener('click', () => {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('shanduko-theme', state.theme);
    mount();
  });
  document.querySelector('#memberSearch')?.addEventListener('input', (e) => {
    const q = e.target.value.trim().toLowerCase();
    const rows = [...document.querySelectorAll('#membersTable tbody tr')];
    let count = 0;
    rows.forEach(row => {
      const show = !q || row.dataset.search.includes(q);
      row.style.display = show ? '' : 'none';
      if (show) count++;
    });
    const counter = document.querySelector('#memberCount');
    if (counter) counter.textContent = count;
  });
  document.querySelectorAll('[data-member]').forEach(btn => btn.addEventListener('click', () => toast(`Member ${btn.dataset.member} selected. Profile drawer can be connected to the registry API.`)));
  document.querySelector('#saveMember')?.addEventListener('click', () => toast('Member record validated and ready for secure persistence.'));
  document.querySelector('#clearMember')?.addEventListener('click', () => document.querySelector('#memberForm')?.reset());
  document.querySelector('#transactionForm')?.addEventListener('submit', e => { e.preventDefault(); const account = document.querySelector('input[name="account"]:checked')?.value; toast(`Transaction committed to the ${account === 'admin' ? 'Admin Fees' : 'Development Fees'} isolated ledger.`); });
  document.querySelector('#exportLedger')?.addEventListener('click', () => toast('Ledger export prepared. Connect this action to CSV/PDF generation when the backend is available.'));
}

window.addEventListener('hashchange', () => {
  state.route = location.hash.replace('#/', '') || 'dashboard';
  mount();
});

mount();
