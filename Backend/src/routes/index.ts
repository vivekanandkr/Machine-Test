import express from "express";
import StudentRoute from "./student-route";
import StudentMarksRoutes from "./studentMarks-route";

const Router = express.Router();

Router.use("/students", StudentRoute);
Router.use("/marks", StudentMarksRoutes);
export default Router;
