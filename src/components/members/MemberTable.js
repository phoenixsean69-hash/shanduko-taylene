import { members, money } from '../../data/appData.js';

export function MemberTable() {
  const rows = members.map(m => `
    <tr>
      <td><code>${m.id}</code></td>
      <td><strong>${m.name}</strong><div class="table-subtext">${m.stand}</div></td>
      <td>${m.spouse}</td>
      <td>${money(m.balance)}</td>
      <td><span class="badge rounded-pill ${m.status === 'Active' ? 'text-bg-success' : 'text-bg-warning'}">${m.status}</span></td>
      <td><button class="btn btn-sm btn-outline-secondary" data-member="${m.id}" aria-label="View ${m.name}"><i class="bi bi-eye"></i></button></td>
    </tr>
  `).join('');

  return `
    <section class="card shanduko-card">
      <header class="card-header">
        <h3 class="card-title">Cooperative Member Registry</h3>
        <div class="card-tools d-flex gap-2">
          <div class="input-group input-group-sm member-search">
            <span class="input-group-text"><i class="bi bi-search"></i></span>
            <input id="memberSearch" class="form-control" placeholder="Search members..." />
          </div>
          <a href="#/new-member" class="btn btn-primary btn-sm"><i class="bi bi-plus-lg me-1"></i>New Member</a>
        </div>
      </header>
      <div class="card-body p-0 table-responsive">
        <table class="table table-hover align-middle mb-0 shanduko-table">
          <thead><tr><th>Member ID</th><th>Primary member</th><th>Spouse</th><th>Recorded balance</th><th>Status</th><th></th></tr></thead>
          <tbody id="memberRows">${rows}</tbody>
        </table>
      </div>
    </section>
  `;
}
