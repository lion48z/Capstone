
import { Box, Typography, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import UserImage from "../components/UserImage";
import { useSelector } from "react-redux"; 
import { RootState } from '../app/store'

const UserWidget: React.FC = () => {
const  user  = useSelector((state: RootState) => state.auth);
  
  


  if (!user) {
    return null;
  }

 

  return (
    <Box>
    <UserImage image={picturePath || ''} />
    </Box>
         
  );
};

export default UserWidget;

