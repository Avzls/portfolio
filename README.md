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

## Deployment (Docker)

The repo ships with Dockerfiles for both services and a full-stack
`docker-compose.yml` (MySQL + API + Web).

```bash
cp .env.example .env        # fill in strong secrets + your real domains
docker compose up -d --build
```

This brings up:

- `db` — MySQL 8 (data persisted in the `db_data` volume; not exposed to host)
- `api` — Go API on port `8081` (uploads persisted in the `uploads_data` volume)
- `web` — Next.js on port `3000`

Put a reverse proxy (Nginx/Caddy/Traefik) in front to terminate TLS and route
your domains to the `web` and `api` containers.

### Production checklist

- [ ] Set a strong, random `JWT_SECRET` (e.g. `openssl rand -base64 48`).
- [ ] Set `ALLOWED_ORIGIN` to your exact frontend URL (never `*`).
- [ ] Set `NEXT_PUBLIC_API_URL` to the public API URL (baked at build time).
- [ ] Change the default admin password (`admin` / `admin123`) after first login.
- [ ] Use strong DB passwords; the DB port is not exposed to the host by default.
- [ ] Serve everything over HTTPS via your reverse proxy.

Health check endpoint: `GET /health` on the API returns `{"status":"ok"}`.

## Notes

- `.env` files and uploaded media are gitignored. Configure your own before running.
- Uploaded files are served by the API under `/uploads/...`.
