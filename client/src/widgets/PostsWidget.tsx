import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts, Post } from "../state/state";
import PostWidget from "./PostWidget";
import { RootState } from '../app/store';

interface PostsWidgetProps {
  userId: string;
  isProfile?: boolean;
 
  
}

const PostsWidget: React.FC<PostsWidgetProps> = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state: RootState) => state.auth);
  const { token, user } = useSelector((state: RootState) => state.auth);

  const getPosts = async () => {
    const response = await fetch("http://localhost:3001/posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data: Post[] = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  const getUserPosts = async () => {
    const response = await fetch(
      `http://localhost:3001/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data: Post[] = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  const mapToRecord = (likes: Map<string, boolean> | undefined): Record<string, boolean> => {
    if (!likes) return {};
    const obj: Record<string, boolean> = {};
    likes.forEach((value, key) => {
      obj[key] = value;
    });
    return obj;
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, [isProfile, userId, token]); // Include dependencies in the dependency array

  return (
    <>
      {posts.map(
        ({
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <PostWidget
            key={userId}
            postId={userId}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            //likes={mapToRecord(likes)}
            comments={comments}
          />
        )
      )}
    </>
  );
};

export default PostsWidget;

