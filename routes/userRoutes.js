import express from "express";
import {registerUser,login,updateUser,deleteUser, getUser } from "../controllers/user.js";
import {  validateToken} from "../config/token.js";

const router = express.Router();


router.post("/register", registerUser );
router.post("/login", login );
router.put("/update/:id", validateToken,updateUser );
router.delete("/delete/:id",validateToken, deleteUser);
router.get("/get", validateToken, getUser);


export default router;
