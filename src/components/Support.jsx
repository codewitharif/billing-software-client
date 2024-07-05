import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import axios from "axios";
import React, { useState } from "react";
import SideBar from "./Sidebar"; // Ensure this path is correct

const Support = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/contacts",
        formData
      );
      console.log(response.data);
      alert("Message sent successfully");
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("There was an error submitting the form!", error);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
        <div className="container" style={{ marginTop: "50px" }}>
          <Typography variant="h4" gutterBottom>
            Help & Support
          </Typography>
          <hr />
          <div className="accordion" id="accordionExample">
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>How to create a new invoice?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  To create a new invoice, navigate to the "Invoices" section in
                  the dashboard. Click on the "New Invoice" button, fill in the
                  required details such as customer information, items,
                  quantities, and prices. Finally, click on the "Save" button to
                  generate the invoice.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography>How to manage recurring invoices?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Recurring invoices can be managed in the "Recurring Invoices"
                  section. Here, you can create new recurring invoices, edit
                  existing ones, or delete them as needed.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3a-content"
                id="panel3a-header"
              >
                <Typography>How to process payments?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  To process payments, go to the "Payments" section and select
                  the invoice for which you want to record a payment. Enter the
                  payment details including the amount, date, and payment
                  method, then click on the "Save" button to record the payment.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel4a-content"
                id="panel4a-header"
              >
                <Typography>How to apply discounts to an invoice?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Discounts can be applied to an invoice during the creation or
                  editing process. In the invoice form, there is usually a field
                  labeled "Discount" or "Discount Percentage" where you can
                  enter the discount amount or percentage. Once applied, the
                  invoice total will reflect the discounted amount.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel5a-content"
                id="panel5a-header"
              >
                <Typography>
                  How to generate reports for financial analysis?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Financial reports can be generated in the "Reports" or
                  "Analytics" section of the billing software. These reports
                  typically include information such as sales summaries, revenue
                  trends, outstanding balances, and expense breakdowns, which
                  can be useful for financial analysis and decision-making.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel6a-content"
                id="panel6a-header"
              >
                <Typography>How to handle refunds for customers?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Refunds can be processed through the "Refunds" or
                  "Transactions" section. Locate the transaction associated with
                  the customer's payment and select the option to issue a
                  refund. Enter the refund amount and reason, then confirm the
                  refund to complete the process.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel7a-content"
                id="panel7a-header"
              >
                <Typography>
                  How to set up automatic payment reminders?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Automatic payment reminders can be configured in the software
                  settings or preferences. Look for an option related to
                  "Payment Reminders" or "Notifications" and specify the timing
                  and frequency of reminders to be sent to customers with
                  outstanding invoices.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} sx={{ marginTop: "20px" }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Name"
                  name="name"
                  variant="outlined"
                  fullWidth
                  value={formData.name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email"
                  name="email"
                  variant="outlined"
                  fullWidth
                  value={formData.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Message"
                  name="message"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Box>
    </Box>
  );
};

export default Support;
