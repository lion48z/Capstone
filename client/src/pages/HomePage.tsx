import React from "react";
import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "../pages/Navbar";
import UserWidget from "../widgets/UserWidget";
import MyPostWidget from "../widgets/MyPostWidget";
import PostsWidget from "../widgets/PostsWidget";
import FriendListWidget from "../widgets/FriendListWidget";
import { RootState } from '../app/store'


const HomePage: React.FC = () =>{
  const { token } = useSelector((state:RootState) => state.token)
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state: RootState ) => state.user);
return (
  <>
  <h1>Farmergram Home Page</h1>
   {/* Display user's ID */}
   <p>User ID: {_id}</p>
   <UserWidget userId={_id} picturePath={picturePath} />
      {/* Display user's picture path */}
      <img src={picturePath} alt="User Profile Picture" />
  </>
  );
};

export default HomePage;
{/*<Box>
<Navbar />
<Box
  width="100%"
  padding="2rem 6%"
  display={isNonMobileScreens ? "flex" : "block"}
  gap="0.5rem"
  justifyContent="space-between"
>
  <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
    <UserWidget userId={_id} picturePath={picturePath} />
  </Box>
  <Box
    flexBasis={isNonMobileScreens ? "42%" : undefined}
    mt={isNonMobileScreens ? undefined : "2rem"}
  >
    <MyPostWidget picturePath={picturePath} />
    <PostsWidget userId={_id} />
  </Box>
  {isNonMobileScreens && (
    <Box flexBasis="26%">
      <Box m="2rem 0" />
      <FriendListWidget userId={_id} />
    </Box>
  )}
</Box>
  </Box>*/}