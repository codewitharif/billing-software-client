import React from "react";
import SideBar from "./Sidebar";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
const Estimates = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
        <div className="container mt-5">
          <h3>Estimates</h3>
          <div className="row">
            <div className="col-md-4">
              <div className="card bg-primary text-white text-center p-3">
                <blockquote className="blockquote mb-0">
                  <p>Weekly Sales</p>
                  <footer className="blockquote-footer text-white">
                    $15,000
                  </footer>
                </blockquote>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card bg-success text-white text-center p-3">
                <blockquote className="blockquote mb-0">
                  <p>Monthly Sales</p>
                  <footer className="blockquote-footer text-white">
                    $50,000
                  </footer>
                </blockquote>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card bg-info text-white text-center p-3">
                <blockquote className="blockquote mb-0">
                  <p>Visitors Online</p>
                  <footer className="blockquote-footer text-white">
                    10,234
                  </footer>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default Estimates;
