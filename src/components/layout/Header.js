export function Header() {
  return `
    <header class="figma-header">
      <div class="header-title">Dashboard</div>
      <label class="figma-search">
        <i class="bi bi-search"></i>
        <input id="globalSearch" placeholder="Search here..." aria-label="Search here">
      </label>
      <div class="header-actions">
        <button class="icon-button language"><span>ðŸ‡ºðŸ‡¸</span> Eng (us) <i class="bi bi-chevron-down"></i></button>
        <button class="icon-button" aria-label="Notifications"><i class="bi bi-bell"></i><span class="notification-dot"></span></button>
        <button class="profile-button">
          <span class="profile-photo">M</span>
          <span class="profile-copy"><strong>Musfiq</strong><small>Admin</small></span>
          <i class="bi bi-chevron-down"></i>
        </button>
      </div>
    </header>
  `;
}

