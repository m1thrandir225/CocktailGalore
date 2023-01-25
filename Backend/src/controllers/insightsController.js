"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInsightsByAuthor = exports.getInsight = exports.getInsights = void 0;
const db_server_1 = require("../utils/db.server");
const getInsights = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const insights = yield db_server_1.db.insight.findMany({
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
});
exports.getInsights = getInsights;
const getInsight = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    const insight = yield db_server_1.db.insight.findUnique({
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
});
exports.getInsight = getInsight;
const getInsightsByAuthor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authorId = parseInt(req.params.author, 10);
    const insights = yield db_server_1.db.insight.findMany({
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
});
exports.getInsightsByAuthor = getInsightsByAuthor;
