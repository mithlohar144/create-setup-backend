#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// Chalk v4 compatible (CommonJS)
const chalk = (() => {
  try { return require("chalk"); } catch { return { green: s => s, cyan: s => s, yellow: s => s, red: s => s, bold: s => s, gray: s => s }; }
})();

const projectName = process.argv[2];

if (!projectName) {
  console.log(chalk.red("\n❌  Please provide a project name!"));
  console.log(chalk.yellow("   Usage: create-setup-backend <project-name>\n"));
  process.exit(1);
}

const targetDir = path.join(process.cwd(), projectName);

if (fs.existsSync(targetDir)) {
  console.log(chalk.red(`\n❌  Folder '${projectName}' already exists!\n`));
  process.exit(1);
}

// ─── FILES TO CREATE ─────────────────────────────────────────────

const files = {

  // ── Root files ────────────────────────────────────────────────

  "package.json": JSON.stringify({
    name: projectName,
    version: "1.0.0",
    description: "Node.js MVC Backend",
    main: "server.js",
    scripts: {
      start: "node server.js",
      dev: "nodemon server.js"
    },
    dependencies: {
      express: "^4.18.2",
      mongoose: "^8.0.0",
      dotenv: "^16.3.1",
      cors: "^2.8.5",
      "express-validator": "^7.0.1"
    },
    devDependencies: {
      nodemon: "^3.0.2"
    }
  }, null, 2),

  ".env": `PORT=5000
MONGO_URI=mongodb://localhost:27017/${projectName}
JWT_SECRET=your_super_secret_key_here
NODE_ENV=development
`,

  ".env.example": `PORT=5000
MONGO_URI=mongodb://localhost:27017/${projectName}
JWT_SECRET=your_secret_here
NODE_ENV=development
`,

  ".gitignore": `node_modules/
.env
dist/
*.log
`,

  "README.md": `# ${projectName}

> Node.js MVC Backend — scaffolded with \`create-setup-backend\` ⚡

## 🚀 Setup

\`\`\`bash
cd ${projectName}
npm install
cp .env.example .env
npm run dev
\`\`\`

## 📁 Folder Structure

\`\`\`
${projectName}/
├── src/
│   ├── config/
│   │   └── db.js          → MongoDB connection
│   ├── controllers/
│   │   └── user.controller.js
│   ├── models/
│   │   └── user.model.js
│   ├── routes/
│   │   └── user.routes.js
│   ├── middlewares/
│   │   └── auth.middleware.js
│   └── app.js             → Express app setup
├── server.js              → Server entry point
├── .env
├── .env.example
├── .gitignore
└── package.json
\`\`\`

## 🛠️ Built With
- Express.js
- Mongoose
- dotenv
`,

  // ── server.js — outside src ───────────────────────────────────

  "server.js": `require("dotenv").config();
const app = require("./src/app");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(\`🚀 Server running at: http://localhost:\${PORT}\`);
});
`,

  // ── src/app.js ────────────────────────────────────────────────

  "src/app.js": `const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get("/", (req, res) => {
  res.json({ message: "✅ Backend is up and running!" });
});

// TODO: import and use your routes here
// const userRoutes = require("./routes/user.routes");
// app.use("/api/users", userRoutes);

module.exports = app;
`,

  // ── config/db.js ─────────────────────────────────────────────

  "src/config/db.js": `const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(\`✅ MongoDB Connected: \${conn.connection.host}\`);
  } catch (error) {
    console.error("❌ DB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
`,

  // ── controllers/user.controller.js — empty sample ────────────

  "src/controllers/user.controller.js": `// User Controller
// TODO: Add your controller logic here

// Example:
// exports.getAllUsers = async (req, res, next) => {
//   try {
//     res.json({ success: true, data: [] });
//   } catch (error) {
//     next(error);
//   }
// };
`,

  // ── models/user.model.js — empty sample ──────────────────────

  "src/models/user.model.js": `const mongoose = require("mongoose");

// TODO: Define your schema here

// Example:
// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
// }, { timestamps: true });

// module.exports = mongoose.model("User", userSchema);
`,

  // ── routes/user.routes.js — empty sample ─────────────────────

  "src/routes/user.routes.js": `const express = require("express");
const router = express.Router();

// TODO: Import your controller and define routes here

// Example:
// const { getAllUsers } = require("../controllers/user.controller");
// router.get("/", getAllUsers);

module.exports = router;
`,

  // ── middlewares/auth.middleware.js — empty sample ─────────────

  "src/middlewares/auth.middleware.js": `// Auth Middleware
// TODO: Add your middleware logic here

// Example:
// const protect = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) return res.status(401).json({ message: "No token provided" });
//   next();
// };

// module.exports = { protect };
`,

};

// ─── HELPER ──────────────────────────────────────────────────────

function createFiles(basePath, fileMap) {
  for (const [filePath, content] of Object.entries(fileMap)) {
    const fullPath = path.join(basePath, filePath);
    const dir = path.dirname(fullPath);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(fullPath, content, "utf8");
  }
}

// ─── MAIN ────────────────────────────────────────────────────────

console.log(chalk.cyan(`\n⚡ create-setup-backend`));
console.log(chalk.gray("─".repeat(40)));
console.log(`📁 Project: ${chalk.bold(projectName)}`);
console.log(chalk.gray("─".repeat(40)));

fs.mkdirSync(targetDir, { recursive: true });

Object.keys(files).forEach((f) => {
  process.stdout.write(chalk.gray(`   creating → `) + chalk.green(f) + "\n");
});

createFiles(targetDir, files);

console.log(chalk.gray("─".repeat(40)));
console.log(chalk.green(`\n✅ Project is ready!\n`));
console.log(chalk.yellow("👉 Next steps:\n"));
console.log(`   ${chalk.cyan("cd")} ${projectName}`);
console.log(`   ${chalk.cyan("npm install")}`);
console.log(`   ${chalk.cyan("cp .env.example .env")}`);
console.log(`   ${chalk.cyan("npm run dev")}`);
console.log(chalk.gray("\n────────────────────────────────────────\n"));