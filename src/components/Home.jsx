import React, { useEffect, useState } from "react";
import SideBar from "./Sidebar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import axios from "axios";

const Home = () => {
  const [sales, setSales] = useState([]);
  const [totalSalesSum, setTotalSalesSum] = useState(0); // State to hold total sales sum
  const [weeklySalesSum, setWeeklySalesSum] = useState(0); // State to hold weekly sales sum
  const [monthlySalesSum, setMonthlySalesSum] = useState(0); // State to hold monthly sales sum

  useEffect(() => {
    fetchSalesData();
    fetchTotalSalesSum();
    fetchWeeklySalesSum();
    fetchMonthlySalesSum();
  }, []);

  const fetchSalesData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/inventory/sold-yesterday"
      );
      setSales(response.data);
    } catch (error) {
      console.error("Error fetching sales data:", error);
    }
  };

  const fetchTotalSalesSum = async () => {
    try {
      const response = await axios.get("http://localhost:3000/total-sum");
      setTotalSalesSum(response.data.totalSum);
    } catch (error) {
      console.error("Error fetching total sales sum:", error);
    }
  };

  const fetchWeeklySalesSum = async () => {
    // Implement fetching weekly sales sum
    // Replace with actual API endpoint and logic
    // Example:
    // try {
    //   const response = await axios.get("http://localhost:3000/weekly-sum");
    //   setWeeklySalesSum(response.data.weeklySum);
    // } catch (error) {
    //   console.error("Error fetching weekly sales sum:", error);
    // }
    // For demonstration purposes, setting it to total sales sum
    setWeeklySalesSum(totalSalesSum);
  };

  const fetchMonthlySalesSum = async () => {
    // Implement fetching monthly sales sum
    // Replace with actual API endpoint and logic
    // Example:
    // try {
    //   const response = await axios.get("http://localhost:3000/monthly-sum");
    //   setMonthlySalesSum(response.data.monthlySum);
    // } catch (error) {
    //   console.error("Error fetching monthly sales sum:", error);
    // }
    // For demonstration purposes, setting it to total sales sum
    setMonthlySalesSum(totalSalesSum);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
        <div className="container" style={{ marginTop: "50px" }}>
          <h1>Dashboard</h1>
          <br />
          <br />

          <Grid container spacing={2} sx={{ marginBottom: "20px" }}>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" gutterBottom align="center">
                Total Sales
              </Typography>
              <Box
                sx={{
                  backgroundColor: "red",
                  padding: "20px",
                  borderRadius: "5px",
                }}
              >
                <Typography variant="h5" align="center">
                  {totalSalesSum}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" gutterBottom align="center">
                Weekly Sales
              </Typography>
              <Box
                sx={{
                  backgroundColor: "lightgreen",
                  padding: "20px",
                  borderRadius: "5px",
                }}
              >
                <Typography variant="h5" align="center">
                  {weeklySalesSum}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" gutterBottom align="center">
                Monthly Sales
              </Typography>
              <Box
                sx={{
                  backgroundColor: "cyan",
                  padding: "20px",
                  borderRadius: "5px",
                }}
              >
                <Typography variant="h5" align="center">
                  {monthlySalesSum}
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <Typography variant="h6" gutterBottom>
            Recent Sales
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Item Code</TableCell>
                  <TableCell>Item Name</TableCell>
                  <TableCell>MRP</TableCell>
                  <TableCell>Discount</TableCell>
                  <TableCell>Discount (Rs)</TableCell>
                  <TableCell>Rate</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Client</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sales.map((sale) => (
                  <TableRow key={sale._id}>
                    <TableCell>{sale.itemcode}</TableCell>
                    <TableCell>{sale.itemname}</TableCell>
                    <TableCell>{sale.mrp}</TableCell>
                    <TableCell>{sale.disc}</TableCell>
                    <TableCell>{sale.discrs}</TableCell>
                    <TableCell>{sale.rate}</TableCell>
                    <TableCell>{sale.qty}</TableCell>
                    <TableCell>{sale.total}</TableCell>
                    <TableCell>{sale.client.name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Box>
    </Box>
  );
};

export default Home;
