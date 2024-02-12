import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
} from "../controllers/users.js";
import authenticateToken  from "../middleware/authenticateToken";

const router = express.Router();

/* READ */
router.get("/:id", authenticateToken, getUser);
router.get("/:id/friends", authenticateToken, getUserFriends);

/* UPDATE */
router.patch("/:id/:friendId", authenticateToken, addRemoveFriend);

export default router;