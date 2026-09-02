import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './style.css';

import { AppShell } from './components/layout/AppShell.js';
import { Dashboard } from './pages/Dashboard.js';
import { Members } from './pages/Members.js';
import { NewMember } from './pages/NewMember.js';
import { Transactions } from './pages/Transactions.js';
import { AdminLedger, DevelopmentLedger } from './pages/Ledger.js';
import { Audit } from './pages/Audit.js';
import { showToast } from './components/common/Toast.js';

const routes = {
  dashboard: Dashboard,
  members: Members,
  "new-member": NewMember,
  transactions: Transactions,
  "admin-ledger": AdminLedger,
  "development-ledger": DevelopmentLedger,
  audit: Audit,
};

function route() {
  const key = location.hash.replace(/^#\/?/, '') || 'dashboard';
  return routes[key] || routes.dashboard;
}
function activeNav() {
  const key = location.hash.replace(/^#\/?/, '') || 'dashboard';
  document.querySelectorAll('.figma-nav-item').forEach(a => a.classList.toggle('active', a.dataset.page === key));
}
function wire() {
  activeNav();
  document.querySelector('#globalSearch')?.addEventListener('keydown', e => {
    if(e.key !== 'Enter') return;
    const q=e.target.value.trim();
    if(q){ location.hash='#/members'; setTimeout(()=>{const i=document.querySelector('#memberSearch'); if(i){i.value=q;i.dispatchEvent(new Event('input'))}},0); }
  });
  document.querySelector('#memberSearch')?.addEventListener('input', e => {
    const q=e.target.value.toLowerCase();
    document.querySelectorAll('#memberRows tr').forEach(r=>r.hidden=!r.innerText.toLowerCase().includes(q));
  });
  document.querySelector('#memberForm')?.addEventListener('submit', e => {e.preventDefault();showToast('Member record validated and ready to save.','success')});
  document.querySelector('#transactionForm')?.addEventListener('submit', e => {e.preventDefault();showToast('Transaction committed successfully.','success')});
}
function render(){document.querySelector('#page').innerHTML=route()();wire()}
document.body.innerHTML=AppShell();
window.addEventListener('hashchange',render);
render();
