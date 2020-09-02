This is an authenticated Todo app that uses Next.js, Airtable, Tailwind CSS, and Auth0.

![Screenshot of Todo App](./public/screenshot.jpg)

## Getting Started

You'll need to add a `.env.local` file to the root of the repository and include appropriate environment variables for Airtable, Auth0, and a cookie secret.

```bash
AIRTABLE_API_KEY=
AIRTABLE_BASE_ID=
AIRTABLE_TABLE_NAME=
AUTH0_DOMAIN=
AUTH0_SECRET=
AUTH0_CLIENT_ID=
COOKIE_SECRET=
```

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.
