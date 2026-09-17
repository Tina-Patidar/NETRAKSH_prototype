# NETRAKSH — SIH 2026 Web Prototype

**AR-Based Vocational Training Simulator for Industrial Safety in Jharkhand's Mining & Manufacturing Sector**

Problem Statement: SIH26041 · Government of Jharkhand · Category: Smart Education (Software)
Team: **Pioneers**

This is a **web-based prototype** of the Netraksh training platform. It demonstrates the worker
dashboard, training/assessment flow, certification, and admin analytics that will eventually sit
alongside the production Android app (Unity + C# + AR Foundation + Google ARCore). This website is
**not** a replacement for that native AR app — it is a functional demo for evaluation.

---

## 1. Quick Start

1. Extract the ZIP file.
2. Open the folder in **Antigravity** (or VS Code / any terminal).
3. Open a terminal in the project folder.
4. Install dependencies:
   ```
   npm install
   ```
5. Run the dev server:
   ```
   npm run dev
   ```
6. Open the printed local URL (usually `http://localhost:5173`) in your browser.

No backend, no API keys, and no paid services are required. All data is generated locally and
persisted with `localStorage`.

---

## 2. Demo Accounts

On the login screen, pick a role and click **Enter Demo Mode** — no credentials needed.

To use the sign-in form instead, use these Employee IDs (any password):

| Role          | Employee ID  |
|---------------|--------------|
| Worker        | `worker`     |
| Supervisor    | `supervisor` |
| Administrator | `admin`      |

---

## 3. What You Can Demo

- Login → Dashboard → Start Training → AR Simulation → Assessment → Score → Adaptive
  Recommendation → Generate Certificate → Verify Certificate
- Admin Dashboard with charts, hazard heatmap, department table and filters
- Emergency Drill (incident simulator) for Fire / Gas Leak / Machine Failure / Chemical Spill
- Safety Knowledge library with search & category filters
- Language switcher (English / हिन्दी / ᱥᱟᱱᱛᱟᱲᱤ)
- Offline-mode indicator with simulated sync
- Settings page to reset local demo data

Everything runs on local React state + `localStorage` — refreshing the page preserves your
progress; use **Settings → Reset Local Demo Data** to start over.

---

## 4. Project Structure

```
src/
  components/      Reusable UI pieces (StatCard, ProgressBar, HazardHeatmap, etc.)
  pages/           One file per route (Dashboard, ARSimulation, Assessment, ...)
  layouts/          Sidebar, Topbar, MainLayout shell
  context/          AuthContext, LanguageContext, AppDataContext (all localStorage-backed)
  data/             Demo data: modules, questions, facility/hazard data, chart data
  translations/     EN / HI / SAT dictionary
  types/            Shared TypeScript types
  utils/            localStorage helpers
```

## 5. Modifying Demo Data

All demo content lives in `src/data/`:

- `modules.ts` — training module cards (title, description, difficulty, etc.)
- `questions.ts` — assessment question bank
- `facility.ts` — hazard zones, knowledge base entries, department stats, alerts, drill scenarios
- `charts.ts` — chart series for Progress and Admin Dashboard pages

Edit the arrays in these files and the UI updates automatically — no other code changes needed for
simple content edits.

## 6. Building for Production

```
npm run build
```

Output is written to `dist/`. Serve it with any static file host (`npm run preview` to test
locally).

---

## Notes

- This prototype is **not** a legally valid government safety certification issuer — certificate
  and assessment screens say so explicitly.
- The AR Simulation page is a **web mockup** of the planned Unity/ARCore mobile experience, not a
  browser-based AR implementation.
- All statistics on the Admin Dashboard are illustrative demo data.
