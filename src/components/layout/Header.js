export function Header() {
  return `
    <header class="app-header">

      <div class="header-title">Dashboard</div>

      <label class="header-search">
        <i class="bi bi-search"></i>
        <input
          id="globalSearch"
          placeholder="Search members, stands or receipts..."
          aria-label="Search"
        >
      </label>

      <div class="header-actions">

        <button
          type="button"
          class="header-control"
          data-action="language"
          aria-expanded="false"
        >
          <i class="bi bi-globe2"></i>
          <span>Eng (US)</span>
          <i class="bi bi-chevron-down"></i>
        </button>

        <button
          type="button"
          class="header-icon"
          data-action="notifications"
          aria-label="Notifications"
          aria-expanded="false"
        >
          <i class="bi bi-bell"></i>
          <span></span>
        </button>

        <button
          type="button"
          class="profile-control"
          data-action="profile"
          aria-expanded="false"
        >
          <span class="profile-avatar">A</span>

          <span class="profile-copy">
            <strong>Administrator</strong>
            <small>Admin Control Account</small>
          </span>

          <i class="bi bi-chevron-down"></i>
        </button>

      </div>

      <div
        class="header-popover language-popover"
        data-popover="language"
      >
        <strong>Language</strong>

        <button type="button" data-language="en">
          <i class="bi bi-translate"></i>
          <span>English (US)</span>
        </button>

        <button type="button" data-language="sn">
          <i class="bi bi-chat-square-text"></i>
          <span>Shona</span>
        </button>
      </div>

      <div
        class="header-popover notification-popover"
        data-popover="notifications"
      >
        <strong>Notifications</strong>

        <button
          type="button"
          data-action="notification-review"
        >
          <i class="bi bi-receipt"></i>
          <span>Finance records ready for review</span>
        </button>

        <button
          type="button"
          data-action="notification-member"
        >
          <i class="bi bi-person-plus"></i>
          <span>Add a new member record</span>
        </button>
      </div>

      <div
        class="header-popover profile-popover"
        data-popover="profile"
      >
        <strong>Administrator</strong>

        <button
          type="button"
          data-action="profile-audit"
        >
          <i class="bi bi-shield-check"></i>
          <span>Open Audit & Controls</span>
        </button>

        <button
          type="button"
          data-action="profile-signout"
        >
          <i class="bi bi-box-arrow-right"></i>
          <span>Sign out</span>
        </button>
      </div>

    </header>
  `;
}