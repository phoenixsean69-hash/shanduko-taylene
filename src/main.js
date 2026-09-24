import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './style.css';

import {
  account,
  APPWRITE
} from './lib/appwrite.js';

import {
  getMemberForEdit,
  getMemberRecord,
  listAdminLedger,
  listAuditEvents,
  listDevelopmentLedger,
  listMemberBeneficiaries,
  listMembersWithBeneficiaryCounts,
  loadDashboardData,
  MAX_BENEFICIARIES,
  saveMemberRecord
} from './services/liveData.js';



import {
  createBeneficiaryCard,
  MemberForm,
  } from './components/members/MemberForm.js';

import {
  MemberTable
} from './components/members/MemberTable.js';

import {
  MemberDetails
} from './components/members/MemberDetails.js';

import {
  deleteMemberRecord,
  getMemberReadModel,
  } from './services/memberCrud.js';





import {
  AppShell
} from './components/layout/AppShell.js';

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
  member: () =>
    MemberDetails({
      loading: true,
    }),
  'new-member': NewMember,
  'edit-member': () =>
    MemberForm({
      mode: 'edit',
      loading: true,
    }),
  'admin-ledger': AdminLedger,
  'development-ledger': DevelopmentLedger,
  audit: Audit,
};

const headerTitles = {
  dashboard: 'Dashboard',
  members: 'Member Registry',
  member: 'Member Record',
  'new-member': 'Add Member',
  'edit-member': 'Edit Member',
  'admin-ledger': 'Admin Finance Tracking',
  'development-ledger': 'Development Finance Tracking',
  audit: 'Audit & Controls',
};

let currentUser = null;
let sessionChecked = false;

function routeState() {
  const raw =
    location.hash
      .replace(/^#\/?/, '') ||
    'dashboard';

  const [
    routePart,
    queryPart = '',
  ] =
    raw.split('?');

  const key =
    routes[routePart]
      ? routePart
      : 'dashboard';

  return {
    key,

    params:
      new URLSearchParams(
        queryPart
      ),
  };
}

function getRoute() {
  return routeState().key;
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
    popoverTitle.textContent =
      name;
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
    titleElement.textContent =
      title;
  }

  if (subtitleElement) {
    subtitleElement.textContent =
      subtitle;
  }

  if (crumbElement) {
    crumbElement.textContent =
      title;
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
    // Session may already be invalid.
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
      await listMembersWithBeneficiaryCounts();

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
          'Could not load member records.',
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

function wireRelationshipControls(
  root = document
) {
  root
    .querySelectorAll(
      '[data-relationship-control]'
    )
    .forEach(control => {
      const select =
        control.querySelector(
          '[data-relationship-select]'
        );

      const manualWrap =
        control.querySelector(
          '[data-relationship-manual-wrap]'
        );

      const manual =
        control.querySelector(
          '[data-relationship-manual]'
        );

      if (
        !select ||
        !manualWrap ||
        select.dataset.relationshipWired === 'true'
      ) {
        return;
      }

      select.dataset.relationshipWired =
        'true';

      const sync = () => {
        const manualMode =
          select.value ===
          '__other__';

        manualWrap.classList.toggle(
          'd-none',
          !manualMode
        );

        if (manual) {
          manual.required =
            manualMode;

          if (manualMode) {
            manual.focus();
          }
        }
      };

      select.addEventListener(
        'change',
        sync
      );

      sync();
    });
}

function updateBeneficiarySummary() {
  const cards =
    [
      ...document.querySelectorAll(
        '[data-beneficiary-card]'
      ),
    ];

  const count =
    document.querySelector(
      '#beneficiaryCount'
    );

  const total =
    document.querySelector(
      '#beneficiaryAllocationTotal'
    );

  const warning =
    document.querySelector(
      '#beneficiaryAllocationWarning'
    );

  const empty =
    document.querySelector(
      '#beneficiaryEmptyState'
    );

  const addButton =
    document.querySelector(
      '#addBeneficiaryButton'
    );

  const saveButton =
    document.querySelector(
      '#saveMemberButton'
    );

  cards.forEach(
    (card, index) => {
      const title =
        card.querySelector(
          '.beneficiary-card-head strong'
        );

      if (title) {
        title.textContent =
          `Beneficiary ${index + 1}`;
      }
    }
  );

  const allocationInputs =
    cards.map(
      card =>
        card.querySelector(
          '[data-beneficiary-allocation]'
        )
    ).filter(Boolean);

  const allocation =
    allocationInputs.reduce(
      (sum, input) => {
        const value =
          Number(
            input.value || 0
          );

        return sum +
          (
            Number.isFinite(value)
              ? value
              : 0
          );
      },
      0
    );

  const allocationInvalid =
    allocation >
    100.000001;

  allocationInputs.forEach(
    input => {
      input.setCustomValidity(
        allocationInvalid
          ? 'Total beneficiary allocation cannot exceed 100%.'
          : ''
      );
    }
  );

  if (count) {
    count.textContent =
      String(cards.length);
  }

  if (total) {
    total.textContent =
      allocation.toFixed(0);

    total.classList.toggle(
      'text-danger',
      allocationInvalid
    );
  }

  if (warning) {
    warning.hidden =
      !allocationInvalid;
  }

  if (empty) {
    empty.classList.toggle(
      'd-none',
      cards.length > 0
    );
  }

  if (addButton) {
    addButton.disabled =
      cards.length >=
      MAX_BENEFICIARIES;
  }

  if (saveButton) {
    saveButton.disabled =
      allocationInvalid;
  }
}

function wireBeneficiaries() {
  const list =
    document.querySelector(
      '#beneficiaryList'
    );

  const addButton =
    document.querySelector(
      '#addBeneficiaryButton'
    );

  if (!list || !addButton) {
    return;
  }

  addButton.addEventListener(
    'click',
    () => {
      const cards =
        list.querySelectorAll(
          '[data-beneficiary-card]'
        );

      if (
        cards.length >=
        MAX_BENEFICIARIES
      ) {
        showToast(
          'A member can have a maximum of 5 beneficiaries.'
        );

        return;
      }

      list.insertAdjacentHTML(
        'beforeend',
        createBeneficiaryCard(
          cards.length
        )
      );

      wireRelationshipControls(
        list
      );

      wirePhotoUploads(
        list
      );

      updateBeneficiarySummary();
    }
  );

  list.addEventListener(
    'click',
    event => {
      const button =
        event.target.closest(
          '[data-remove-beneficiary]'
        );

      if (!button) {
        return;
      }

      button
        .closest(
          '[data-beneficiary-card]'
        )
        ?.remove();

      updateBeneficiarySummary();
    }
  );

  list.addEventListener(
    'input',
    event => {
      if (
        event.target.matches(
          '[data-beneficiary-allocation]'
        )
      ) {
        updateBeneficiarySummary();
      }
    }
  );

  list.addEventListener(
    'change',
    event => {
      if (
        event.target.matches(
          '[data-beneficiary-allocation]'
        )
      ) {
        updateBeneficiarySummary();
      }
    }
  );

  wireRelationshipControls(
    list
  );

  updateBeneficiarySummary();
}

function wirePhotoUploads(
  root = document
) {
  root
    .querySelectorAll(
      '#memberForm .upload-tile input[type="file"], ' +
      '[data-beneficiary-card] .upload-tile input[type="file"]'
    )
    .forEach(input => {
      if (
        input.dataset.photoWired ===
        'true'
      ) {
        return;
      }

      input.dataset.photoWired =
        'true';

      input.addEventListener(
        'change',
        () => {
          const tile =
            input.closest(
              '.upload-tile'
            );

          const preview =
            tile?.querySelector(
              '[data-image-preview]'
            );

          const caption =
            tile?.querySelector(
              '[data-file-caption]'
            );

          if (
            !tile ||
            !preview
          ) {
            return;
          }

          const previousObjectUrl =
            preview.dataset.objectUrl;

          if (previousObjectUrl) {
            URL.revokeObjectURL(
              previousObjectUrl
            );

            delete preview.dataset.objectUrl;
          }

          if (input.files?.length) {
            const file =
              input.files[0];

            const objectUrl =
              URL.createObjectURL(
                file
              );

            preview.dataset.objectUrl =
              objectUrl;

            preview.classList.add(
              'has-preview'
            );

            preview.innerHTML =
              `<img src="${objectUrl}" alt="Selected image preview">`;

            tile.classList.add(
              'has-file'
            );

            if (caption) {
              caption.textContent =
                file.name;
            }

            return;
          }

          const currentImage =
            preview.dataset.currentImage;

          if (currentImage) {
            preview.classList.add(
              'has-preview'
            );

            preview.innerHTML =
              `<img src="${currentImage}" alt="Current image">`;
          } else {
            preview.classList.remove(
              'has-preview'
            );

            preview.innerHTML =
              '<i class="bi bi-image"></i>';
          }

          tile.classList.remove(
            'has-file'
          );
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

  wireRelationshipControls(
    form
  );

  wirePhotoUploads(
    form
  );

  wireBeneficiaries();

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
        const memberId =
          form.dataset.formMode === 'edit'
            ? form.dataset.memberId
            : null;

        const member =
          await saveMemberRecord({
            form,
            user:
              currentUser,
            memberId,
          });

        showToast(
          memberId
            ? `Member ${member.memberCode} updated successfully.`
            : `Member ${member.memberCode} saved successfully.`
        );

        location.hash =
          '#/members';
      } catch (error) {
        let message =
          error?.message ||
          'Could not save the member record.';

        if (
          Number(error?.code) ===
          409
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
            form.dataset.formMode === 'edit'
              ? '<i class="bi bi-check2-circle"></i> Save Changes'
              : '<i class="bi bi-check2-circle"></i> Save Member Record';
        }
      }
    }
  );
}

function wireMemberReadPage(
  member
) {
  const dialog =
    document.querySelector(
      '#deleteMemberDialog'
    );

  const openButton =
    document.querySelector(
      '[data-delete-member]'
    );

  const cancelButton =
    document.querySelector(
      '[data-cancel-delete]'
    );

  const confirmButton =
    document.querySelector(
      '[data-confirm-delete]'
    );

  if (
    !dialog ||
    !openButton ||
    !confirmButton
  ) {
    return;
  }

  openButton.addEventListener(
    'click',
    () => {
      if (
        typeof dialog.showModal ===
        'function'
      ) {
        dialog.showModal();
      } else {
        dialog.setAttribute(
          'open',
          ''
        );
      }
    }
  );

  cancelButton?.addEventListener(
    'click',
    () => {
      if (
        typeof dialog.close ===
        'function'
      ) {
        dialog.close();
      } else {
        dialog.removeAttribute(
          'open'
        );
      }
    }
  );

  dialog.addEventListener(
    'click',
    event => {
      if (event.target === dialog) {
        if (
          typeof dialog.close ===
          'function'
        ) {
          dialog.close();
        }
      }
    }
  );

  confirmButton.addEventListener(
    'click',
    async () => {
      confirmButton.disabled = true;

      confirmButton.innerHTML =
        '<span class="spinner-border spinner-border-sm"></span> Deleting...';

      try {
        const deleted =
          await deleteMemberRecord({
            memberId:
              member.$id,

            user:
              currentUser,
          });

        if (
          typeof dialog.close ===
          'function'
        ) {
          dialog.close();
        }

        showToast(
          `Member ${deleted.memberCode} deleted successfully.`
        );

        location.hash =
          '#/members';
      } catch (error) {
        confirmButton.disabled =
          false;

        confirmButton.innerHTML =
          '<i class="bi bi-trash3"></i> Delete Record';

        if (
          typeof dialog.close ===
          'function'
        ) {
          dialog.close();
        }

        showToast(
          error?.message ||
          'Could not delete the member record.'
        );
      }
    }
  );
}

async function loadMemberReadPage() {
  const page =
    document.querySelector(
      '#page'
    );

  if (!page) {
    return;
  }

  const {
    params,
  } =
    routeState();

  const memberId =
    params.get('member');

  if (!memberId) {
    page.innerHTML =
      MemberDetails({
        error:
          'No member record was selected.',
      });

    return;
  }

  try {
    const {
      member,
      beneficiaries,
    } =
      await getMemberReadModel(
        memberId
      );

    page.innerHTML =
      MemberDetails({
        member,
        beneficiaries,
      });

    wireMemberReadPage(
      member
    );
  } catch (error) {
    page.innerHTML =
      MemberDetails({
        error:
          error?.message ||
          'Could not load the member record.',
      });
  }
}

async function loadEditMember() {
  const page =
    document.querySelector(
      '#page'
    );

  if (!page) {
    return;
  }

  const {
    params,
  } =
    routeState();

  const memberId =
    params.get('member');

  if (!memberId) {
    page.innerHTML =
      MemberForm({
        mode: 'edit',
        error:
          'No member record was selected.',
      });

    return;
  }

  try {
    const {
      member,
      beneficiaries,
    } =
      await getMemberForEdit(
        memberId
      );

    page.innerHTML =
      MemberForm({
        mode: 'edit',
        member,
        beneficiaries,
      });

    wireMemberForm();
  } catch (error) {
    page.innerHTML =
      MemberForm({
        mode: 'edit',
        error:
          error?.message ||
          'Could not load the member record.',
      });
  }
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
          'Could not load dashboard data.',
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
          'Could not load finance records.',
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
    'Finance tracking table exported.'
  );
}

async function wirePage(key) {
  if (key === 'dashboard') {
    await loadDashboard();
  }

  if (key === 'members') {
    await loadMembers();
  }

  if (key === 'member') {
    await loadMemberReadPage();
  }

  if (key === 'new-member') {
    wireMemberForm();
  }

  if (key === 'edit-member') {
    await loadEditMember();
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