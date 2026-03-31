import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { globalErrorHandler } from "./middlewares/error.middleware.js";

import studentRoutes from "./routes/student.routes.js";
import markRoutes from "./routes/marks.routes.js";
const app = express();

app.use(helmet());
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use("/students", studentRoutes);
app.use("/marks", markRoutes);

app.get("/health", (req, res) => {
  return res.send("Health check - OK.");
});

app.use(globalErrorHandler);
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
