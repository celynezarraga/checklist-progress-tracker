import express, { Application, Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import { rateLimit } from "express-rate-limit";
import ErrorMiddleware from "./middleware/error";
import config from "./config";
import database from "./database";

const PORT = config.PORT || 3030;

const app: Application = express();

app.use(express.json());

// MIDDLEWARE
app.use(morgan("common"));
app.use(helmet());
app.use(rateLimit({
	windowMs: 10 * 60 * 1000, // 10 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: "draft-7",
	legacyHeaders: false,
  message: "Too many requests."
}));
app.use(ErrorMiddleware);


app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Hello world!!!"
  });
});

app.post("/", (req: Request, res: Response) => {
  res.json({
    message: "Hello World from post!!!",
    data: req.body
  });
});

// DB CONNECTION TEST
database.connect().then((client) => {
  return client.query("SELECT NOW()").then(res => {
    client.release();
    console.log(res.rows);
  }).catch(err => {
    client.release();
    console.log(err.stack);
  });
});

app.use((_req: Request, res: Response) => {
  res.status(404).json({
    message: "Error."
  });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server has started at port: ${PORT}`);
});

export default app;