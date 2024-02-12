import { Request, Response } from "express";
import User from "../models/user";


/* READ */
export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ error: 'User not found'});
  }
};

export const getUserFriends = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
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
    res.status(404).json({ error: 'User not found'});
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