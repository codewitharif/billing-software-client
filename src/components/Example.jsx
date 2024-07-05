import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import easyinvoice from "easyinvoice";
import Cookies from "js-cookie";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import SideBar from "./Sidebar";

const Example = () => {
  const [validationErrors, setValidationErrors] = useState({});
  const [data, setData] = useState([]);
  const [addedProducts, setAddedProducts] = useState([]);
  const [invoiceBase64, setInvoiceBase64] = useState("");
  const [show, setShow] = useState(false);
  const [userName, setUserName] = useState("");
  const [clientDetails, setClientDetails] = useState({
    company: "",
    address: "",
    zip: "",
    city: "",
    country: "",
    email: "",
  });
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);

  useEffect(() => {
    userContact();
    fetchClients();
  }, []);

  const userContact = async () => {
    const token = Cookies.get("jwtoken");
    try {
      const res = await fetch("http://localhost:3000/profile", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: token,
        },
        credentials: "include",
      });

      const data = await res.json();
      if (data.status === 401) {
        setShow(false);
      } else {
        setUserName(data);
        setShow(true);
      }
    } catch (error) {
      setShow(false);
    }
  };

  const fetchClients = async () => {
    try {
      const token = Cookies.get("jwtoken");
      const response = await fetch("http://localhost:3000/clients", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: token,
        },
        credentials: "include",
      });

      if (response.ok) {
        const clientsData = await response.json();
        console.log(clientsData);
        setClients(clientsData);
      } else {
        console.error("Failed to fetch clients");
      }
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  const createInvoice = async () => {
    const data = getInvoiceData();
    const result = await easyinvoice.createInvoice(data);
    setInvoiceBase64(result.pdf);
  };

  const downloadInvoice = async () => {
    const data = getInvoiceData();
    const result = await easyinvoice.createInvoice(data);
    easyinvoice.download("myInvoice.pdf", result.pdf);
  };

  const sendInvoiceEmail = async () => {
    const invoiceData = getInvoiceData();

    try {
      const response = await fetch("http://localhost:3000/send-invoice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: selectedClient?.email, invoiceData }),
      });

      if (response.ok) {
        alert("Invoice sent successfully");
      } else {
        alert("Failed to send invoice");
      }
    } catch (error) {
      console.error("Error sending invoice email:", error);
      alert("Error sending invoice email");
    }
  };

  const renderInvoice = async () => {
    document.getElementById("pdf").innerHTML = "loading...";
    const data = getInvoiceData();
    const result = await easyinvoice.createInvoice(data);
    easyinvoice.render("pdf", result.pdf);
  };

  const getCurrentDate = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const getRandomNumber = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const getInvoiceData = () => {
    return {
      mode: "development",
      images: {
        logo: "https://public.easyinvoice.cloud/img/logo_en_original.png",
      },
      sender: {
        company: "Biznweb Technologies",
        address: "SKy Tower, Near Tajul Masjid",
        zip: "462001",
        city: "Bhopal",
        country: "India",
      },
      client: {
        ...clientDetails,
      },
      information: {
        number: getRandomNumber(),
        date: getCurrentDate(),
        "due-date": getCurrentDate(),
      },
      products: addedProducts.map((product) => ({
        quantity: product.qty,
        description: product.itemname,
        "tax-rate": 6,
        price: product.rate,
      })),
      "bottom-notice": "Kindly pay your invoice within 15 days.",
      settings: {
        currency: "USD",
      },
    };
  };

  const calculateFields = (rowData) => {
    const { mrp, qty, disc } = rowData;
    const rate = mrp * qty;
    const discrs = (mrp * qty * disc) / 100;
    const total = rate - discrs;
    return { rate, discrs, total };
  };

  const handleSaveNewRow = async (newRowData) => {
    if (!selectedClient) {
      alert("Please select a client before adding an item.");
      return;
    }

    try {
      const calculatedFields = calculateFields(newRowData.values);
      const response = await fetch("http://localhost:3000/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...newRowData.values,
          ...calculatedFields,
          clientId: selectedClient._id, // Include the client ID in the request
        }),
      });
      if (response.ok) {
        const newItem = await response.json();
        setData([...data, newItem]);
        setAddedProducts([...addedProducts, newItem]);
        alert("Item created successfully");
      } else {
        console.error("Failed to create item");
      }
    } catch (error) {
      console.error("Error creating item:", error);
    }
  };

  const handleSaveEditedRow = async (updatedRowData) => {
    if (!selectedClient) {
      alert("Please select a client before editing an item.");
      return;
    }

    try {
      const calculatedFields = calculateFields(updatedRowData.values);
      const response = await fetch(
        `http://localhost:3000/items/${updatedRowData.row.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...updatedRowData.values,
            ...calculatedFields,
            clientId: selectedClient._id, // Include the client ID in the request
          }),
        }
      );
      if (response.ok) {
        const updatedItem = await response.json();
        const newData = data.map((item) =>
          item._id === updatedItem._id ? updatedItem : item
        );
        const newAddedProducts = addedProducts.map((item) =>
          item._id === updatedItem._id ? updatedItem : item
        );
        setData(newData);
        setAddedProducts(newAddedProducts);
        alert("Item updated successfully");
      } else {
        console.error("Failed to update item");
      }
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const openDeleteConfirmModal = async (row, clientId) => {
    console.log("Row:", row);
    console.log("Row ID:", row.id);

    try {
      const response = await fetch(`http://localhost:3000/items/${row.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ clientId: clientId }), // Pass the clientId in the request body
      });

      if (response.ok) {
        setData(data.filter((item) => item._id !== row.id));
        setAddedProducts(addedProducts.filter((item) => item._id !== row.id));
        alert("Item deleted successfully");
      } else {
        console.error("Failed to delete item");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const clearAddedProducts = () => {
    setAddedProducts([]);
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "itemcode",
        header: "Item Code",
        enableEditing: true,
        size: 80,
      },
      {
        accessorKey: "itemname",
        header: "Item Name",
        enableEditing: true,
        size: 150,
      },
      {
        accessorKey: "mrp",
        header: "MRP",
        enableEditing: true,
        size: 80,
      },
      {
        accessorKey: "disc",
        header: "Discount (%)",
        enableEditing: true,
        size: 100,
      },
      {
        accessorKey: "discrs",
        header: "Discount (Rs)",
        enableEditing: true,
        size: 100,
      },
      {
        accessorKey: "rate",
        header: "Rate",
        enableEditing: true,
        size: 80,
      },
      {
        accessorKey: "qty",
        header: "Quantity",
        enableEditing: true,
        size: 80,
      },
      {
        accessorKey: "total",
        header: "Total",
        enableEditing: true,
        size: 80,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: addedProducts,
    createDisplayMode: "row",
    editDisplayMode: "row",
    enableEditing: true,
    getRowId: (row) => row._id,
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleSaveNewRow,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveEditedRow,
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton
            color="error"
            onClick={() => openDeleteConfirmModal(row, selectedClient._id)}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Tooltip title="Add">
        <IconButton onClick={() => table.setCreatingRow(true)}>
          <AddIcon />
        </IconButton>
      </Tooltip>
    ),
    state: {
      isLoading: false,
      isSaving: false,
      showAlertBanner: false,
      showProgressBars: false,
    },
  });

  const handleClientDetailChange = (e) => {
    const { name, value } = e.target;
    setClientDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleClientChange = (event, newValue) => {
    setSelectedClient(newValue);
    if (newValue) {
      // Update client details based on selected client
      setClientDetails({
        company: newValue.name,
        address: newValue.address,
        zip: newValue.zip,
        city: newValue.city,
        country: newValue.country,
        email: newValue.email,
      });
    } else {
      // Reset client details if no client is selected
      setClientDetails({
        company: "",
        address: "",
        zip: "",
        city: "",
        country: "",
        email: "",
      });
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
        <div className="container" style={{ marginTop: "50px" }}>
          <Box component="form" sx={{ mb: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Autocomplete
                  options={clients}
                  getOptionLabel={(option) => option.name}
                  value={selectedClient}
                  onChange={handleClientChange}
                  renderInput={(params) => (
                    <TextField {...params} label="Client Name" fullWidth />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <TextField
                  label="Address"
                  name="address"
                  value={clientDetails.address}
                  onChange={handleClientDetailChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <TextField
                  label="ZIP"
                  name="zip"
                  value={clientDetails.zip}
                  onChange={handleClientDetailChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <TextField
                  label="City"
                  name="city"
                  value={clientDetails.city}
                  onChange={handleClientDetailChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <TextField
                  label="Country"
                  name="country"
                  value={clientDetails.country}
                  onChange={handleClientDetailChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <TextField
                  label="Email"
                  name="email"
                  value={clientDetails.email}
                  onChange={handleClientDetailChange}
                  fullWidth
                />
              </Grid>
            </Grid>
          </Box>
        </div>
        <MaterialReactTable table={table} />
        <Button
          onClick={clearAddedProducts}
          variant="contained"
          color="secondary"
          style={{ marginTop: "20px" }}
        >
          Clear Table
        </Button>
        <Button
          onClick={downloadInvoice}
          variant="contained"
          color="primary"
          style={{ marginTop: "20px", marginLeft: "5px" }}
        >
          Print Invoice
        </Button>
        <Button
          onClick={sendInvoiceEmail}
          variant="contained"
          color="primary"
          style={{ marginTop: "20px", marginLeft: "5px" }}
        >
          Send Invoice
        </Button>
        <div id="pdf"></div>
      </Box>
    </Box>
  );
};

export default Example;
