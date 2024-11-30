import express from "express";
import { fileURLToPath } from "url";
import path from "path";

import {
  createPic,
  getPics,
  getPicsById,
  updatePic,
  deletePic, 
  deletePics
} from "../controllers/pictureController.js";
import upload from "../config/multer.js";
import {  validateToken} from "../config/token.js";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


router.post("/upload", upload.single("file"), createPic, (req, res) => {
  if (!req.files || req.files.length === 0) {

    return res.status(400).json({ error: "No files uploaded" });
  }
  res.json({ message: "Files uploaded successfully", files: req.files });
});

router.get("", getPics,express.static(path.join(__dirname, "uploads")));
router.get("/:id", validateToken, getPicsById, express.static(path.join(__dirname, "uploads")));
router.put("/update/:id", validateToken, upload.single("file"), updatePic);
router.delete("/:id", validateToken, deletePic);
router.post("/deletePics", validateToken, deletePics);
 



export default router;