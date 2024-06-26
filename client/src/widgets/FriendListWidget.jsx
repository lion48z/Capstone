import { Box, Typography } from "@mui/material"; 
import { useTheme } from '@mui/material/styles'
import Friend from '../components/Friend';
import WidgetWrapper from "../components/WidgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "../state/state";


const FriendListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);    //use redux to store token, user etc.
  const friends = useSelector((state) => state.user.friends);

  const getFriends = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${userId}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  useEffect(() => {
    getFriends();
  }, []); 

  return (
    <WidgetWrapper>
      <Typography
        color={palette.primary.light}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
      {friends.map((friend, index) => (
        <Friend
          key={`${friend._id}_${index}`} // Concatenate with index for uniqueness
          friendId={friend._id}
          name={`${friend.firstName} ${friend.lastName}`}
          subtitle={friend.occupation}
          userPicturePath={friend.picturePath}
        />
      ))}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;