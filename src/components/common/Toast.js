export function showToast(message, type = 'info') {
  const icon = type === 'success' ? 'bi-check-circle-fill' : 'bi-info-circle-fill';
  const el = document.createElement('div');
  el.className = `shanduko-toast ${type}`;
  el.innerHTML = `<i class="bi ${icon}" aria-hidden="true"></i><span>${message}</span>`;
  document.body.appendChild(el);

  requestAnimationFrame(() => el.classList.add('show'));

  window.setTimeout(() => {
    el.classList.remove('show');
    window.setTimeout(() => el.remove(), 250);
  }, 2600);
}
