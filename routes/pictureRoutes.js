import express from "express";
import { createPic,getPics } from "../controllers/pictureController.js";
import  upload from '../config/multer.js'

const router = express.Router();

router.post("/upload", upload.single("file"),createPic, (req, res) => {
  if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
  }
  res.json({ message: 'File uploaded successfully', file: req.file });
});
router.get("", getPics);

export default router;

 