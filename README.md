# create-setup-backend

> ⚡ Scaffold a complete Node.js MVC backend structure with a single command!

[![npm version](https://img.shields.io/npm/v/create-setup-backend.svg)](https://www.npmjs.com/package/create-setup-backend)
[![npm downloads](https://img.shields.io/npm/dm/create-setup-backend.svg)](https://www.npmjs.com/package/create-setup-backend)
[![license](https://img.shields.io/npm/l/create-setup-backend.svg)](https://github.com/mithlohar144/create-setup-backend/blob/main/LICENSE)

---

## 🚀 Quick Start

No installation needed — just run:

```bash
npx create-setup-backend my-project
```

Or install globally and use anywhere:

```bash
npm install -g create-setup-backend
create-setup-backend my-project
```

---

## 📁 Generated Folder Structure

```
my-project/
├── src/
│   ├── config/          → DB and app configuration
│   ├── controllers/     → Business logic (MVC Controllers)
│   ├── models/          → Mongoose schemas / DB models
│   ├── routes/          → Express route definitions
│   ├── middlewares/     → Auth, error handling middlewares
│   ├── utils/           → Helper / utility functions
│   └── app.js           → Express app setup
├── server.js            → Server entry point
├── .env                 → Environment variables
├── .env.example         → Environment variable template
├── .gitignore           → Git ignore rules
└── package.json         → Project dependencies
```

---

## ⚙️ After Scaffolding

```bash
cd my-project
npm install
cp .env.example .env
npm run dev
```

Your server will be running at `http://localhost:5000` 🎉

---

## 📦 What's Included

| File / Folder | Purpose |
|---|---|
| `server.js` | Entry point — starts the Express server |
| `src/app.js` | Express app setup — middleware, routes |
| `src/config/` | Database connection and app config |
| `src/controllers/` | Handle request logic (MVC pattern) |
| `src/models/` | Mongoose data schemas |
| `src/routes/` | Route definitions for API endpoints |
| `src/middlewares/` | Auth middleware, error handler |
| `src/utils/` | Reusable helper functions |
| `.env` | Environment config (PORT, DB URI, JWT) |
| `.gitignore` | Ignores node_modules, .env, logs |

---

## 🛠️ Tech Stack (Pre-configured)

- **[Express.js](https://expressjs.com/)** — Fast, minimal web framework
- **[Mongoose](https://mongoosejs.com/)** — MongoDB object modeling
- **[dotenv](https://github.com/motdotla/dotenv)** — Environment variable management
- **[cors](https://github.com/expressjs/cors)** — Cross-Origin Resource Sharing
- **[express-validator](https://express-validator.github.io/)** — Request validation
- **[nodemon](https://nodemon.io/)** *(dev)* — Auto-restart on file changes

---

## 📝 Available Scripts

Inside the generated project:

| Command | Description |
|---|---|
| `npm start` | Start the server in production |
| `npm run dev` | Start with nodemon (auto-reload) |

---

## 🔧 Environment Variables

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/your-db-name
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

---

## 📄 License

MIT © [create-setup-backend](https://github.com/mithlohar144/create-setup-backend)