const groups = [
  {
    title: 'WORKSPACE',
    items: [
      [
        'dashboard',
        'Dashboard',
        'bi-grid-1x2-fill'
      ],
      [
        'members',
        'Member Registry',
        'bi-people-fill'
      ],
      [
        'new-member',
        'Add Member',
        'bi-person-plus-fill'
      ],
    ],
  },
  {
    title: 'FINANCE TRACKING',
    items: [
      [
        'admin-ledger',
        'Admin Finance Tracking',
        'bi-wallet2'
      ],
      [
        'development-ledger',
        'Development Finance Tracking',
        'bi-building'
      ],
    ],
  },
  {
    title: 'CONTROL',
    items: [
      [
        'audit',
        'Audit & Controls',
        'bi-shield-check'
      ],
    ],
  },
];

export function Sidebar() {
  return `
    <aside class="figma-sidebar">

      <a
        href="#/dashboard"
        class="brand"
      >
        <span class="brand-mark">
          <img
            src="/shanduko.png"
            alt=""
            aria-hidden="true"
          >
        </span>

        <span>
          <strong>Shanduko</strong>
          <small>Housing Cooperative</small>
        </span>
      </a>

      <nav class="sidebar-nav">

        ${groups.map(group => `
          <div class="nav-group">

            <div class="nav-group-title">
              ${group.title}
            </div>

            ${group.items.map(
              ([
                key,
                label,
                icon
              ]) => `
                <a
                  href="#/${key}"
                  class="nav-item"
                  data-page="${key}"
                >
                  <i class="bi ${icon}"></i>
                  <span>${label}</span>
                </a>
              `
            ).join('')}

          </div>
        `).join('')}

      </nav>

      <div class="sidebar-security">

        <div class="security-icon">
          <i class="bi bi-shield-lock-fill"></i>
        </div>

        <strong>Registry</strong>
        <small>
          Secure cooperative records
        </small>

      </div>

    </aside>
  `;
}