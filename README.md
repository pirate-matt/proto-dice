# Proto Dice

An online dice-roller for Proto by [Serpenthelm Studios](https://www.serpenthelm-studios.com/).

TODO:s

- [x] Pick a react framework to start prototyping
- [ ] Pick and implement linting/prettier/etc
  - [x] eslint comes bog-standard with next.js
  - [ ] @FUTURE: worry about prettier, markdown prettier, etc.
- [x] Pick/implement testing framework
  - vitest for unit testing
  - @FUTURE: if we desire e2e (uncertain because current deploy method is unknown), use playwright
- [ ] TDD/prototype a non-physics based "roller": d6 + boost die vs d6 + boost die
  - [x] Set number of action and challenge dice
  - [x] Set number of action and challenge boost dice
  - [x] Roll Dice and view results
  - [ ] Auto cancel results
  - [ ] Reset Dice
  - [ ] Initial visual design pass
- [ ] Get feedback
- [ ] Pick and add a license
- [ ] Improve visual design
- [ ] Investigate packaging & adding to Wix?
  - [ ] Setup auto test runner pre-deploy?
- [ ] Investigate a Physics / 3D dice rolling solution
- Idea Backlog
  - [ ] Customize dice names: Action/Challenge; Initiation/Opposition; Custom Entries?
  - [ ] Customize colors

## Common Commands / Quick Reminders

- `npm run dev` run local development server
- Testing
  - `npm run tdd` – currently runs and watches any vitest tests

## Project Decisions

Major decision and their rational are described in [DECISIONS.md](./DECISONS.md).

## AUTO-GENERATED README

_Keeping around some of the `npx create-next-app@latest` auto-generated README for now._

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

### Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!