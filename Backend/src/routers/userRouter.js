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
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const multer_1 = __importDefault(require("multer"));
const UserController = __importStar(require("../controllers/userController"));
exports.userRouter = express_1.default.Router();
// const storage = multer.diskStorage({
//   destination: function (req, res, cb) {
//     cb(null, "./public");
//   },
//   filename: function (req, res, cb) {
//     cb(null, Date.now() + res.originalname);
//   },
// });
const storage = multer_1.default.memoryStorage();
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
const upload = (0, multer_1.default)({ storage: storage, fileFilter: fileFilter });
//get user data
exports.userRouter.get("/user/:id", (0, express_validator_1.param)("id").notEmpty(), UserController.getUser);
//update user info
exports.userRouter.post("/user/:id", upload.single("profileImage"), (0, express_validator_1.param)("id").notEmpty(), UserController.updateUser);
exports.userRouter.delete("/user/:id", UserController.deleteUser);
