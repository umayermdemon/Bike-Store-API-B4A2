import express, { Application, Request, Response } from "express";
import cors from "cors";
import notFound from "./app/middlewares/notFound";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import router from "./app/routes";
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// application routes
app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello worlds!");
});

app.use(notFound);
app.use(globalErrorHandler);

export default app;
