# Repository Guidelines

## Project Structure & Module Organization
`src/main.tsx` boots the Vite app and `src/App.tsx` defines the top-level shell. Route-level screens live in `src/pages/`, with multi-step logging pages under `src/pages/log/`. Reusable UI belongs in `src/components/`, split into feature folders such as `history/`, `library/`, and `log/`; shared shadcn-style primitives live in `src/components/ui/`. Data access is organized in `src/lib/api/` for fetch helpers and `src/db/` plus `src/db/crud/` for Dexie persistence. Put shared utilities in `src/lib/`, hooks in `src/hooks/`, providers and theme wiring in `src/providers/` and `src/contexts/`, and types in `src/types/`.

## Build, Test, and Development Commands
- `npm run dev`: start the Vite dev server with HMR.
- `npm run build`: run `tsc -b` and produce a production build.
- `npm run preview`: serve the built app locally.
- `npm run lint`: run ESLint across the repository.
- `npm run biome`: format `src/` with Biome and organize imports.

## Coding Style & Naming Conventions
Use TypeScript React function components and hooks. Follow Biome’s formatting rules: tabs for indentation and double quotes in JS/TS files. Name components and page files in `PascalCase.tsx`, hooks in `useCamelCase.ts`, and utilities in `camelCase.ts`. Prefer Tailwind utilities in JSX, and keep shared UI primitives inside `src/components/ui/` rather than duplicating patterns.

## Testing Guidelines
No test runner is configured yet. If you add tests, include the framework in `package.json` scripts and document it in `README.md`. Prefer colocated patterns such as `src/**/__tests__/*.test.ts(x)` or `*.spec.ts(x)`. At minimum, run `npm run build` and `npm run lint` before opening a PR.

## Commit & Pull Request Guidelines
Recent history mixes informal messages with short `fix:` commits, so keep messages brief, imperative, and specific, for example `Add brew stats hook` or `fix: log card spacing`. PRs should explain what changed, why it changed, and note any follow-up work. Include linked issues when relevant and attach screenshots or GIFs for UI changes.

## Security & Configuration Tips
Do not commit secrets. Keep local configuration in untracked `.env` files. If new environment variables are introduced, document them in `README.md` and add an `.env.example` when appropriate.
