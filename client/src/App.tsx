import React, { useMemo } from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ThemeOptions } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import { PaletteMode } from "@mui/material";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";

interface RootState {
  mode: PaletteMode;
  token: string | null;
}

function App() {
  const mode = useSelector((state: RootState) => state.mode);
  const theme = useMemo(() => {
    const themeSettingsOptions = themeSettings(mode); 
    const themeOptions: ThemeOptions = {
      palette: {
        ...themeSettingsOptions.palette,
        mode: themeSettingsOptions.palette.mode
      },
      typography: themeSettingsOptions.typography
    };
    return createTheme(themeOptions);
  }, [mode]);

  const isAuth = Boolean(useSelector((state: RootState) => state.token));

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;


