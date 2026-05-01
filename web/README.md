# Acumen Web App

Acumen is a Next.js prototype for practising business judgement through scenario simulations, feedback, peer matching, and messaging.

## Requirements

- Node.js 20 or newer
- npm 10 or newer

No external database or API keys are required. The prototype stores demo progress, connections, and messages in browser `localStorage`.

## Run Locally

From the `web` folder:

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

If port 3000 is already busy:

```bash
npm run dev -- --port 3001
```

## Useful Commands

```bash
npm run lint
npm run build
npm run start
```

- `npm run lint` checks code style.
- `npm run build` verifies the app can be production-built.
- `npm run start` serves the production build after `npm run build`.

## Demo Flow

Main routes:

- `/` landing page
- `/onboarding` user setup
- `/dashboard` scenario selection and progress
- `/simulation?id=kartika-succession` flagship succession scenario
- `/feedback` latest simulation feedback
- `/network` peer matching and connections
- `/messages` chat with connected peers
- `/profile` user skill profile

For fastest testing, use the returning-user/demo action on the landing page if available, or complete onboarding once. State persists locally in the browser.

## Project Structure

```text
web/
  src/app/                 Next.js App Router pages
  src/components/app/      App shell and domain UI
  src/components/ui/       Shared UI primitives
  src/components/simulation/
  src/components/feedback/
  src/lib/scenarios/       Scenario data
  src/lib/scoring.ts       Feedback/scoring logic
  src/lib/demo-data.ts     Demo peers and user data
  src/lib/types.ts         Shared TypeScript types
```

## Sharing With The Team

### Option 1: GitHub

From the project root:

```bash
git add web
git commit -m "Add Acumen web app messaging prototype"
git remote add origin <your-github-repo-url>
git push -u origin main
```

Your teammate can then run:

```bash
git clone <your-github-repo-url>
cd <repo-folder>/web
npm install
npm run dev
```

### Option 2: Zip File

Zip the `web` folder, but exclude:

- `node_modules`
- `.next`
- `*.log`
- `*.tsbuildinfo`

Your teammate can unzip it, then run:

```bash
cd web
npm install
npm run dev
```

### Option 3: Vercel Preview

Push the repo to GitHub, import it into Vercel, and set the project root to:

```text
web
```

Vercel should detect Next.js automatically. No environment variables are needed.
