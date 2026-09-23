import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './style.css';

import {
  account
} from './lib/appwrite.js';

import {
  createMemberRecord,
  listAdminLedger,
  listAuditEvents,
  listDevelopmentLedger,
  listMemberRecords,
  loadDashboardData,
} from './services/liveData.js';

import {
  AppShell
} from './components/layout/AppShell.js';

import {
  MemberTable
} from './components/members/MemberTable.js';

import {
  pageMeta
} from './data/appData.js';

import {
  Dashboard
} from './pages/Dashboard.js';

import {
  Members
} from './pages/Members.js';

import {
  NewMember
} from './pages/NewMember.js';

import {
  AdminLedger,
  DevelopmentLedger,
  LedgerView,
} from './pages/Ledger.js';

import {
  Audit
} from './pages/Audit.js';

import {
  Login
} from './pages/Login.js';

import {
  showToast
} from './components/common/Toast.js';

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
  'admin-ledger': 'Admin Finance Tracking',
  'development-ledger': 'Development Finance Tracking',
  audit: 'Audit & Controls',
};

let currentUser = null;
let sessionChecked = false;

function getRoute() {
  const current =
    location.hash.replace(/^#\/?/, '') ||
    'dashboard';

  return routes[current]
    ? current
    : 'dashboard';
}

async function resolveSession() {
  if (sessionChecked) {
    return currentUser;
  }

  try {
    currentUser =
      await account.get();
  } catch {
    currentUser = null;
  }

  sessionChecked = true;

  return currentUser;
}

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
      button.setAttribute(
        'aria-expanded',
        'false'
      );
    });
}

function togglePopover(name) {
  const popover =
    document.querySelector(
      `[data-popover="${name}"]`
    );

  if (!popover) {
    return;
  }

  const alreadyOpen =
    popover.classList.contains('open');

  closePopovers();

  if (!alreadyOpen) {
    popover.classList.add('open');

    document
      .querySelector(
        `[data-action="${name}"]`
      )
      ?.setAttribute(
        'aria-expanded',
        'true'
      );
  }
}

function syncProfile(user) {
  if (!user) {
    return;
  }

  const name =
    user.name?.trim() ||
    user.email?.split('@')[0] ||
    'Administrator';

  const profileName =
    document.querySelector(
      '.profile-copy strong'
    );

  const profileEmail =
    document.querySelector(
      '.profile-copy small'
    );

  const profileAvatar =
    document.querySelector(
      '.profile-avatar'
    );

  const popoverTitle =
    document.querySelector(
      '[data-popover="profile"] > strong'
    );

  if (profileName) {
    profileName.textContent = name;
  }

  if (profileEmail) {
    profileEmail.textContent =
      user.email ||
      'Admin Control Account';
  }

  if (profileAvatar) {
    profileAvatar.textContent =
      name.charAt(0).toUpperCase();
  }

  if (popoverTitle) {
    popoverTitle.textContent = name;
  }
}

function updateMeta(key) {
  const [title, subtitle] =
    pageMeta[key] ||
    pageMeta.dashboard;

  const titleElement =
    document.querySelector(
      '#pageTitle'
    );

  const subtitleElement =
    document.querySelector(
      '#pageSubtitle'
    );

  const crumbElement =
    document.querySelector(
      '#pageCrumb'
    );

  const headerTitle =
    document.querySelector(
      '.header-title'
    );

  if (titleElement) {
    titleElement.textContent = title;
  }

  if (subtitleElement) {
    subtitleElement.textContent =
      subtitle;
  }

  if (crumbElement) {
    crumbElement.textContent = title;
  }

  if (headerTitle) {
    headerTitle.textContent =
      headerTitles[key] ||
      title;
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

function showLoginError(message) {
  const error =
    document.querySelector(
      '#loginError'
    );

  if (!error) {
    return;
  }

  error.textContent = message;
  error.hidden = false;
}

function wireLogin() {
  const form =
    document.querySelector(
      '#loginForm'
    );

  if (!form) {
    return;
  }

  form.addEventListener(
    'submit',
    async event => {
      event.preventDefault();

      const email =
        document
          .querySelector(
            '#loginEmail'
          )
          ?.value.trim();

      const password =
        document
          .querySelector(
            '#loginPassword'
          )
          ?.value;

      const button =
        document.querySelector(
          '#loginButton'
        );

      if (!email || !password) {
        showLoginError(
          'Enter your administrator email and password.'
        );

        return;
      }

      const error =
        document.querySelector(
          '#loginError'
        );

      if (error) {
        error.hidden = true;
        error.textContent = '';
      }

      if (button) {
        button.disabled = true;

        const span =
          button.querySelector('span');

        if (span) {
          span.textContent =
            'Signing in...';
        }
      }

      try {
        await account
          .createEmailPasswordSession({
            email,
            password,
          });

        currentUser =
          await account.get();

        sessionChecked = true;

        location.hash =
          '#/dashboard';

        await render();
      } catch (error) {
        showLoginError(
          error?.message ||
          'Sign-in failed.'
        );

        if (button) {
          button.disabled = false;

          const span =
            button.querySelector('span');

          if (span) {
            span.textContent =
              'Sign in securely';
          }
        }
      }
    }
  );
}

async function signOut() {
  try {
    await account.deleteSession({
      sessionId: 'current',
    });
  } catch {
    // Return the UI to its protected state even if the remote
    // session was already invalid.
  }

  currentUser = null;
  sessionChecked = true;

  document.body.innerHTML =
    Login();

  wireLogin();
}

function wireMemberSearch() {
  const search =
    document.querySelector(
      '#memberSearch'
    );

  if (!search) {
    return;
  }

  search.addEventListener(
    'input',
    event => {
      const query =
        event.target.value
          .trim()
          .toLowerCase();

      document
        .querySelectorAll(
          '#memberRows tr'
        )
        .forEach(row => {
          row.hidden =
            query.length > 0 &&
            !row.innerText
              .toLowerCase()
              .includes(query);
        });
    }
  );
}

async function loadMembers() {
  const page =
    document.querySelector('#page');

  if (!page) {
    return;
  }

  try {
    const members =
      await listMemberRecords();

    page.innerHTML =
      MemberTable({
        members,
      });

    wireMemberSearch();
  } catch (error) {
    page.innerHTML =
      MemberTable({
        error:
          error?.message ||
          'Could not load member records from Appwrite.',
      });
  }
}

function setMemberFormError(message) {
  const error =
    document.querySelector(
      '#memberFormError'
    );

  if (!error) {
    return;
  }

  error.textContent = message;
  error.hidden = false;
}

function clearMemberFormError() {
  const error =
    document.querySelector(
      '#memberFormError'
    );

  if (!error) {
    return;
  }

  error.textContent = '';
  error.hidden = true;
}

function wirePhotoUploads() {
  document
    .querySelectorAll(
      '#memberForm .upload-tile input[type="file"]'
    )
    .forEach(input => {
      input.addEventListener(
        'change',
        () => {
          const tile =
            input.closest(
              '.upload-tile'
            );

          const caption =
            tile?.querySelector(
              'small'
            );

          if (!tile || !caption) {
            return;
          }

          if (input.files?.length) {
            tile.classList.add(
              'has-file'
            );

            caption.textContent =
              input.files[0].name;
          } else {
            tile.classList.remove(
              'has-file'
            );

            caption.textContent =
              'Optional';
          }
        }
      );
    });
}

function wireMemberForm() {
  const form =
    document.querySelector(
      '#memberForm'
    );

  if (!form) {
    return;
  }

  wirePhotoUploads();

  form.addEventListener(
    'reset',
    () => {
      setTimeout(() => {
        clearMemberFormError();

        form
          .querySelectorAll(
            '.upload-tile'
          )
          .forEach(tile => {
            tile.classList.remove(
              'has-file'
            );

            const caption =
              tile.querySelector(
                'small'
              );

            if (caption) {
              caption.textContent =
                'Optional';
            }
          });
      }, 0);
    }
  );

  form.addEventListener(
    'submit',
    async event => {
      event.preventDefault();

      clearMemberFormError();

      if (!form.reportValidity()) {
        return;
      }

      const button =
        document.querySelector(
          '#saveMemberButton'
        );

      if (button) {
        button.disabled = true;
        button.innerHTML =
          '<span class="spinner-border spinner-border-sm"></span> Saving...';
      }

      try {
        const member =
          await createMemberRecord({
            form,
            user: currentUser,
          });

        showToast(
          `Member ${member.memberCode} saved to Appwrite.`
        );

        location.hash =
          '#/members';
      } catch (error) {
        let message =
          error?.message ||
          'Could not save the member record.';

        if (
          Number(error?.code) === 409
        ) {
          message =
            'A member with that National ID, stand number or member code already exists.';
        }

        setMemberFormError(
          message
        );

        if (button) {
          button.disabled = false;
          button.innerHTML =
            'Save Real Member Record <i class="bi bi-arrow-right ms-1"></i>';
        }
      }
    }
  );
}

async function loadDashboard() {
  const page =
    document.querySelector('#page');

  if (!page) {
    return;
  }

  try {
    const data =
      await loadDashboardData();

    page.innerHTML =
      Dashboard({
        data,
      });
  } catch (error) {
    page.innerHTML =
      Dashboard({
        error:
          error?.message ||
          'Could not load live dashboard data.',
      });
  }
}

async function loadLedger(kind) {
  const page =
    document.querySelector('#page');

  if (!page) {
    return;
  }

  try {
    const rows =
      kind === 'development'
        ? await listDevelopmentLedger()
        : await listAdminLedger();

    page.innerHTML =
      LedgerView({
        kind,
        rows,
      });
  } catch (error) {
    page.innerHTML =
      LedgerView({
        kind,
        error:
          error?.message ||
          'Could not load live finance records.',
      });
  }
}

async function loadAudit() {
  const page =
    document.querySelector('#page');

  if (!page) {
    return;
  }

  try {
    const events =
      await listAuditEvents();

    page.innerHTML =
      Audit({
        events,
      });
  } catch (error) {
    page.innerHTML =
      Audit({
        error:
          error?.message ||
          'Could not load audit data.',
      });
  }
}

function exportTable(button) {
  const card =
    button.closest(
      '.surface-card'
    );

  const table =
    card?.querySelector(
      'table'
    );

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
        type:
          'text/csv;charset=utf-8;',
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

  document.body
    .appendChild(link);

  link.click();
  link.remove();

  URL.revokeObjectURL(url);

  showToast(
    'Real finance tracking table exported.'
  );
}

async function wirePage(key) {
  if (key === 'dashboard') {
    await loadDashboard();
  }

  if (key === 'members') {
    await loadMembers();
  }

  if (key === 'new-member') {
    wireMemberForm();
  }

  if (key === 'admin-ledger') {
    await loadLedger('admin');
  }

  if (key === 'development-ledger') {
    await loadLedger(
      'development'
    );
  }

  if (key === 'audit') {
    await loadAudit();
  }
}

async function render() {
  const user =
    await resolveSession();

  if (!user) {
    document.body.innerHTML =
      Login();

    wireLogin();

    return;
  }

  if (
    !document.querySelector(
      '.app-shell'
    )
  ) {
    document.body.innerHTML =
      AppShell();
  }

  syncProfile(user);

  const key =
    getRoute();

  const page =
    document.querySelector(
      '#page'
    );

  if (!page) {
    return;
  }

  page.innerHTML =
    routes[key]();

  updateMeta(key);
  closePopovers();

  await wirePage(key);
}

document.addEventListener(
  'click',
  async event => {
    const language =
      event.target.closest(
        '[data-action="language"]'
      );

    if (language) {
      event.preventDefault();
      event.stopPropagation();

      togglePopover(
        'language'
      );

      return;
    }

    const notifications =
      event.target.closest(
        '[data-action="notifications"]'
      );

    if (notifications) {
      event.preventDefault();
      event.stopPropagation();

      togglePopover(
        'notifications'
      );

      return;
    }

    const profile =
      event.target.closest(
        '[data-action="profile"]'
      );

    if (profile) {
      event.preventDefault();
      event.stopPropagation();

      togglePopover(
        'profile'
      );

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
        control?.querySelector(
          'span'
        );

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

      exportTable(
        exportButton
      );

      return;
    }

    if (
      !event.target.closest(
        '[data-popover]'
      )
    ) {
      closePopovers();
    }
  }
);

document.addEventListener(
  'click',
  event => {
    const link =
      event.target.closest(
        'a[href^="#/"]'
      );

    if (!link) {
      return;
    }

    closePopovers();
  }
);

document.addEventListener(
  'keydown',
  event => {
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

    if (!query) {
      return;
    }

    location.hash =
      '#/members';

    const applySearch = () => {
      const search =
        document.querySelector(
          '#memberSearch'
        );

      if (!search) {
        setTimeout(
          applySearch,
          120
        );

        return;
      }

      search.value = query;

      search.dispatchEvent(
        new Event('input')
      );
    };

    setTimeout(
      applySearch,
      120
    );
  }
);

window.addEventListener(
  'hashchange',
  () => void render()
);

void render();