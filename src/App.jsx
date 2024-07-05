import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import React, { useMemo, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Accounts from "./components/Accounts";
import Aside from "./components/Aside";
import Client from "./components/Client";
import Estimates from "./components/Estimates";
import Example from "./components/Example";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Payments from "./components/Payments";
import Record from "./components/Record";
import Reports from "./components/Reports";
import Settings from "./components/Settings";
import SideBar from "./components/Sidebar";
import Support from "./components/Support";
import Error404 from "./pages/Error404";
import Error500 from "./pages/Error500";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
          primary: {
            main: darkMode ? "#bb86fc" : "#FF76CE",
          },
        },
      }),
    [darkMode]
  );

  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/estimates" element={<Estimates />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/dashboard" element={<Aside />} />
            <Route path="/sidebar" element={<SideBar />} />
            <Route path="/invoice" element={<Example />} />
            <Route path="/client" element={<Client />} />
            <Route path="/home" element={<Home />} />
            <Route path="/support" element={<Support />} />
            <Route path="/record" element={<Record />} />
            <Route path="*" element={<Error404 />} />
            <Route path="/error500" element={<Error500 />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
