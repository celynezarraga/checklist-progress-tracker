import express, { Application } from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import { rateLimit } from "express-rate-limit";
import errorMiddleware from "./middleware/error";
import config from "./config";
import database from "./database";
import routes from "./routes";

const PORT = config.PORT || 3030;

const app: Application = express();

app.use(express.json());
app.use(cors({
  origin: "*",
  methods: "*",
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));
app.use(morgan("common"));
app.use(helmet());
app.use(rateLimit({
	windowMs: 10 * 60 * 1000, // 10 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: "draft-7", 
	legacyHeaders: false,
  message: "Too many requests."
}));
app.use(errorMiddleware);

// test db
database.connect().then((client) => {
  return client.query("SELECT NOW()").then(() => {
    client.release();
  }).catch(err => {
    client.release();
    // eslint-disable-next-line no-console
    console.log(err.stack);
  });
});

app.use("/api", routes);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server has started at port: ${PORT}`);
});

export default app;