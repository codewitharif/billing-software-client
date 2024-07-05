import React, { useState, useEffect } from "react";
import SideBar from "./Sidebar";
import {
  Box,
  Grid,
  TextField,
  Button,
  MenuItem,
  Typography,
  TableContainer,
  Paper,
} from "@mui/material";
import axios from "axios";
import { MaterialReactTable } from "material-react-table";

const Payments = () => {
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");
  const [payments, setPayments] = useState([]);
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");

  useEffect(() => {
    fetchPayments();
    fetchClients();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await axios.get("http://localhost:3000/allPayments");
      const data = response.data;
      setPayments(data);
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
  };

  const fetchClients = async () => {
    try {
      const response = await axios.get("http://localhost:3000/clients");
      setClients(response.data);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  const handleMakePayment = async () => {
    try {
      const response = await axios.post("http://localhost:3000/addPayments", {
        invoiceNumber,
        amount,
        status,
        date,
        clientId: selectedClient,
      });
      setPayments([...payments, response.data]);
      alert("Added payment");
      // Clear form fields after successful payment
      setInvoiceNumber("");
      setAmount("");
      setStatus("");
      setDate("");
      setSelectedClient("");
    } catch (error) {
      console.error("Error making payment:", error);
    }
  };

  const handleStatusChange = async (paymentId, newStatus) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/updatePaymentStatus/${paymentId}`,
        {
          status: newStatus,
        }
      );
      const updatedPayment = response.data;
      setPayments(
        payments.map((payment) =>
          payment._id === updatedPayment._id ? updatedPayment : payment
        )
      );
      alert("Status updated successfully");
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const columns = [
    {
      header: "Invoice Number",
      accessorKey: "invoiceNumber",
    },
    {
      header: "Amount",
      accessorKey: "amount",
    },
    {
      header: "Status",
      accessorKey: "status",
      Cell: ({ cell }) => {
        const paymentId = cell.row.original._id;
        return (
          <TextField
            select
            value={cell.getValue()}
            onChange={(e) => handleStatusChange(paymentId, e.target.value)}
          >
            <MenuItem value="paid">Paid</MenuItem>
            <MenuItem value="due">Due</MenuItem>
          </TextField>
        );
      },
    },
    {
      header: "Date",
      accessorKey: "date",
      Cell: ({ cell }) => new Date(cell.getValue()).toLocaleDateString(),
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
        <Typography variant="h4" gutterBottom>
          Payments
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Invoice Number"
              value={invoiceNumber}
              onChange={(e) => setInvoiceNumber(e.target.value)}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              select
              fullWidth
              label="Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              margin="normal"
            >
              <MenuItem value="paid">Paid</MenuItem>
              <MenuItem value="due">Due</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              type="date"
              label="Date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              select
              fullWidth
              label="Select Client"
              value={selectedClient}
              onChange={(e) => setSelectedClient(e.target.value)}
              margin="normal"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {clients.map((client) => (
                <MenuItem key={client._id} value={client._id}>
                  {client.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleMakePayment}
              sx={{ mt: 2 }}
            >
              Add Payment
            </Button>
          </Grid>
        </Grid>
        <Box mt={4}>
          <Typography variant="h6" gutterBottom>
            Payment Records
          </Typography>
          <TableContainer component={Paper}>
            <MaterialReactTable columns={columns} data={payments} />
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default Payments;
