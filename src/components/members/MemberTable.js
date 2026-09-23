import { members } from '../../data/appData.js';

export function MemberTable() {
  return `
    <section class="surface-card">

      <header class="surface-card-header">
        <div>
          <h2>Comprehensive Cooperative Member Registry</h2>
          <p>
            Primary member, spouse, stand, next of kin and beneficiary records
          </p>
        </div>

        <a
          href="#/new-member"
          class="primary-button"
          style="text-decoration:none"
        >
          <i class="bi bi-person-plus"></i>
          <span>Add Member</span>
        </a>
      </header>

      <div class="table-toolbar">

        <label class="table-search">
          <i class="bi bi-search"></i>
          <input
            id="memberSearch"
            placeholder="Search member, stand or ID..."
          >
        </label>

        <span class="table-note">
          Identity photos are required for primary member,
          spouse and named beneficiary.
        </span>

      </div>

      <div class="table-scroll">

        <table class="data-table">

          <thead>
            <tr>
              <th>Member ID</th>
              <th>Primary Member</th>
              <th>Stand / Plot</th>
              <th>Spouse</th>
              <th>Beneficiary</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody id="memberRows">
            ${members.map(member => `
              <tr>

                <td>
                  <code>${member.id}</code>
                </td>

                <td>
                  <strong>${member.name}</strong>
                  <small>${member.nationalId}</small>
                </td>

                <td>${member.stand}</td>

                <td>${member.spouse}</td>

                <td>${member.beneficiary}</td>

                <td>
                  <span
                    class="status-badge ${
                      member.status === 'Pending'
                        ? 'pending'
                        : ''
                    }"
                  >
                    ${member.status}
                  </span>
                </td>

              </tr>
            `).join('')}
          </tbody>

        </table>

      </div>

    </section>
  `;
}