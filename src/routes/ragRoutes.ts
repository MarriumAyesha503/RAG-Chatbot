import express from "express";
import multer from "multer";
import { RAGController } from "../controllers/ragController";
import { RAGService } from "../services/ragService";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

const ragService = new RAGService();
const ragController = new RAGController(ragService);

ragController.init();

// 📄 multiple PDF uploads
router.post(
  "/upload",
  upload.array("files"),
  ragController.uploadPDFs.bind(ragController)
);

// 💬 ask question
router.post("/ask", ragController.ask.bind(ragController));
export default router;