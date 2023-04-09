import express from "express";
import { param } from "express-validator";
import multer from "multer";
import * as UserController from "../controllers/userController";
export const userRouter = express.Router();

// const storage = multer.diskStorage({
//   destination: function (req, res, cb) {
//     cb(null, "./public");
//   },
//   filename: function (req, res, cb) {
//     cb(null, Date.now() + res.originalname);
//   },
// });

const storage = multer.memoryStorage();

const fileFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

//allusers
userRouter.get("/", UserController.getAllUsers);

//get user data
userRouter.get("/user/:id", param("id").notEmpty(), UserController.getUser);

//update user info
userRouter.post(
  "/user/:id",
  upload.single("profileImage"),
  param("id").notEmpty(),
  UserController.updateUser,
);

userRouter.post(
  "/user/:id/changeProfileImage",
  upload.single("profileImage"),
  UserController.changeProfileImage,
);
userRouter.post("/user/:id", param("id").notEmpty(), UserController.updateUser);

userRouter.delete("/user/:id", UserController.deleteUser);
//delete multiple users
userRouter.delete("/", UserController.deleteUsers);
