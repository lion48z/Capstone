import { Request, Response } from "express";

import Post from "../models/post";
import User from "../models/user";



export const createPost = async (req: Request, res: Response) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user!.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();

    const posts = await Post.find();
    res.status(201).json(posts);
  } catch (err) {
    res.status(409).json({ error: 'Failed to fetch post' });
  }
};

export const getFeedPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ error: 'Failed to fetch post ' });
  }
};

export const getUserPosts = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ userId });
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ error: 'Failed to fetch post' });
  }
};


export const likePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }

    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post!.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(404).json({error: 'Failed to update' });
  }
};
