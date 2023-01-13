import express from "express";
import * as InsightsController from "../controllers/insightsController";

const insightRouter = express.Router();

//all insights
insightRouter.get("/", InsightsController.getInsights);
//insight by id
insightRouter.get("/insight/:id/", InsightsController.getInsight);
//insight by author id
insightRouter.get("/author/:id/", InsightsController.getInsightsByAuthor);

export default insightRouter;
