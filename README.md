# ATOM — React Atomic Design System

A fully runnable, extensible React + TypeScript design-system starter organized around **Atomic Design** (Atoms → Molecules → Organisms → Templates → Pages).

## Requirements

Node.js 20.19+ or 22.12+ (Vite 8 requirement).

## Quick start

```bash
npm install
npm run dev
```

Open **http://localhost:5173/** (or the URL Vite prints in your terminal).

> **Important:** Do **not** double-click `index.html` or use a `file://` URL. Vite must transform TypeScript/JSX first. Opening the source HTML directly cannot launch React. The HTML now displays an explanation rather than a blank page if opened as a file.
>
> **Mac:** You may also run `bash start.command` from the extracted folder (or double-click `start.command` if your macOS security settings permit it). This runs install and starts the development server.

### If the page is still blank

1. Check Terminal for install/build errors. Run `npm run typecheck` and `npm run build` to see the exact failure.
2. Open your browser developer tools → **Console**, and check for red errors. The page should now also show a startup or rendering error instead of remaining blank.
3. Confirm the URL starts with `http://localhost:` rather than `file://`. Try a private window and disable browser extensions if errors persist.
4. If deploying to Vercel, select **Vite** as the framework and build into `dist` (`vercel.json` is included). Upload the complete source repository, not `index.html` by itself.

The project was statically checked here, but a full npm install/build could not be run in the authoring environment because the npm registry was unreachable. Test the build on your local machine before deploying.

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Local development server |
| `npm run typecheck` | Check TypeScript |
| `npm run build` | Production build (`dist/`) |
| `npm run preview` | Preview built app |

## Features

- 29 documented entries, including 27 reusable primitives/compositions/layouts and 2 example page components.
- Interactive component previews, example code, and selected prop reference.
- Dark and light themes, blue-first brand palette, semantic CSS variables.
- Searchable navigation; `Cmd/Ctrl + K` component command menu.
- Semantic form controls, accessible labels, keyboard-navigable tabs and focus states.
- Responsive documentation UI and localStorage theme persistence.
- No backend; can deploy statically.

## Structure

```text
src/
  design-system/
    tokens.css              # primitive + semantic design tokens
    components.css          # styles for all reusable components
    components/
      atoms.tsx             # primitives
      molecules.tsx         # small compositions
      organisms.tsx         # functional interface sections
      templates.tsx         # generic layouts
      pages.tsx             # example page compositions
    index.ts                # public entry point
  docs/
    registry.tsx            # catalog data + examples
  App.tsx                   # docs application
  app.css                   # docs layout and presentation
  main.tsx                  # app entry point
```

## Use the design system in your own app

```tsx
import { Button, Badge, FormField, Input } from './design-system';
import './design-system/tokens.css';
import './design-system/components.css';

function Profile() {
  return (
    <section>
      <Badge tone="success">Active</Badge>
      <FormField label="Display name" htmlFor="name">
        <Input id="name" placeholder="Your name" />
      </FormField>
      <Button>Save profile</Button>
    </section>
  );
}
```

## Extension guidelines

- Add tokens to `tokens.css` with **semantic** aliases for theme-dependent values.
- Keep atoms independent; build molecules from atoms, organisms from atoms/molecules.
- Expose explicit typed props and forward native HTML attributes when possible.
- Add new components to `index.ts` and a documented example to `docs/registry.tsx`.
- Record production readiness honestly with `Stable` or `Beta` status.
- Prefer native HTML elements and test with keyboard, screen readers, zoom, and real devices.

## Scope and limitations

This is a **starter application**, not a published npm package or certified design-system framework. Examples in `MiniDashboard`, `SettingsPanel`, and `SignInForm` demonstrate UI state; they are not connected to databases, authentication or APIs. `Toast` requires a parent to control its lifecycle. DataTable sorting operates locally on an in-memory array. Before release, add automated interaction/visual testing and perform a formal accessibility audit.

See `ai-guidelines.md` for machine-readable design usage guidance.

MIT license. © 2026 ATOM.
