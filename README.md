# Shanduko Housing Cooperative — UI redo

This is a **drop-in UI replacement**, not a new Vite project.

Copy these files into your existing Vite project at:

`C:\Users\nooklyweb\Desktop\Shanduko-web`

Replace:

- `index.html`
- `src/main.js`
- `src/style.css`

Keep your existing `package.json`, `package-lock.json`, `vite.config.*`, `tsconfig.*`, `eslint.config.*`, `public/`, and `node_modules/`.

The UI is intentionally framework-light: Vite loads `src/main.js` directly, so the existing Vite installation can remain intact. The visual style is an AdminLTE-style administrative portal, with a compact dark sidebar, top utility bar, dashboard cards, tables, forms, isolated ledgers, responsive layout, and light/dark mode.

Run from the existing project:

```powershell
cd C:\Users\nooklyweb\Desktop\Shanduko-web
npm run dev
```
