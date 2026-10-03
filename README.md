# VedTech

VedTech is a standard Next.js App Router site using TypeScript, Tailwind CSS, Framer Motion, and npm. It can run on Vercel, Azure, or any Node-compatible VPS.

## Setup

Prerequisites: Node.js `>=22.13.0` and npm.

```bash
npm install
copy .env.example .env
npm run dev
```

Open `http://localhost:3000`.

## Environment

Set these server-only variables in `.env`:

- `RESEND_API_KEY`: Resend API key.
- `QUOTE_TO_EMAIL`: inbox for quote enquiries.
- `QUOTE_FROM_EMAIL`: verified sender, for example `VedTech <forms@example.com>`.

The form uses client and server Zod validation, a honeypot, an in-memory rate limit, and a server action. Missing configuration or Resend failures return an error and preserve entered values. `.env` files are ignored by Git.

## Development and checks

```bash
npm run dev
npm run lint
npm run build
npm start
```

`npm run build` creates the standard standalone Next.js production output in `.next/`. `npm start` serves `.next/standalone/server.js`.

## Deploy

### Vercel

Import the repository, keep the framework preset as Next.js, add the three environment variables, and deploy. Vercel runs `next build` automatically.

### Azure or VPS

```bash
npm ci
npm run build
npm start
```

Run the app behind the platform's reverse proxy and configure the same environment variables in the service manager. Do not commit `.env` or expose Resend credentials to client code.

## Local MySQL and Railway

The quote form stores leads in MySQL with Drizzle ORM, then sends the notification through Resend. The database pool is server-only and reused during local hot reload.

### Create MySQL on Railway

1. Create a Railway project and add the MySQL service from the template/catalog.
2. Open the MySQL service's **Variables** or **Connect** view.
3. Copy the generated `DATABASE_URL` value. It has the form `mysql://user:password@host:port/database`.
4. Add it to local `.env` alongside the Resend variables:

```env
DATABASE_URL=mysql://username:password@host:3306/database
```

Do not put `DATABASE_URL` in client code or commit `.env`.

### Run migrations

```bash
npm run db:generate
npm run db:migrate
```

`db:generate` creates SQL under `drizzle/`; `db:migrate` applies pending migrations to the MySQL database in `DATABASE_URL`. Run these commands after setting `.env` and whenever the schema changes.

### Local test

Use a local MySQL instance or a Railway development database, set `DATABASE_URL`, start the app, and submit the quote form. Verify the new row in `quote_requests`. A database failure returns an error and does not send email. If the row is saved but Resend fails, the form reports that the lead was saved and the server logs the email failure.

### Host the site on Railway

Create a Railway service from the repository, set the three Resend variables and `DATABASE_URL`, and use the standard Node commands:

```bash
npm ci
npm run db:migrate
npm run build
npm start
```

Expose the port supplied by Railway. The same deployment can use the Railway MySQL service; keep all credentials in Railway Variables.
