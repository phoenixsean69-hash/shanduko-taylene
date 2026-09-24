export function Login() {
  return `
    <main class="auth-page">
      <section class="auth-card">

        <div class="auth-brand">
          <span class="auth-brand-mark">
            <img
              src="/shanduko.png"
              alt=""
              aria-hidden="true"
            >
          </span>

          <div>
            <strong>SHANDUKO</strong>
            <small>Housing Cooperative</small>
          </div>
        </div>

        <div class="auth-copy">
          <span class="eyebrow">ADMINISTRATION SYSTEM</span>
          <h1>Sign in</h1>
          <p>
            Use an authorized Shanduko administrator account to access
            the cooperative registry.
          </p>
        </div>

        <form id="loginForm" class="auth-form">

          <label>
            <span>Email address</span>
            <input
              id="loginEmail"
              type="email"
              autocomplete="username"
              required
            >
          </label>

          <label>
            <span>Password</span>
            <input
              id="loginPassword"
              type="password"
              autocomplete="current-password"
              required
            >
          </label>

          <div
            id="loginError"
            class="auth-error"
            role="alert"
            hidden
          ></div>

          <button
            id="loginButton"
            class="primary-button auth-submit"
            type="submit"
          >
            <span>Sign in securely</span>
            <i class="bi bi-arrow-right"></i>
          </button>

        </form>

        <div class="auth-security">
          <i class="bi bi-shield-lock"></i>
          <span>
            Member identity data is restricted to authenticated
            Shanduko administrators.
          </span>
        </div>

      </section>
    </main>
  `;
}