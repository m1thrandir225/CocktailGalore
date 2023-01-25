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
exports.getCocktailsByCategory = exports.getCocktail = exports.getCategories = exports.getCocktails = void 0;
const db_server_1 = require("../utils/db.server");
const getCocktails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cocktails = yield db_server_1.db.cocktail.findMany({
        select: {
            updatedAt: false,
            createdAt: false,
        },
    });
    if (!cocktails) {
        return res.status(404).json({ message: "Cocktails not found" });
    }
    return res.status(200).json({
        cocktails: cocktails,
    });
});
exports.getCocktails = getCocktails;
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield db_server_1.db.cocktailCategory.findMany();
    if (!categories) {
        return res.status(404).json({ message: "Categories not found" });
    }
    return res.status(200).json({
        categories: categories,
    });
});
exports.getCategories = getCategories;
const getCocktail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    const cocktail = yield db_server_1.db.cocktail.findUnique({
        where: {
            id: id,
        },
    });
    if (!cocktail) {
        return res.status(404).json({ message: "Cocktail not found" });
    }
    return res.status(200).json({
        cocktail: cocktail,
    });
});
exports.getCocktail = getCocktail;
const getCocktailsByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = req.params.category;
    const cocktails = yield db_server_1.db.cocktail.findMany({
        where: {
            category: {
                every: {
                    name: {
                        equals: category,
                    },
                },
            },
        },
    });
    if (!cocktails) {
        return res.status(404).json({ message: "Cocktails not found" });
    }
    return res.status(200).json({
        cocktails: cocktails,
    });
});
exports.getCocktailsByCategory = getCocktailsByCategory;
