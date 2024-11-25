import express from "express";
import {
  createPic,
  getPics,
  getPicsById,
  updatePic,
  deletePic, 
  deletePics
} from "../controllers/pictureController.js";
import upload from "../config/multer.js";
import { generateToken, validateToken} from "../config/token_gen.js";
const router = express.Router();

router.post("/upload", validateToken, upload.single("file"), createPic, (req, res) => {
  if (!req.files || req.files.length === 0) {

    return res.status(400).json({ error: "No files uploaded" });
  }
  res.json({ message: "Files uploaded successfully", files: req.files });
});
router.get("", validateToken, getPics);
router.get("/:id", validateToken, getPicsById);
router.put("/update/:id", validateToken, upload.single("file"), updatePic);
router.delete("/:id", validateToken, deletePic);
router.post("/deletePics", validateToken, deletePics);
router.post('/genToken', generateToken);



export default router;