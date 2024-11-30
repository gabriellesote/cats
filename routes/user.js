import express from "express";
import {createUser} from "../controllers/registerUser.js"


const router = express.Router();


router.post("/create", createUser);




export default router;