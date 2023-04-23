import {useEffect} from "react";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes as appRoutes } from "./utilities/routes";
import theme from './utilities/theme';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { config } from "./utilities/config";

function App() {
  useEffect(() => {
    try{
      document.title = config.app.name || "App";
    } catch (error) {
      console.error(error);
    }
  }, []);
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box height="100vh" display="flex" flexDirection="column">
        <Router>
          <Navbar />
          <Routes>
            {appRoutes.map((route) => (
              <Route
                key={route.key}
                path={route.path}
                element={<route.component />}
              />
            ))}
          </Routes>
          <Footer />
        </Router>
      </Box>
    </ThemeProvider>
  );
}

export default App;