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
exports.s3Delete = exports.s3Uplaod = void 0;
const aws_sdk_1 = require("aws-sdk");
const s3Uplaod = (file, keyPath, fileUUID) => __awaiter(void 0, void 0, void 0, function* () {
    const s3 = new aws_sdk_1.S3();
    const params = {
        Bucket: "galore-mobile-bucket",
        Key: `${keyPath}/${fileUUID}`,
        Body: file.buffer,
    };
    const result = s3.upload(params).promise();
    return result;
});
exports.s3Uplaod = s3Uplaod;
const s3Delete = (key, keyPath) => __awaiter(void 0, void 0, void 0, function* () {
    const s3 = new aws_sdk_1.S3();
    const params = {
        Bucket: "galore-mobile-bucket",
        Key: `${keyPath}/${key}`,
    };
    const result = s3.deleteObject(params).promise();
});
exports.s3Delete = s3Delete;
