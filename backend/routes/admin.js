import express from "express";
import {verifyToken} from "../middleware/auth.js";
import {
    register,
    scan,
    login,
    reset,
} from "../controllers/admin.js";

const router = express.Router();
router.post("/register", register);
router.post("/scan",verifyToken ,scan);
router.post("/login", login);
router.post("/reset", reset);
export default router;
