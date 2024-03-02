import { Request, Response } from "express";
import User from "../models/user";


export const getUser = async (req: Request, res: Response) => {
  try {
    console.log("Received GET user request. User ID:", req.params.id);
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      console.log("User not found for ID:", id);
      return res.status(404).json({ error: 'User not found'});
    }
    console.log("Found user:", user);
    res.status(200).json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getUserFriends = async (req: Request, res: Response) => {
  try {
    console.log("Received GET user friends request. User ID:", req.params.id);
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      console.log("User not found for ID:", id);
      return res.status(404).json({ error: 'User not found'});
    }
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    console.log("Found user's friends:", friends);
    const formattedFriends = friends.map(
      (friend) => {
        if (!friend) return null; 
        return { 
          _id: friend._id,
          firstName: friend.firstName,
          lastName: friend.lastName,
          occupation: friend.occupation,
          location: friend.location,
          picturePath: friend.picturePath
        };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    console.error("Error fetching user friends:", err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/* UPDATE */
export const addRemoveFriend = async (req: Request, res: Response) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      if (!friend) {
        return res.status(404).json({ error: 'Friend not found' });
      }
    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
        (friend) => {
          if (!friend) return null; 
          return { 
            _id: friend._id,
            firstName: friend.firstName,
            lastName: friend.lastName,
            occupation: friend.occupation,
            location: friend.location,
            picturePath: friend.picturePath
          };
        }
      );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({error: 'Friend not found' });
  }
};