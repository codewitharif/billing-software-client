import React, { useState } from "react";

import "../assets/css/style.css";
const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>

    </>
  );
};

export default Navbar;
