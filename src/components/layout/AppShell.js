import { Header } from './Header.js';
import { Sidebar } from './Sidebar.js';

export function AppShell() {
  return `
    <div class="figma-shell">
      ${Header()}
      ${Sidebar()}
      <main class="figma-main">
        <div class="page-container" id="page"></div>
      </main>
    </div>
  `;
}
