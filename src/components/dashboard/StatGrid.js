import {
  StatCard
} from '../common/StatCard.js';

export function StatGrid() {
  return `
    <div class="stats-grid">

      ${StatCard({
        icon: 'bi-people-fill',
        label: 'Registered Members',
        value: '78',
        note: 'Authoritative cooperative register',
        tone: 'pink'
      })}

      ${StatCard({
        icon: 'bi-journal-check',
        label: 'Finance Tracking',
        value: '2 Ledgers',
        note: 'Tracking only - no payment collection',
        tone: 'amber'
      })}

      ${StatCard({
        icon: 'bi-wallet2',
        label: 'Admin Finance',
        value: 'Tracking',
        note: 'Administrative finance records',
        tone: 'green'
      })}

      ${StatCard({
        icon: 'bi-building',
        label: 'Development Finance',
        value: 'Tracking',
        note: 'Infrastructure finance records',
        tone: 'purple'
      })}

    </div>
  `;
}