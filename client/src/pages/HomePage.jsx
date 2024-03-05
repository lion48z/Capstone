import React from "react";
import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import UserWidget from "../widgets/UserWidget";
import MyPostWidget from "../widgets/MyPostWidget";
import PostsWidget from "../widgets/PostsWidget";
import FriendListWidget from "../widgets/FriendListWidget";





const HomePage = () => {
  
  const { _id, picturePath } = useSelector((state) => state.user);

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        
        gap="0.5rem"
        justifyContent="space-between"
      >
        
          <UserWidget userId={_id} picturePath={picturePath} />
              
          <MyPostWidget picturePath={picturePath} />
          <PostsWidget userId={_id} />
           <FriendListWidget userId={_id} />
       
      </Box>
    </Box>
  );
};

export default HomePage;