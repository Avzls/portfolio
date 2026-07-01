# Deploying Porto on a VPS (systemd + Nginx)

Target: Ubuntu/Debian VPS. The Go API and the Next.js frontend each run as a
systemd service; Nginx sits in front as a reverse proxy and serves one domain.

```
Browser ──► Nginx (80/443) ──► /        Next.js  (127.0.0.1:3000)
                              └► /api    Go API   (127.0.0.1:8081)
                              └► /uploads Go API   (127.0.0.1:8081)
```

---

## 1. Install prerequisites

```bash
sudo apt update
sudo apt install -y nginx mysql-server git curl

# Go (adjust version as needed)
curl -LO https://go.dev/dl/go1.25.0.linux-amd64.tar.gz
sudo rm -rf /usr/local/go && sudo tar -C /usr/local -xzf go1.25.0.linux-amd64.tar.gz
echo 'export PATH=$PATH:/usr/local/go/bin' | sudo tee /etc/profile.d/go.sh
source /etc/profile.d/go.sh

# Node.js 20 LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

## 2. Create the app user and directory

```bash
sudo adduser --system --group --home /var/www/porto porto
sudo mkdir -p /var/www/porto
sudo chown -R porto:porto /var/www/porto
```

## 3. Set up the database

```bash
sudo mysql
```

```sql
CREATE DATABASE porto CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'porto_user'@'localhost' IDENTIFIED BY 'a-strong-password';
GRANT ALL PRIVILEGES ON porto.* TO 'porto_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

The API auto-migrates and seeds the schema on first start, so you don't need to
import any SQL manually.

## 4. Clone the repo

```bash
sudo -u porto git clone https://github.com/Avzls/nextjs.git /var/www/porto
```

## 5. Configure the backend env

```bash
sudo -u porto cp /var/www/porto/go-api/.env.example /var/www/porto/go-api/.env
sudo -u porto nano /var/www/porto/go-api/.env
```

Set real values:

- `DB_PASSWORD` — the password you created in step 3
- `JWT_SECRET` — run `openssl rand -base64 48` and paste the result
- `PORT=8081`, `ALLOWED_ORIGIN=*` (same-origin via Nginx, so `*` is fine here)

## 6. Configure the frontend env

The frontend talks to the API through the same domain (`/api`), so:

```bash
sudo -u porto bash -c 'echo "NEXT_PUBLIC_API_URL=" > /var/www/porto/nextjs/.env.local'
```

Leaving `NEXT_PUBLIC_API_URL` empty makes the browser call `/api/...` on the
current domain, which Nginx routes to the backend. (If you ever host the API on
a separate domain, set the full URL here instead.)

## 7. First build

```bash
cd /var/www/porto
sudo -u porto bash deploy/deploy.sh
```

The first run will fail at the `systemctl restart` step because the services
aren't installed yet — that's expected. The builds themselves should succeed.
Install the services next, then re-run the script.

## 8. Install the systemd services

```bash
sudo cp /var/www/porto/deploy/porto-api.service /etc/systemd/system/
sudo cp /var/www/porto/deploy/porto-web.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now porto-api porto-web
sudo systemctl status porto-api porto-web
```

Allow the porto user to restart services without a password (used by deploy.sh):

```bash
echo 'porto ALL=(ALL) NOPASSWD: /bin/systemctl restart porto-api, /bin/systemctl restart porto-web' | sudo tee /etc/sudoers.d/porto-deploy
```

## 9. Configure Nginx

```bash
sudo cp /var/www/porto/deploy/nginx.conf /etc/nginx/sites-available/porto
sudo nano /etc/nginx/sites-available/porto   # replace porto.example.com with your domain
sudo ln -s /etc/nginx/sites-available/porto /etc/nginx/sites-enabled/porto
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx
```

Point your domain's DNS A record at the VPS IP, then visit `http://your-domain`.

## 10. Enable HTTPS

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d porto.example.com
```

Certbot edits the Nginx config to add TLS and sets up auto-renewal.

## 11. Lock it down

- Log in to `/admin/login` (default `admin` / `admin123`) and **change the
  password immediately** from the Settings tab.
- Make sure MySQL only listens on localhost (default on Ubuntu).
- Enable a firewall: `sudo ufw allow OpenSSH && sudo ufw allow 'Nginx Full' && sudo ufw enable`

---

## Updating after a code change

```bash
cd /var/www/porto
sudo -u porto bash deploy/deploy.sh
```

This pulls `main`, rebuilds both apps, and restarts the services.

## Logs / troubleshooting

```bash
sudo journalctl -u porto-api -f      # backend logs
sudo journalctl -u porto-web -f      # frontend logs
sudo tail -f /var/log/nginx/error.log
curl -s http://127.0.0.1:8081/health # should print {"status":"ok"}
```
