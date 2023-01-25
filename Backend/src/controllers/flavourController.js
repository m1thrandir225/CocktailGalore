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
exports.deleteFlavour = exports.updateFlavour = exports.createFlavour = exports.getFlavour = exports.allFlavours = void 0;
const db_server_1 = require("../utils/db.server");
const express_validator_1 = require("express-validator");
function allFlavours(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const flavours = yield db_server_1.db.flavour.findMany();
        if (!flavours) {
            return res.status(404).send({ message: "No flavours found" });
        }
        return res.status(200).json({
            flavours: flavours.map((flavour) => {
                return {
                    id: flavour.id,
                    name: flavour.name,
                };
            }),
        });
    });
}
exports.allFlavours = allFlavours;
function getFlavour(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.body;
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({ errors: errors.array() });
        }
        const flavour = yield db_server_1.db.flavour.findUnique({
            where: {
                id,
            },
            select: {
                id: true,
                name: true,
            },
        });
        if (!flavour) {
            return res.status(404).send({ message: "No flavour found" });
        }
        return res.status(200).send({
            flavour,
        });
    });
}
exports.getFlavour = getFlavour;
function createFlavour(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name } = req.body;
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({ errors: errors.array() });
        }
        const newFlavour = yield db_server_1.db.flavour.create({
            data: {
                name: name,
            },
        });
        if (!newFlavour) {
            return res.status(400).send({ message: "Error creating flavour" });
        }
        return res.status(200).send({
            message: "Flavour created successfully",
        });
    });
}
exports.createFlavour = createFlavour;
function updateFlavour(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id, name } = req.body;
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({ errors: errors.array() });
        }
        const flavour = yield db_server_1.db.flavour.update({
            where: {
                id,
            },
            data: {
                name,
            },
        });
        if (!flavour) {
            return res.status(400).send({ message: "Error updating flavour" });
        }
        return res.status(200).send({
            message: "Flavour updated successfully",
        });
    });
}
exports.updateFlavour = updateFlavour;
function deleteFlavour(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.body;
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({ errors: errors.array() });
        }
        const flavour = yield db_server_1.db.flavour.update({
            where: {
                id,
            },
            data: {
                cocktails: {
                    set: [],
                },
                likedBy: {
                    set: [],
                },
            },
        });
        if (!flavour) {
            return res.status(400).send({ message: "Error deleting flavour" });
        }
        const deletedFlavour = yield db_server_1.db.flavour.delete({
            where: {
                id,
            },
        });
        if (!deletedFlavour) {
            return res.status(400).send({ message: "Error deleting flavour" });
        }
        return res.status(200).send({
            message: "Flavour deleted successfully",
        });
    });
}
exports.deleteFlavour = deleteFlavour;
