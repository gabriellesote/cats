import express from "express";
import {
  createPic,
  getPics,
  getPicsById,
  updatePic,
  deletePic
} from "../controllers/pictureController.js";
import upload from "../config/multer.js";

const router = express.Router();

router.post("/upload", upload.single("file"), createPic, (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  res.json({ message: "File uploaded successfully", file: req.file });
});

router.get("", getPics);
router.get("/:id", getPicsById)
router.put("/update/:id", upload.single("file"), updatePic);
router.delete("/:id", deletePic);
 

export default router;
