export function PageCard({ title, tools = '', className = '', body = '' }) {
  return `
    <section class="card shanduko-card ${className}">
      <header class="card-header">
        <h3 class="card-title">${title}</h3>
        ${tools ? `<div class="card-tools">${tools}</div>` : ''}
      </header>
      <div class="card-body">${body}</div>
    </section>
  `;
}
