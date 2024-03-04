import React from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from '@mui/material/styles'
import Form from "./Form";

const LoginPage= () => {
  const { palette } = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  return (
    <Box>
      <Box
        width="100%"
        bgcolor={palette.primary.light}
        padding="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          Farmergram
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        padding="2rem"
        margin="2rem auto"
        borderRadius="1.5rem"
        bgcolor={palette.primary.main}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to Farmergram!
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;

