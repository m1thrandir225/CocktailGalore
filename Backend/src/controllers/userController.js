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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUser = void 0;
const express_validator_1 = require("express-validator");
const uuid_1 = require("uuid");
const authService_1 = require("../utils/authService");
const db_server_1 = require("../utils/db.server");
const s3Service_1 = require("../utils/s3Service");
const s3Service_2 = require("./../utils/s3Service");
const multer_1 = __importDefault(require("multer"));
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage: storage, fileFilter: fileFilter }).single("profileImage");
function getUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = parseInt(req.params.id, 10);
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const user = yield db_server_1.db.user.findUnique({
            where: {
                id,
            },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                favouriteCocktails: true,
                likedFlavours: true,
                readInsights: true,
            },
        });
        if (!user) {
            return res.status(400).json({ errors: [{ msg: "User not found" }] });
        }
        return res.status(200).json({ user: user });
    });
}
exports.getUser = getUser;
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = parseInt(req.params.id, 10);
        const { firstName, lastName, email, oldPassword, newPassword, cocktailId, flavourIds, insightId, } = req.body;
        const profileImage = req.file;
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        if (firstName || lastName || email) {
            const updatedUser = yield db_server_1.db.user.update({
                where: {
                    id,
                },
                data: {
                    firstName,
                    lastName,
                    email,
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
            if (!updateUser) {
                return res.status(400).json({ errors: [{ msg: "User not found" }] });
            }
            return res.status(200).json({
                user: updatedUser,
            });
        }
        if (cocktailId != undefined) {
            const updatedUser = yield db_server_1.db.user.update({
                where: {
                    id,
                },
                data: {
                    favouriteCocktails: {
                        connect: {
                            id: cocktailId,
                        },
                    },
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
            if (!updatedUser) {
                return res.status(404).json({ errors: [{ msg: "User not found" }] });
            }
            return res.status(200).json({
                user: updatedUser,
            });
        }
        if (flavourIds) {
            const updatedUser = yield db_server_1.db.user.update({
                where: {
                    id,
                },
                data: {
                    likedFlavours: {
                        connect: flavourIds.map((flavourId) => ({ id: flavourId })),
                    },
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
            if (!updatedUser) {
                return res.status(400).json({ errors: [{ msg: "User not found" }] });
            }
            return res.status(200).json({ user: updatedUser });
        }
        if (insightId) {
            const updatedUser = yield db_server_1.db.user.update({
                where: {
                    id,
                },
                data: {
                    readInsights: {
                        connect: {
                            id: insightId,
                        },
                    },
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
            if (!updatedUser) {
                return res.status(400).json({ errors: [{ msg: "User not found" }] });
            }
            return res.status(200).json({ user: updateUser });
        }
        if (oldPassword && newPassword) {
            const user = yield db_server_1.db.user.findUnique({
                where: {
                    id,
                },
            });
            if (!user) {
                return res.status(400).json({ errors: [{ msg: "User not found" }] });
            }
            const isPasswordValid = yield (0, authService_1.verifyPassword)(oldPassword, user.password);
            if (isPasswordValid) {
                const newPasswordHash = yield (0, authService_1.hashPassword)(newPassword);
                const updatedUser = yield db_server_1.db.user.update({
                    where: {
                        id,
                    },
                    data: {
                        password: newPasswordHash,
                    },
                });
                if (!updateUser) {
                    return res
                        .status(400)
                        .json({ errors: [{ msg: "Something went wrong" }] });
                }
                return res.status(200).json({ message: "Password updated" });
            }
        }
        if (profileImage) {
            const user = yield db_server_1.db.user.findUnique({
                where: {
                    id,
                },
            });
            if ((user === null || user === void 0 ? void 0 : user.profileImage) !== null && (user === null || user === void 0 ? void 0 : user.profileImage) !== undefined) {
                try {
                    const deleteOldProfileImage = yield (0, s3Service_1.s3Delete)(user.profileImage, "userProfileImages");
                }
                catch (error) {
                    console.log(error);
                }
            }
            const newProfileImage = (0, uuid_1.v4)() + profileImage.originalname;
            try {
                const imgResult = yield (0, s3Service_2.s3Uplaod)(req.file, "userProfileImages", newProfileImage);
            }
            catch (error) {
                console.log(error);
            }
            const updatedUser = yield db_server_1.db.user.update({
                where: {
                    id,
                },
                data: {
                    profileImage: newProfileImage,
                },
            });
            if (!updatedUser) {
                return res.status(400).json({ errors: [{ msg: "User not found" }] });
            }
            return res.status(200).json({ user: updatedUser });
        }
    });
}
exports.updateUser = updateUser;
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = parseInt(req.params.id, 10);
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        //1. disconnect all records
        const userToDelete = yield db_server_1.db.user.update({
            where: {
                id,
            },
            data: {
                favouriteCocktails: {
                    set: [],
                },
                readInsights: {
                    set: [],
                },
                likedFlavours: {
                    set: [],
                },
            },
        });
        if (!userToDelete) {
            return res.status(400).json({ errors: [{ msg: "User not found" }] });
        }
        const deletedUser = yield db_server_1.db.user.delete({
            where: {
                id,
            },
        });
        if (!deletedUser) {
            return res.status(400).json({ errors: [{ msg: "User not found" }] });
        }
        return res.status(200).json({ msg: "User deleted" });
    });
}
exports.deleteUser = deleteUser;
