import { Box, styled } from "@mui/material";

interface FlexBetweenProps {}

const FlexBetween = styled(Box)<FlexBetweenProps>(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

export default FlexBetween;