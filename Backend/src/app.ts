import AppDataSource from "./db";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import GlobalErrorHandler from "./middlewares/GlobalErrorHandler";
import routes from "./routes";
const app = express();

app.use(helmet());
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(routes);
app.use(GlobalErrorHandler);
const PORT = process.env.PORT ?? 3000;
app.listen(PORT, async () => {
    try {
        await AppDataSource.initialize();
        console.log("Database initialized.");
        console.log("Server listening on port " + PORT);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
});
