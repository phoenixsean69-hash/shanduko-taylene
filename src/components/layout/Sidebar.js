const items = [
  ['dashboard', 'Dashboard', 'bi-pie-chart-fill'],
  ['leaderboard', 'Leaderboard', 'bi-bar-chart'],
  ['order', 'Order', 'bi-cart3'],
  ['products', 'Products', 'bi-bag'],
  ['sales-report', 'Sales Report', 'bi-graph-up'],
  ['messages', 'Messages', 'bi-chat-left-text'],
  ['settings', 'Settings', 'bi-gear'],
  ['sign-out', 'Sign Out', 'bi-box-arrow-right'],
];

export function Sidebar() {
  return `
    <aside class="figma-sidebar">
      <a href="#/dashboard" class="figma-brand">
        <span class="brand-symbol"><i class="bi bi-link-45deg"></i></span>
        <strong>Shanduko</strong>
      </a>
      <nav class="figma-nav">
        ${items.map(([key, label, icon]) => `
          <a href="#/${key}" class="figma-nav-item ${key === 'dashboard' ? 'active' : ''}" data-page="${key}">
            <i class="bi ${icon}"></i><span>${label}</span>
          </a>
        `).join('')}
      </nav>
      <div class="pro-card">
        <div class="pro-orb"><i class="bi bi-currency-dollar"></i></div>
        <strong>Shanduko Pro</strong>
        <small>Get access to all<br>cooperative tools and reporting</small>
        <button>Get Pro</button>
      </div>
    </aside>
  `;
}

