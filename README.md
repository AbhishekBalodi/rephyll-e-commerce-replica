# rePhyl - Plant-Based Cleaning Products

hey, this is my e-commerce project for rePhyl — a plant-based cleaning products brand. still a work in progress tbh but it's coming along.

built by **Abhishek Bilodi**

## what is this

an e-commerce frontend (and backend) for rePhyl, a company that makes eco-friendly, plant-based cleaners. the site has product listings, a contact form, newsletter signup, and basic auth.

## tech stack

- React + TypeScript + Vite (frontend)
- Tailwind CSS + shadcn/ui (styling)
- Express.js + Node.js (backend API)
- MySQL (database)

## how to run

### frontend

```bash
npm install
npm run dev
```

opens at `http://localhost:8080`

### backend

```bash
cd server
npm install
npm run dev
```

runs on `http://localhost:5000`

make sure you have MySQL set up and update `server/.env` with your db credentials.

## project structure

```
├── src/                  # react frontend
│   ├── components/       # reusable components
│   ├── pages/            # route pages
│   ├── services/         # api calls
│   └── data/             # product data
├── server/               # express backend
│   ├── src/
│   │   ├── controllers/  # request handlers
│   │   ├── services/     # business logic
│   │   ├── repositories/ # database queries
│   │   ├── database/     # db connection & schema
│   │   ├── middleware/    # auth, validation, etc
│   │   └── routes/       # api routes
│   └── .env              # backend env vars
└── .env                  # frontend env vars
```

## api endpoints

- `GET /api/health` — health check
- `POST /api/auth/register` — sign up
- `POST /api/auth/login` — log in
- `GET /api/auth/me` — get profile (needs token)
- `POST /api/contact` — submit contact form
- `POST /api/newsletter/subscribe` — subscribe to newsletter

## status

still working on it. some stuff might be broken, some pages are half done. will keep updating as i go.

---

made with lots of chai and mass debugging sessions ☕
