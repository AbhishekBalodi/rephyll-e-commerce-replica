# rePhyl Backend

Express.js + MySQL backend for the rePhyl website.

## Quick Start

```bash
cd server
npm install
npm run dev
```

The server will:
1. Connect to MySQL using credentials in `.env`
2. Auto-create the `rephyl_db` database and all tables
3. Start listening on port 5000

## API Endpoints

### Health
- `GET /api/health` — Server status

### Auth
- `POST /api/auth/register` — Register (body: `{ email, password, fullName, phone? }`)
- `POST /api/auth/login` — Login (body: `{ email, password }`)
- `GET /api/auth/me` — Get profile (requires Bearer token)

### Contact
- `POST /api/contact` — Submit contact form (body: `{ name, email, message }`)
- `GET /api/contact` — Get all messages (requires Bearer token)

### Newsletter
- `POST /api/newsletter/subscribe` — Subscribe (body: `{ email }`)

## Architecture

```
server/
├── src/
│   ├── index.js              # Entry point
│   ├── app.js                # Express config
│   ├── controllers/          # HTTP request handlers
│   ├── services/             # Business logic
│   ├── repositories/         # Data access (MySQL)
│   ├── database/             # DB connection & schema
│   ├── middleware/            # Auth, validation, logging, errors
│   ├── routes/               # Route definitions
│   └── utils/                # Logger utility
├── .env                      # Environment variables
└── package.json
```
