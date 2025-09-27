import express from 'express';
import 'dotenv/config'
import { PrismaClient } from '@prisma/client';
import routeKatalog from './routes/routeKatalog.js';
import routeOrder from './routes/routeOrder.js';
import routeProfil from './routes/routeProfil.js';
import routeAdmin from './routes/routeAdmin.js';
import cors from 'cors';


const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

app.use("/api/v1",routeKatalog);
app.use("/api/v1",routeOrder);
app.use("/api/v1",routeProfil);
app.use("/api/v1",routeAdmin);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
