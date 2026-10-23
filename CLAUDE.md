# CLAUDE.md

## Design & motion skills

Third-party skills are vendored in `.claude/skills/`. Use them for any frontend, UI, or animation work on this site:

- **make-interfaces-feel-better**: UI polish details (typography, alignment, radii, shadows, hover states, hit areas). Run it as a review pass on UI changes.
- **transitions-dev / transitions-polish / transitions-ui-generation**: CSS transitions and motion tokens from transitions.dev. Prefer these for UI state transitions (modals, dropdowns, page slides, text/icon swaps).
- **gsap-\***: official GSAP skills (core, timeline, ScrollTrigger, plugins, React, frameworks, performance, utils). Use for timeline or scroll-driven animation that CSS can't handle well.

Sources (MIT): github.com/jakubkrehel/make-interfaces-feel-better, github.com/Jakubantalik/transitions.dev, github.com/greensock/gsap-skills. To update, re-copy each repo's `skills/` folders.
