# Coffyyy

Coffyyy is a client-side coffee journal built with Vite, React, and TypeScript. It helps track beans, machines, and brew sessions in the browser, then surfaces quick stats such as recent brews, unique beans brewed, and the best-rated grind size.

## What It Does

- Log espresso brews with bean, machine, dose, yield, extraction time, flow, and a quick rating.
- Add beans to a personal library with origin, process, roast level, dominant note, flavors, and tasting notes.
- Add brewing equipment and reuse it through suggestions in later forms.
- Browse a filterable library of beans and machines.
- Review home-screen insights from locally stored brew history.
- Toggle light and dark themes.

## Stack

- React 19 + TypeScript
- Vite 7
- Tailwind CSS 4
- Dexie + IndexedDB for local persistence
- React Router 7
- ESLint and Biome

There is no backend in this repo. All app data lives in the browser’s IndexedDB database named `Coffyyy`.

## App Routes

- `/home`: dashboard with quick actions, brew stats, and recent brews
- `/log`: entry point for logging flows
- `/log/brew`: multi-step brew form
- `/log/bean`: bean catalog form
- `/log/machine`: equipment form
- `/library`: searchable bean and machine library
- `/history`: placeholder/history work area
- `/designsystem`: internal component showcase

## Project Structure

```text
src/
  components/     Reusable UI and feature-specific cards/forms
  contexts/       Theme context
  db/             Dexie database and CRUD helpers
  hooks/api/      Live-query hooks backed by Dexie
  lib/api/        Read/query helpers for beans, brews, machines, stats
  pages/          Route components
  providers/      App-level providers
  types/          Shared TypeScript models
```

`@/` is aliased to `src/`.

## Getting Started

```bash
npm install
npm run dev
```

Open the local Vite URL shown in the terminal.

## Scripts

- `npm run dev` starts the development server.
- `npm run build` type-checks and builds the production bundle.
- `npm run preview` serves the built app locally.
- `npm run lint` runs ESLint.
- `npm run biome` formats `src/` with Biome.

Note: `npm run biome` uses `bunx`, so Bun must be installed even if you use npm for the rest of the project.

## Data Model

The app stores three main records:

- `Beans`: catalog metadata such as brand, origin, process, roast level, and flavor profile
- `Machines`: equipment metadata such as brand, model, type, grind range, and capacity
- `Brews`: shot-level logs including bean, machine, weights, grind size, time, flow, date, and rating

## Current State

- IndexedDB powers the app, so clearing browser storage will remove local data.
- Suggestions in the log forms are generated from previously saved beans and machines.
- No automated test runner is configured yet.
- The `History` page is not feature-complete and currently acts more like a scaffold than a finished archive view.
