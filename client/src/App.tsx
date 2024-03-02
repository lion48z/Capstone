import React from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { createTheme, ThemeProvider  } from "@mui/material/styles";
import CssBaseline from '@mui/material/CssBaseline';
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import { RootState } from './app/store'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
function App() {
  const isAuth = Boolean(useSelector((state: RootState) => state.auth));
  
  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/home"
              element={isAuth ? <HomePage  /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;


