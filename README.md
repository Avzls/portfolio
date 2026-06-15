# Porto

Personal portfolio with a Go (chi) REST API backend and a Next.js frontend, backed by MySQL. Content (profile, skills, experiences, portfolio, social links, facts, clients, blog posts, site settings) is editable through an admin dashboard.

## Stack

- **Backend:** Go + chi router, MySQL, JWT auth
- **Frontend:** Next.js (pages router), server-side rendering
- **Database:** MySQL

## Project structure

```
go-api/     Go REST API (handlers, models, database migration/seed, middleware)
nextjs/     Next.js frontend (public site + /admin dashboard)
```

## Getting started

### 1. Backend (go-api)

```bash
cd go-api
cp .env.example .env        # then edit DB credentials, JWT secret, port
go run .
```

The API migrates and seeds the database on first run. Default port is `8081`
(8080 is often taken by Apache/XAMPP). Default admin login is `admin` / `admin123`
— change it from the admin Settings page after first login.

### 2. Frontend (nextjs)

```bash
cd nextjs
cp .env.example .env.local  # set NEXT_PUBLIC_API_URL to match the API port
npm install
npm run dev
```

- Public site: http://localhost:3000
- Admin dashboard: http://localhost:3000/admin/dashboard

## Deployment (VPS)

For deploying to your own Ubuntu/Debian VPS with **systemd + Nginx**, see
[DEPLOY.md](DEPLOY.md). The `deploy/` folder contains:

- `porto-api.service` / `porto-web.service` — systemd units for the API and web
- `nginx.conf` — reverse proxy (one domain → `/` to Next.js, `/api` + `/uploads` to the Go API)
- `deploy.sh` — pull, build both apps, restart services

Updating after a code change is just `bash deploy/deploy.sh` on the server.

Health check endpoint: `GET /health` on the API returns `{"status":"ok"}`.

## Notes

- `.env` files and uploaded media are gitignored. Configure your own before running.
- Uploaded files are served by the API under `/uploads/...`.
