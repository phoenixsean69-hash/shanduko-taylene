export function InfoBox({ title, value, note, icon, tone = 'primary' }) {
  return `
    <article class="info-box shanduko-stat-card">
      <span class="info-box-icon text-bg-${tone}">
        <i class="bi ${icon}" aria-hidden="true"></i>
      </span>
      <div class="info-box-content">
        <span class="info-box-text">${title}</span>
        <span class="info-box-number">${value}</span>
        <span class="info-box-note">${note}</span>
      </div>
    </article>
  `;
}
