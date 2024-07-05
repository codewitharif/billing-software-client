import React from "react";
import SideBar from "./Sidebar";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

const Accounts = () => {
  const accounts = [
    { id: 1, name: "John Doe", email: "john@example.com", balance: "$1000" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", balance: "$1500" },
    {
      id: 3,
      name: "Alice Johnson",
      email: "alice@example.com",
      balance: "$2000",
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
        <div className="container" style={{ marginTop: "50px" }}>
          <h3>Accounts</h3>
          <hr />
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Balance</th>
                </tr>
              </thead>
              <tbody>
                {accounts.map((account) => (
                  <tr key={account.id}>
                    <td>{account.id}</td>
                    <td>{account.name}</td>
                    <td>{account.email}</td>
                    <td>{account.balance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default Accounts;
