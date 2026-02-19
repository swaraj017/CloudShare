import { Router } from "express"
import { UserRegister, UserLogin, getProfile } from "../controllers/user.js";
import { auth } from "../middleware/auth.js";

const router = Router();

router.post("/register", UserRegister);
router.post("/login", UserLogin);
router.get("/profile", auth, getProfile);

export default router;