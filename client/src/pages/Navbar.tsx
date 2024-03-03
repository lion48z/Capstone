import React, { useState } from 'react';
import {
  Box,
 MenuItem,
  Typography,
 
} from '@mui/material';

import { useDispatch } from 'react-redux';
import { setLogout } from '../state/state';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(setLogout());
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          onClick={() => navigate('/home')}
          sx={{
            '&:hover': {
              cursor: 'pointer',
            },
          }}
        >
          Farmergram
        </Typography>
        <MenuItem onClick={handleLogout}>Log Out</MenuItem>
      </Box>
        </Box>
     
  );
};

export default Navbar;



