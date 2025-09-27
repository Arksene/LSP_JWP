# Express + Prisma Setup

This project is a basic Express.js server integrated with Prisma ORM.

## Getting Started

1. Install dependencies:
   ```powershell
   npm install
   ```
2. Initialize Prisma:
   ```powershell
   npx prisma init
   ```
3. Set your database connection string in `prisma/.env`.
4. Create your Prisma models in `prisma/schema.prisma`.
5. Generate Prisma client:
   ```powershell
   npx prisma generate
   ```
6. Run migrations:
   ```powershell
   npx prisma migrate dev --name init
   ```
7. Start the server:
   ```powershell
   npm run dev
   ```

## Scripts
- `npm run dev`: Start server in development mode
- `npm start`: Start server in production mode

## Folder Structure
- `/prisma`: Prisma schema and migrations
- `/src`: Express server code

## Example Model
Edit `prisma/schema.prisma` to define your models.

## Documentation
- [Express.js](https://expressjs.com/)
- [Prisma](https://www.prisma.io/docs/)
