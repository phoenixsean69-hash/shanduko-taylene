import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './style.css';

import { AppShell } from './components/layout/AppShell.js';
import { pageMeta } from './data/appData.js';

import { Dashboard } from './pages/Dashboard.js';
import { Members } from './pages/Members.js';
import { NewMember } from './pages/NewMember.js';
import { Transactions } from './pages/Transactions.js';

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
  transactions: Transactions,
  'admin-ledger': AdminLedger,
  'development-ledger': DevelopmentLedger,
  audit: Audit,
};

function getRoute() {
  const current =
    location.hash.replace(/^#\/?/, '') || 'dashboard';

  return routes[current] ? current : 'dashboard';
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
      key === 'dashboard'
        ? 'Dashboard'
        : title;
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
   MEMBER SEARCH
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
      'Member record validated and ready for registry storage.'
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
   TRANSACTIONS
   ============================================================ */

function wireTransactions() {

  const form =
    document.querySelector('#transactionForm');

  if (form) {

    form.addEventListener('submit', event => {

      event.preventDefault();

      const required =
        [...form.querySelectorAll('[required]')];

      const invalid =
        required.find(field =>
          !field.value.trim()
        );

      if (invalid) {

        invalid.focus();

        showToast(
          'Complete the transaction fields before committing.'
        );

        return;
      }

      const selected =
        document.querySelector(
          'input[name="ledger"]:checked'
        );

      const ledgerName =
        selected?.value === 'admin'
          ? 'Admin Fees'
          : 'Development Fees';

      showToast(
        `Transaction committed to ${ledgerName} Sub-Ledger.`
      );

    });

  }

  document
    .querySelectorAll('.account-option')
    .forEach(option => {

      option.addEventListener('click', () => {

        document
          .querySelectorAll('.account-option')
          .forEach(item =>
            item.classList.remove('selected')
          );

        option.classList.add('selected');

        const radio =
          option.querySelector(
            'input[type="radio"]'
          );

        if (radio) {
          radio.checked = true;
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

function wirePage(key) {

  if (key === 'members') {
    wireMemberSearch();
  }

  if (key === 'new-member') {
    wireMemberForm();
    wirePhotoUploads();
  }

  if (key === 'transactions') {
    wireTransactions();
  }
}

/* ============================================================
   ROUTER
   ============================================================ */

function render() {

  const key = getRoute();

  const page =
    document.querySelector('#page');

  if (!page) return;

  page.innerHTML =
    routes[key]();

  updateMeta(key);

  closePopovers();

  wirePage(key);
}

/* ============================================================
   GLOBAL CLICK HANDLER
   ============================================================ */

document.addEventListener('click', event => {

  /* ---------------------------------------------
     LANGUAGE
     --------------------------------------------- */

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

  /* ---------------------------------------------
     NOTIFICATIONS
     --------------------------------------------- */

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

  /* ---------------------------------------------
     PROFILE
     --------------------------------------------- */

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

  /* ---------------------------------------------
     LANGUAGE OPTION
     --------------------------------------------- */

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

  /* ---------------------------------------------
     NOTIFICATION - TRANSACTIONS
     --------------------------------------------- */

  if (
    event.target.closest(
      '[data-action="notification-review"]'
    )
  ) {

    closePopovers();

    location.hash =
      '#/transactions';

    return;
  }

  /* ---------------------------------------------
     NOTIFICATION - MEMBER
     --------------------------------------------- */

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

  /* ---------------------------------------------
     PROFILE - AUDIT
     --------------------------------------------- */

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

  /* ---------------------------------------------
     PROFILE - SIGN OUT
     --------------------------------------------- */

  if (
    event.target.closest(
      '[data-action="profile-signout"]'
    )
  ) {

    closePopovers();

    showToast(
      'Authentication is not connected yet.'
    );

    return;
  }

  /* ---------------------------------------------
     EXPORT
     --------------------------------------------- */

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

  /* ---------------------------------------------
     CLOSE POPOVERS
     --------------------------------------------- */

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

  }, 0);

});

/* ============================================================
   START APPLICATION
   ============================================================ */

document.body.innerHTML =
  AppShell();

window.addEventListener(
  'hashchange',
  render
);

render();
