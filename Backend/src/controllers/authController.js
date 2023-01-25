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
exports.refreshToken = exports.register = exports.logout = exports.login = void 0;
const express_validator_1 = require("express-validator");
const authService_1 = require("../utils/authService");
const db_server_1 = require("../utils/db.server");
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        const { adminPanel } = req.query;
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }
        const user = yield db_server_1.db.user.findUnique({
            where: {
                email: email,
            },
        });
        if (!user) {
            return res.status(404).json({ message: "User not found, invalid email" });
        }
        const passwordMatch = yield (0, authService_1.verifyPassword)(password, user.password);
        if (!passwordMatch) {
            return res.status(404).json({ message: "Invalid password" });
        }
        if (adminPanel == "true") {
            if (user.userType !== "ADMIN") {
                return res
                    .status(403)
                    .json({ message: "You are not authorized to access this page" });
            }
            const accessToken = yield (0, authService_1.generateAccessToken)({ email: user.email });
            const loggedUser = yield db_server_1.db.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    requestToken: accessToken,
                },
                select: {
                    id: true,
                    email: true,
                    firstName: true,
                    lastName: true,
                    profileImage: true,
                    likedFlavours: true,
                    favouriteCocktails: true,
                    readInsights: true,
                    userType: true,
                },
            });
            return res.status(200).json({
                accessToken,
                user: loggedUser,
            });
        }
        const accessToken = yield (0, authService_1.generateAccessToken)({ email: user.email });
        const refreshToken = yield (0, authService_1.generateRefreshToken)({ email: user.email });
        const loggedUser = yield db_server_1.db.user.update({
            where: {
                id: user.id,
            },
            data: {
                requestToken: refreshToken,
            },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                profileImage: true,
                likedFlavours: true,
                favouriteCocktails: true,
                readInsights: true,
            },
        });
        res.status(200).json({
            accessToken,
            refreshToken,
            user: loggedUser,
        });
    });
}
exports.login = login;
function logout(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.body;
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }
        console.log(req.body);
        const user = yield db_server_1.db.user.findUnique({
            where: {
                id,
            },
        });
        if (!user) {
            return res
                .status(404)
                .json({ message: "The user you are trying to logout, is not found." });
        }
        const loggedOutUser = yield db_server_1.db.user.update({
            where: {
                id: user.id,
            },
            data: {
                requestToken: null,
            },
        });
        return res.status(200).json({ message: "User logged out" });
    });
}
exports.logout = logout;
function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { firstName, lastName, email, password } = req.body;
        const hashedPassword = yield (0, authService_1.hashPassword)(password);
        const newUser = yield db_server_1.db.user.create({
            data: {
                email,
                firstName,
                lastName,
                password: hashedPassword,
            },
        });
        if (!newUser) {
            return res.status(500).json({ message: "Something went wrong" });
        }
        const accessToken = yield (0, authService_1.generateAccessToken)({ email: newUser.email });
        const refreshToken = yield (0, authService_1.generateRefreshToken)({ email: newUser.email });
        const loggedUser = yield db_server_1.db.user.update({
            where: {
                id: newUser.id,
            },
            data: {
                requestToken: refreshToken,
            },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                profileImage: true,
                favouriteCocktails: true,
                likedFlavours: true,
                readInsights: true,
            },
        });
        if (!loggedUser) {
            return res.status(500).json({ message: "Something went wrong" });
        }
        return res.status(200).json({
            accessToken,
            refreshToken,
            user: loggedUser,
        });
    });
}
exports.register = register;
function refreshToken(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id, refreshToken } = req.body;
        const user = yield db_server_1.db.user.findUnique({
            where: {
                id,
            },
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (refreshToken != user.requestToken) {
            return res.status(400).json({ message: "Invalid refresh token" });
        }
        const accessToken = yield (0, authService_1.generateAccessToken)({ email: user.email });
        return res.status(200).json({ accessToken });
    });
}
exports.refreshToken = refreshToken;
