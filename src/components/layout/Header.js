export function Header() {
  return `
    <header class="app-header">

      <div class="header-title">
        Dashboard
      </div>

      <label class="header-search">
        <i class="bi bi-search"></i>

        <input
          id="globalSearch"
          placeholder="Search real member records..."
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
          aria-label="Quick actions"
          aria-expanded="false"
        >
          <i class="bi bi-bell"></i>
        </button>

        <button
          type="button"
          class="profile-control"
          data-action="profile"
          aria-expanded="false"
        >
          <span class="profile-avatar">
            A
          </span>

          <span class="profile-copy">
            <strong>Administrator</strong>
            <small>Authenticated account</small>
          </span>

          <i class="bi bi-chevron-down"></i>
        </button>

      </div>

      <div
        class="header-popover language-popover"
        data-popover="language"
      >
        <strong>Language</strong>

        <button
          type="button"
          data-language="en"
        >
          <i class="bi bi-translate"></i>
          <span>English (US)</span>
        </button>

        <button
          type="button"
          data-language="sn"
        >
          <i class="bi bi-chat-square-text"></i>
          <span>Shona</span>
        </button>
      </div>

      <div
        class="header-popover notification-popover"
        data-popover="notifications"
      >
        <strong>Quick actions</strong>

        <button
          type="button"
          data-action="notification-review"
        >
          <i class="bi bi-wallet2"></i>
          <span>Open finance tracking</span>
        </button>

        <button
          type="button"
          data-action="notification-member"
        >
          <i class="bi bi-person-plus"></i>
          <span>Add a member record</span>
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