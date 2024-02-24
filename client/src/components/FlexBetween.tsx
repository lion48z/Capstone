import { Box, styled } from "@mui/material";
import { CSSObject } from "@mui/system";



interface Props {
    
  }

const FlexBetween = styled(Box)<Props>(({
}) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  }));
  
  export default FlexBetween;