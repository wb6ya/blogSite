# Personal Blog (Roadmap.sh Project)

A simple personal blog app built with Node.js, Express, EJS, and Quill.js.

Project reference:
https://roadmap.sh/projects/personal-blog

## Features

- View all blog posts on the home page
- Open a single blog post page
- Admin-protected routes using Basic Auth
- Create, edit, and delete blog posts
- Blog data stored in `src/data/blogs.json`

## Tech Stack

- Node.js
- Express
- EJS
- Quill.js
- dotenv

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Create `.env` in the project root:

```env
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin
```

3. Run the app:

```bash
npm run dev
```

4. Open:

- Home: `http://localhost:3000/home`
- Admin: `http://localhost:3000/admin`

## Notes

- Admin routes require browser Basic Auth using the credentials from `.env`.
- The app redirects `/` to `/home`.
