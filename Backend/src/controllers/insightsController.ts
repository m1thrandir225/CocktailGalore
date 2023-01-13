import type { Request, Response } from "express";
import { db } from "../utils/db.server";

export const getInsights = async (req: Request, res: Response) => {
  const insights = await db.insight.findMany({
    select: {
      readBy: false,
      createdAt: true,
      updatedAt: false,
    },
  });
  if (!insights) {
    return res.status(404).json({ message: "Insights not found" });
  }
  return res.status(200).json({
    insights: insights,
  });
};

export const getInsight = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string, 10);
  const insight = await db.insight.findUnique({
    where: {
      id: id,
    },
  });
  if (!insight) {
    return res.status(404).json({ message: "Insight not found" });
  }
  return res.status(200).json({
    insight: insight,
  });
};

export const getInsightsByAuthor = async (req: Request, res: Response) => {
  const authorId = parseInt(req.params.author as string, 10);
  const insights = await db.insight.findMany({
    where: {
      authorId: {
        equals: authorId,
      },
    },
  });
  if (!insights) {
    return res.status(404).json({ message: "Insights not found" });
  }
  return res.status(200).json({
    insights: insights,
  });
};
