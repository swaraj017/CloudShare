import express from "express"
import { auth } from "../middleware/auth.js";
import { getmyApiKey, keyUsage, createApiKey } from "../controllers/apiKey.js";

const router=express.Router();

router.get("/",auth,getmyApiKey);
router.post("/create",auth,createApiKey);
router.get("/key-usage",auth,keyUsage);

export default router;


