import { Router } from "express";
import { uploadFile, saveFileMeta ,getMyFiles ,downloadFile, toggleFileAccess, deleteFile, getPublicFileInfo, downloadPublicFile} from "../controllers/file.js";
import { auth } from "../middleware/auth.js";

const router = Router();


import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

router.post("/upload", auth, upload.single("file"), uploadFile);
router.post("/metadata", auth, saveFileMeta);
router.get("/my-files", auth, getMyFiles);
router.get("/download/:id", auth, downloadFile);
router.put("/toggle-access/:fileId", auth, toggleFileAccess);
router.delete("/delete/:fileId", auth, deleteFile);

// Public routes (no auth required)
router.get("/public/:fileId", getPublicFileInfo);
router.get("/public/download/:fileId", downloadPublicFile);



export default router;
