import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "../pages/Navbar";
import FriendListWidget from "../widgets/FriendListWidget";
import MyPostWidget from "../widgets/MyPostWidget";
import PostsWidget from "../widgets/PostsWidget";
import UserWidget from "../widgets/UserWidget";
import { RootState } from "../app/store";
import { User } from '../state/state'



const ProfilePage: React.FC = () => {
  const [user, setUser] = useState< User | null>(null);
  const { userId } = useParams<{ userId: string }>();
  const { token } = useSelector((state: RootState) => state.auth);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const getUser = async () => {
    try {
      const response = await fetch(`http://localhost:3001/users/${userId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    getUser();
  }, [userId, token]);

  if (!user) {
    return null; 
  }

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget   />
          <Box m="2rem 0" />
        {/*  <FriendListWidget userId={user.userId} /> */}
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
         {/* <MyPostWidget picturePath={user.picturePath} />  */}
          <Box m="2rem 0" />
          <PostsWidget userId={user.userId} isProfile />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
