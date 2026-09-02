export function StatusBadge({ label, tone = 'secondary' }) {
  return `<span class="badge rounded-pill text-bg-${tone}">${label}</span>`;
}
