## 📜 Available Scripts

This project uses **Yarn** as its package manager. Below are the available scripts for development, production, and database management.

---

### 🚀 Development

| Script     | Description                                                       |
| ---------- | ----------------------------------------------------------------- |
| `yarn dev` | Starts the Next.js development server at `http://localhost:3000`. |

---

<!-- ### ⚙️ Production

| Script       | Description                                                |
| ------------ | ---------------------------------------------------------- |
| `yarn build` | Builds the Next.js app for production.                     |
| `yarn start` | Starts the production server. Run this after `yarn build`. |

--- -->

### 🗄️ Prisma Database Commands

| Script             | Description                                                             |
| ------------------ | ----------------------------------------------------------------------- |
| `yarn db-migrate`  | Applies schema changes using `prisma migrate dev`.                      |
| `yarn db-generate` | Regenerates Prisma Client from your schema.                             |
| `yarn db-studio`   | Opens Prisma Studio, a visual database browser.                         |
| `yarn db-reset`    | Drops, re-creates, and migrates the database (useful for fresh setups). |
| `yarn db-seed`     | Runs the seed script to populate initial data in the database.          |

---

### 🌱 Seed Script Configuration

Your seeding setup is defined in `package.json`:

```json
"prisma": {
  "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
}
```

This means running:

```bash
yarn db-seed
```

Will execute the file:

```
prisma/seed.ts
```

> 💡 **Tip:** Make sure you've installed `ts-node` if you're running seeds written in TypeScript:
>
> ```bash
> yarn add -D ts-node
> ```

---

### 🐳 Docker Setup For database setup

This project includes a `docker-compose.yaml` file in the `prisma/` directory for spinning up a local **PostgreSQL** database quickly.

#### 🔧 How to start the DB:

```bash
cd prisma
docker-compose up -d
```

> This will launch a local Postgres container (usually on port `5432`). Make sure your `.env` file has a matching `DATABASE_URL`.

#### 🧹 How to stop and remove the container:

```bash
docker-compose down
```

#### ✅ Example `DATABASE_URL` for `.env`

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/postgres
```

---

### 🌿 Branching Strategy

To maintain consistency and clarity in version control, follow this branching strategy:

- For features:

```
    feature/<feature_name>
```

- For issues:
  ```
  issue/<issue_number>
  ```

#### ✅ Example Workflow

1. Create a branch:

   ```bash
   git checkout -b feature/user-authentication
   ```

2. Add and commit your changes:

   ```bash
   git add .
   git commit -m "Initial commit for user authentication feature"
   ```

3. Push the branch:

   ```bash
   git push origin calandly/feature/user-authentication
   ```

4. Create a pull request (PR) and request a review.

> 📌 This strategy helps organize contributions by context (feature vs issue) and makes PRs easier to review and manage.
