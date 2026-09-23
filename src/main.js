import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './style.css';

import { account } from './lib/appwrite.js';
import { listMembershipRegister } from './services/membershipRegister.js';

import { AppShell } from './components/layout/AppShell.js';
import { MemberTable } from './components/members/MemberTable.js';
import { pageMeta } from './data/appData.js';

import { Dashboard } from './pages/Dashboard.js';
import { Members } from './pages/Members.js';
import { NewMember } from './pages/NewMember.js';
import { Login } from './pages/Login.js';

import {
  AdminLedger,
  DevelopmentLedger
} from './pages/Ledger.js';

import { Audit } from './pages/Audit.js';
import { showToast } from './components/common/Toast.js';

const routes = {
  dashboard: Dashboard,
  members: Members,
  'new-member': NewMember,
  'admin-ledger': AdminLedger,
  'development-ledger': DevelopmentLedger,
  audit: Audit,
};

const headerTitles = {
  dashboard: 'Dashboard',
  members: 'Member Registry',
  'new-member': 'Add Member',
  'admin-ledger': 'Admin Fees Ledger',
  'development-ledger': 'Development Ledger',
  audit: 'Audit & Controls',
};

let currentUser = null;
let sessionChecked = false;

function getRoute() {
  const current =
    location.hash.replace(/^#\/?/, '') || 'dashboard';

  return routes[current] ? current : 'dashboard';
}

async function resolveSession() {
  if (sessionChecked) {
    return currentUser;
  }

  try {
    currentUser = await account.get();
  } catch {
    currentUser = null;
  }

  sessionChecked = true;

  return currentUser;
}

/* ============================================================
   HEADER POPOVERS
   ============================================================ */

function closePopovers() {
  document
    .querySelectorAll('[data-popover]')
    .forEach(popover => {
      popover.classList.remove('open');
    });

  document
    .querySelectorAll(
      '[data-action="language"], ' +
      '[data-action="notifications"], ' +
      '[data-action="profile"]'
    )
    .forEach(button => {
      button.setAttribute('aria-expanded', 'false');
    });
}

function togglePopover(name) {
  const popover =
    document.querySelector(
      `[data-popover="${name}"]`
    );

  if (!popover) return;

  const alreadyOpen =
    popover.classList.contains('open');

  closePopovers();

  if (!alreadyOpen) {
    popover.classList.add('open');

    document
      .querySelector(`[data-action="${name}"]`)
      ?.setAttribute('aria-expanded', 'true');
  }
}

function syncProfile(user) {
  if (!user) return;

  const name =
    user.name?.trim() ||
    user.email?.split('@')[0] ||
    'Administrator';

  const profileName =
    document.querySelector('.profile-copy strong');

  const profileEmail =
    document.querySelector('.profile-copy small');

  const profileAvatar =
    document.querySelector('.profile-avatar');

  const popoverTitle =
    document.querySelector(
      '[data-popover="profile"] > strong'
    );

  if (profileName) {
    profileName.textContent = name;
  }

  if (profileEmail) {
    profileEmail.textContent = user.email || 'Admin Control Account';
  }

  if (profileAvatar) {
    profileAvatar.textContent =
      name.charAt(0).toUpperCase();
  }

  if (popoverTitle) {
    popoverTitle.textContent = name;
  }
}

/* ============================================================
   PAGE META
   ============================================================ */

function updateMeta(key) {
  const [title, subtitle] =
    pageMeta[key] || pageMeta.dashboard;

  const titleElement =
    document.querySelector('#pageTitle');

  const subtitleElement =
    document.querySelector('#pageSubtitle');

  const crumbElement =
    document.querySelector('#pageCrumb');

  const headerTitle =
    document.querySelector('.header-title');

  if (titleElement)
    titleElement.textContent = title;

  if (subtitleElement)
    subtitleElement.textContent = subtitle;

  if (crumbElement)
    crumbElement.textContent = title;

  if (headerTitle) {
    headerTitle.textContent =
      headerTitles[key] || title;
  }

  document
    .querySelectorAll('.nav-item')
    .forEach(item => {
      item.classList.toggle(
        'active',
        item.dataset.page === key
      );
    });
}

/* ============================================================
   AUTH
   ============================================================ */

function showLoginError(message) {
  const error =
    document.querySelector('#loginError');

  if (!error) return;

  error.textContent = message;
  error.hidden = false;
}

function wireLogin() {
  const form =
    document.querySelector('#loginForm');

  if (!form) return;

  form.addEventListener('submit', async event => {
    event.preventDefault();

    const email =
      document.querySelector('#loginEmail')
        ?.value.trim();

    const password =
      document.querySelector('#loginPassword')
        ?.value;

    const button =
      document.querySelector('#loginButton');

    if (!email || !password) {
      showLoginError(
        'Enter your administrator email and password.'
      );
      return;
    }

    const error =
      document.querySelector('#loginError');

    if (error) {
      error.hidden = true;
      error.textContent = '';
    }

    if (button) {
      button.disabled = true;
      button.querySelector('span').textContent =
        'Signing in...';
    }

    try {
      await account.createEmailPasswordSession({
        email,
        password,
      });

      currentUser = await account.get();
      sessionChecked = true;

      location.hash = '#/members';

      await render();
    } catch (error) {
      showLoginError(
        error?.message ||
        'Sign-in failed. Check your account details.'
      );

      if (button) {
        button.disabled = false;
        button.querySelector('span').textContent =
          'Sign in securely';
      }
    }
  });
}

async function signOut() {
  try {
    await account.deleteSession({
      sessionId: 'current',
    });
  } catch {
    // The local UI must still return to the protected login state.
  }

  currentUser = null;
  sessionChecked = true;

  document.body.innerHTML = Login();
  wireLogin();
}

/* ============================================================
   MEMBER REGISTRY
   ============================================================ */

function wireMemberSearch() {
  const search =
    document.querySelector('#memberSearch');

  if (!search) return;

  search.addEventListener('input', event => {
    const query =
      event.target.value
        .trim()
        .toLowerCase();

    document
      .querySelectorAll('#memberRows tr')
      .forEach(row => {
        row.hidden =
          query.length > 0 &&
          !row.innerText
            .toLowerCase()
            .includes(query);
      });
  });
}

async function loadMemberRegistry() {
  const page =
    document.querySelector('#page');

  if (!page) return;

  try {
    const members =
      await listMembershipRegister();

    page.innerHTML =
      MemberTable({ members });

    wireMemberSearch();
  } catch (error) {
    const status =
      Number(error?.code || 0);

    const message =
      status === 401 || status === 403
        ? 'Your account does not have permission to read the cooperative register.'
        : error?.message ||
          'Could not load the cooperative register from Appwrite.';

    page.innerHTML =
      MemberTable({ error: message });
  }
}

/* ============================================================
   MEMBER FORM
   ============================================================ */

function wireMemberForm() {
  const form =
    document.querySelector('#memberForm');

  if (!form) return;

  form.addEventListener('submit', event => {
    event.preventDefault();

    const requiredFields =
      [...form.querySelectorAll('[required]')];

    const invalid =
      requiredFields.find(field =>
        !field.value.trim()
      );

    if (invalid) {
      invalid.focus();

      showToast(
        'Please complete all required member fields.'
      );

      return;
    }

    showToast(
      'Member record validated. Backend creation will be connected in the next phase.'
    );
  });
}

/* ============================================================
   PHOTO UPLOADS
   ============================================================ */

function wirePhotoUploads() {
  document
    .querySelectorAll(
      '#memberForm .upload-tile input[type="file"]'
    )
    .forEach(input => {
      input.addEventListener('change', () => {
        const tile =
          input.closest('.upload-tile');

        const caption =
          tile?.querySelector('small');

        if (!tile || !caption) return;

        if (input.files?.length) {
          tile.classList.add('has-file');

          caption.textContent =
            input.files[0].name;

          showToast(
            'Photo selected for the member record.'
          );
        }
      });
    });
}

/* ============================================================
   EXPORT TABLE
   ============================================================ */

function exportTable(button) {
  const card =
    button.closest('.surface-card');

  const table =
    card?.querySelector('table');

  if (!table) {
    showToast(
      'No table is available for export.'
    );

    return;
  }

  const rows =
    [...table.querySelectorAll('tr')];

  const csv =
    rows.map(row => {
      return [...row.children]
        .map(cell => {
          const value =
            cell.innerText
              .replace(/\s+/g, ' ')
              .trim()
              .replace(/"/g, '""');

          return `"${value}"`;
        })
        .join(',');
    }).join('\n');

  const blob =
    new Blob(
      [csv],
      {
        type: 'text/csv;charset=utf-8;'
      }
    );

  const url =
    URL.createObjectURL(blob);

  const link =
    document.createElement('a');

  link.href = url;

  link.download =
    `${getRoute()}-${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;

  document.body.appendChild(link);

  link.click();

  link.remove();

  URL.revokeObjectURL(url);

  showToast(
    'Ledger exported successfully.'
  );
}

/* ============================================================
   PAGE WIRING
   ============================================================ */

async function wirePage(key) {
  if (key === 'members') {
    await loadMemberRegistry();
  }

  if (key === 'new-member') {
    wireMemberForm();
    wirePhotoUploads();
  }
}

/* ============================================================
   ROUTER
   ============================================================ */

async function render() {
  const user =
    await resolveSession();

  if (!user) {
    document.body.innerHTML = Login();
    wireLogin();
    return;
  }

  if (!document.querySelector('.app-shell')) {
    document.body.innerHTML =
      AppShell();
  }

  syncProfile(user);

  const key = getRoute();

  const page =
    document.querySelector('#page');

  if (!page) return;

  page.innerHTML =
    routes[key]();

  updateMeta(key);

  closePopovers();

  await wirePage(key);
}

/* ============================================================
   GLOBAL CLICK HANDLER
   ============================================================ */

document.addEventListener('click', async event => {
  const language =
    event.target.closest(
      '[data-action="language"]'
    );

  if (language) {
    event.preventDefault();
    event.stopPropagation();
    togglePopover('language');
    return;
  }

  const notifications =
    event.target.closest(
      '[data-action="notifications"]'
    );

  if (notifications) {
    event.preventDefault();
    event.stopPropagation();
    togglePopover('notifications');
    return;
  }

  const profile =
    event.target.closest(
      '[data-action="profile"]'
    );

  if (profile) {
    event.preventDefault();
    event.stopPropagation();
    togglePopover('profile');
    return;
  }

  const languageOption =
    event.target.closest(
      '[data-language]'
    );

  if (languageOption) {
    const value =
      languageOption.dataset.language;

    const control =
      document.querySelector(
        '[data-action="language"]'
      );

    const text =
      control?.querySelector('span');

    if (text) {
      text.textContent =
        value === 'sn'
          ? 'Shona'
          : 'Eng (US)';
    }

    closePopovers();

    showToast(
      value === 'sn'
        ? 'Language set to Shona.'
        : 'Language set to English (US).'
    );

    return;
  }

  if (
    event.target.closest(
      '[data-action="notification-review"]'
    )
  ) {
    closePopovers();
    location.hash =
      '#/admin-ledger';
    return;
  }

  if (
    event.target.closest(
      '[data-action="notification-member"]'
    )
  ) {
    closePopovers();
    location.hash =
      '#/new-member';
    return;
  }

  if (
    event.target.closest(
      '[data-action="profile-audit"]'
    )
  ) {
    closePopovers();
    location.hash =
      '#/audit';
    return;
  }

  if (
    event.target.closest(
      '[data-action="profile-signout"]'
    )
  ) {
    closePopovers();
    await signOut();
    return;
  }

  const exportButton =
    event.target.closest(
      '.ledger-view .secondary-button'
    );

  if (
    exportButton &&
    exportButton.innerText
      .toLowerCase()
      .includes('export')
  ) {
    event.preventDefault();
    exportTable(exportButton);
    return;
  }

  if (
    !event.target.closest(
      '[data-popover]'
    )
  ) {
    closePopovers();
  }
});

/* ============================================================
   GLOBAL ROUTE LINKS
   ============================================================ */

document.addEventListener('click', event => {
  const link =
    event.target.closest(
      'a[href^="#/"]'
    );

  if (!link) return;

  closePopovers();
});

/* ============================================================
   GLOBAL SEARCH
   ============================================================ */

document.addEventListener('keydown', event => {
  const input =
    event.target;

  if (
    input?.id !== 'globalSearch' ||
    event.key !== 'Enter'
  ) {
    return;
  }

  const query =
    input.value.trim();

  if (!query) return;

  location.hash =
    '#/members';

  setTimeout(() => {
    const search =
      document.querySelector(
        '#memberSearch'
      );

    if (!search) return;

    search.value =
      query;

    search.dispatchEvent(
      new Event('input')
    );
  }, 300);
});

/* ============================================================
   START APPLICATION
   ============================================================ */

window.addEventListener(
  'hashchange',
  () => void render()
);

void render();