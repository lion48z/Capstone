import express from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
import  authenticateToken  from "../middleware/authenticateToken";

const router = express.Router();

/* READ */
router.get("/", authenticateToken, getFeedPosts);
router.get("/:userId/posts", authenticateToken, getUserPosts);

/* UPDATE */
router.patch("/:id/like", authenticateToken, likePost);

export default router;