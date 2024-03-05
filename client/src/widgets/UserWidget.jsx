import {
  ManageAccountsOutlined,  
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider } from "@mui/material";
import {useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserImage from "../components/UserImage";
import FlexBetween from "../components/FlexBetween";
import WidgetWrapper from "../components/WidgetWrapper";
import { useSelector } from "react-redux"; 


const UserWidget  = ({ userId, picturePath }) => {
  console.log("Picture path: ", picturePath);
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const dark = palette.primary.dark;
  const medium = palette.primary.light;
  const main = palette.primary.main;

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); 

  if (!user) {
    return null;
  }

  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends,
  } = user;

  return (
    <WidgetWrapper>
   
    <FlexBetween
      gap="0.5rem"
      pb="1.1rem"
      onClick={() => navigate(`/profile/${userId}`)}
    >
      <FlexBetween gap="1rem">
        <UserImage image={picturePath} />
        <Box>
          <Typography
            variant="h4"
            color={medium}
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.main,
                cursor: "pointer",
              },
            }}
          >
            {firstName} {lastName}
          </Typography>
          <Typography color={medium}>{friends.length} friends</Typography>
        </Box>
      </FlexBetween>
      <ManageAccountsOutlined />
    </FlexBetween>

    <Divider />

  
    <Box p="1rem 0">
      
      <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
        <LocationOnOutlined fontSize="large" sx={{ color: main }} />
        <Typography color={medium}>{location}</Typography>
      </Box>
      <Box display="flex" alignItems="center" gap="1rem">
        <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
        <Typography color={medium}>{occupation}</Typography>
      </Box>
    </Box>

    <Divider />

    
    <Box p="1rem 0">
      <FlexBetween mb="0.5rem">
        <Typography color={medium}>Who's viewed your profile</Typography>
        <Typography color={main} fontWeight="500">
          {viewedProfile}
        </Typography>
      </FlexBetween>
      <FlexBetween>
        <Typography color={medium}>Impressions of your post</Typography>
        <Typography color={main} fontWeight="500">
          {impressions}
        </Typography>
      </FlexBetween>
    </Box>

      <Divider />

      
    </WidgetWrapper>
  );
};

export default UserWidget;

