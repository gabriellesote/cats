import express from "express";
import {registerUser,login,updateUser,deleteUser  } from "../controllers/user.js";

const router = express.Router();


router.post("/register", registerUser );
router.post("/login", login );
router.post("/update", updateUser  );
router.post("/delete", deleteUser);


export default router;
