# next-app

## Setup

```bash
npm install
```
Installs dependencies and generates Prisma Client via `postinstall`.

```bash
npx prisma dev
```
Starts a local Prisma Postgres server. Keep it running in a separate terminal. It prints a `prisma+postgres://...` URL.

Create `.env` in the project root:

```env
DATABASE_URL="<prisma+postgres URL from `prisma dev`>"
DIRECT_URL="<same URL>"
AUTH_SECRET="<generate with: openssl rand -base64 32>"
```
`DATABASE_URL` is used by the runtime client, `DIRECT_URL` by the Prisma CLI (see `prisma.config.ts`). `AUTH_SECRET` is required by NextAuth.

```bash
npx prisma migrate dev
```
Applies migrations to the local database.

## Develop

```bash
npm run dev
```
Starts Next.js on http://localhost:3000.

```bash
npx prisma studio
```
GUI for browsing database rows.

## Schema changes

```bash
npx prisma migrate dev --name <change_description>
```
Creates a new migration in `prisma/migrations/` and applies it.
