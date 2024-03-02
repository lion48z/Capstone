import React from "react";
import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "../pages/Navbar";
import UserWidget from "../widgets/UserWidget";
import MyPostWidget from "../widgets/MyPostWidget";
import PostsWidget from "../widgets/PostsWidget";
import FriendListWidget from "../widgets/FriendListWidget";
import { RootState } from '../app/store';

const HomePage: React.FC = () =>{
 
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");


  // Perform null check before accessing properties
 

  return (
    <>
    <Navbar />
<h1> I hate Typescript </h1>

</>
  );
};

export default HomePage;

