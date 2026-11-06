# ATOM AI-readable design guidance

## Purpose
ATOM is a React + TypeScript, accessible-by-default atomic design system. Generated UI MUST respect this system instead of inventing parallel buttons, inputs, tokens or layout primitives.

## Component selection
1. Choose the smallest suitable existing component from `src/design-system/index.ts`.
2. Atoms are primitives; Molecules compose atoms; Organisms compose smaller pieces; Templates provide structure; Pages supply domain content.
3. Inspect `src/docs/registry.tsx` for documented patterns, usage notes, and status.
4. Prefer `Stable` components. `Beta` components are okay for prototypes but require project-specific review.
5. Do not confuse example/demo components with production services: SignInForm does not authenticate; SettingsPanel does not persist data; MiniDashboard uses sample data.

## Tokens
- NEVER hardcode color values when an appropriate semantic `--at-*` token exists.
- Use `--at-brand` for primary actions, `--at-text` for content, `--at-surface` for cards, and `--at-border` for borders.
- Use the spacing scale `--at-space-{1,2,3,4,5,6,8,10,12,16}`.
- Use the typeface `--at-font-sans`, radii `--at-radius-*`, and motion tokens.
- Maintain support for `data-theme="dark"` and `data-theme="light"`.

## Accessibility invariants
- IconButton always receives a meaningful `aria-label`.
- Form controls have associated visible labels and contextual validation messages.
- Use native interactive semantics, keyboard support, focus-visible rings, and reduced-motion compliance.
- Never convey status by color alone.
- Test responsive layouts, non-pointer navigation, and long localized text.

## Safe customization
- Favor extending components through props and CSS variables, not cloning JSX.
- Keep components framework-agnostic at the styling level where possible.
- Never claim untested WCAG compliance, live backend behavior or persistence.
- Keep docs, TypeScript types and component source synchronized after any change.

## Change review
- Record component status: Stable / Beta.
- Explain why a new component cannot be composed from existing parts.
- Confirm usage against code, tokens, themes and accessibility before approval.
