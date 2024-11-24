import express from "express";
import {random} from "../controllers/random.js"
const router = express.Router();



router.get("/img", random);

export default router;