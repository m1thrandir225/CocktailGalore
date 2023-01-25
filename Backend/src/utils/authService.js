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
exports.verifyPassword = exports.hashPassword = exports.generateRefreshToken = exports.generateAccessToken = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt = __importStar(require("jsonwebtoken"));
function generateAccessToken(data) {
    return jwt.sign(data, process.env.JWT_ACCESS_SECRET, {
        expiresIn: "15m",
    });
}
exports.generateAccessToken = generateAccessToken;
function generateRefreshToken(data) {
    return jwt.sign(data, process.env.JWT_REFRESH_SECRET, {
        expiresIn: "60d",
    });
}
exports.generateRefreshToken = generateRefreshToken;
function hashPassword(password) {
    return bcrypt_1.default.hash(password, 10);
}
exports.hashPassword = hashPassword;
function verifyPassword(password, hash) {
    return bcrypt_1.default.compare(password, hash);
}
exports.verifyPassword = verifyPassword;
