"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const AuthController = __importStar(require("../controllers/authController"));
const authRouter = express_1.default.Router();
authRouter.post("/login", (0, express_validator_1.body)("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Email is invalid")
    .notEmpty()
    .withMessage("Email is required"), (0, express_validator_1.body)("password")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters long")
    .notEmpty()
    .withMessage("Password is required"), AuthController.login);
authRouter.post("/logout", (0, express_validator_1.body)("id").notEmpty().isNumeric(), AuthController.logout);
authRouter.post("/register", (0, express_validator_1.body)(["firstName", "lastName", "email", "password"]).notEmpty(), (0, express_validator_1.body)("email").isEmail().notEmpty().normalizeEmail(), (0, express_validator_1.body)("password").isLength({ min: 5 }).notEmpty(), AuthController.register);
authRouter.post("/refresh_token", (0, express_validator_1.body)("id").notEmpty().isNumeric(), (0, express_validator_1.body)("refreshToken").notEmpty(), AuthController.refreshToken);
exports.default = authRouter;
