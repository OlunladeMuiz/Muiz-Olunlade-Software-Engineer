# Interactive Developer Portfolio

SvelteKit portfolio scaffold for Olunlade Abdulmuiz, built from the Stage 5b TRD.

## What is in place

- SvelteKit app shell with theme and accent support
- Obsidian-style visual system and global motion hooks
- Hero, About, Projects, Skills, Contact, and Footer sections
- Command palette with navigation, actions, and AI mode
- Project modal, mobile drawer, toast notifications, and section reveal actions
- API routes for contact, AI assistant, and resume download

## Local setup

1. Install dependencies.
2. Copy `.env.example` to `.env` if you want live AI or email delivery.
3. Run `npm run dev`.

## Checks

- `npm run check`
- `npm run lint`
- `npm run test:unit`
- `npm run test:e2e`

## Notes

- The contact and AI routes fall back to local mock behavior when keys are missing.
- Update the seeded project and social links with the real portfolio content when ready.
