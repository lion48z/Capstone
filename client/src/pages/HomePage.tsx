import React from "react";
import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "../pages/Navbar";
import UserWidget from "../widgets/UserWidget";
import MyPostWidget from "../widgets/MyPostWidget";
import PostsWidget from "../widgets/PostsWidget";
import FriendListWidget from "../widgets/FriendListWidget";
import { RootState } from '../app/store';
import Friend from '../components/Friend';

const HomePage: React.FC = () =>{

  

  return (
    <Box>
    <Navbar />
  
    </Box >
  );
};

export default HomePage;

