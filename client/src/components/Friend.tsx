import { FC } from "react";
import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "../state/state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import { RootState } from "../app/store";


interface FriendProps {
  friendId: string;
  name: string;
  subtitle?: string;
  userPicturePath: string;
}

const Friend: FC<FriendProps> = ({ friendId, name, subtitle, userPicturePath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state: RootState) => state.user);
  const token = useSelector((state: RootState) => state.token);
  const friends = useSelector((state: RootState) => state.friend.friends);
 
  const { palette } = useTheme();
  //const { light: primaryLight, dark: primaryDark } = palette.text.primary;
  //const { main, medium } = palette.text.primary;

  const isFriend = friends.find((friend) => friend._id === friendId);

  const patchFriend = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <Typography
            color={palette.text.primary}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.text.primary,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={palette.text.secondary} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      <IconButton
        onClick={() => patchFriend()}
        sx={{ backgroundColor: palette.text.primary, p: "0.6rem" }}
      >
        {isFriend ? (
          <PersonRemoveOutlined sx={{ color:palette.text.disabled }} />
        ) : (
          <PersonAddOutlined sx={{ color: palette.text.disabled }} />
        )}
      </IconButton>
    </FlexBetween>
  );
};

export default Friend;
