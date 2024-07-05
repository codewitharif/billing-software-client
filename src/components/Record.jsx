import { Box, Grid, TextField, Autocomplete } from "@mui/material";
import axios from "axios";
import { MaterialReactTable } from "material-react-table";
import React, { useEffect, useMemo, useState } from "react";
import SideBar from "./Sidebar";

const Record = () => {
  const [data, setData] = useState([]);
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // Fetch data from API using Axios
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/items");
        setData(response.data.reverse());
        setFilteredData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Fetch clients for client selection
    const fetchClients = async () => {
      try {
        const response = await axios.get("http://localhost:3000/clients");
        setClients(response.data);
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };
    fetchClients();
  }, []);

  const handleClientChange = (event, newValue) => {
    setSelectedClient(newValue);

    // Filter data based on selected client
    if (!newValue) {
      setFilteredData(data); // If no client selected, show all data
    } else {
      const filtered = data.filter((item) => item.client === newValue._id);
      setFilteredData(filtered); // Filter data based on selected client
    }
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "itemcode",
        header: "Item Code",
      },
      {
        accessorKey: "itemname",
        header: "Item Name",
      },
      {
        accessorKey: "mrp",
        header: "MRP",
      },
      {
        accessorKey: "disc",
        header: "Discount (%)",
      },
      {
        accessorKey: "discrs",
        header: "Discount (Rs)",
      },
      {
        accessorKey: "rate",
        header: "Rate",
      },
      {
        accessorKey: "qty",
        header: "Quantity",
      },
      {
        accessorKey: "total",
        header: "Total",
      },
    ],
    []
  );

  return (
    <Box sx={{ display: "flex" }}>
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
        <div className="container" style={{ marginTop: "50px" }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Autocomplete
                options={clients}
                getOptionLabel={(option) => option.name || ""}
                value={selectedClient}
                onChange={handleClientChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Client"
                    variant="outlined"
                    fullWidth
                  />
                )}
              />
            </Grid>
          </Grid>
          <MaterialReactTable columns={columns} data={filteredData} />
        </div>
      </Box>
    </Box>
  );
};

export default Record;
