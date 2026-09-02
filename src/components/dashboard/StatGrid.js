export function StatGrid() {
  const stats = [
    ['bi-bar-chart-fill', '$1k', 'Total Sales', '+8% from yesterday', 'pink'],
    ['bi-bag-fill', '300', 'Total Order', '+5% from yesterday', 'yellow'],
    ['bi-check-circle-fill', '5', 'Product Sold', '+1.2% from yesterday', 'green'],
    ['bi-person-plus-fill', '8', 'New Customers', '0.5% from yesterday', 'purple'],
  ];
  return `<div class="sales-stat-grid">${stats.map(([icon,value,title,note,tone]) => `
    <div class="sales-stat ${tone}">
      <span class="stat-icon"><i class="bi ${icon}"></i></span>
      <strong>${value}</strong><span>${title}</span><small>${note}</small>
    </div>`).join('')}</div>`;
}
