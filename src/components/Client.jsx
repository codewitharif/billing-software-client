import { styled, useTheme } from "@mui/material/styles";
import SideBar from "./Sidebar";
import React, { useMemo, useState, useEffect } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

const Client = () => {
  const [validationErrors, setValidationErrors] = useState({});
  const [data, setData] = useState([]);
  const [invoiceBase64, setInvoiceBase64] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/clients");
      const jsonData = await response.json();
      setData(jsonData.reverse());
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSaveNewRow = async (newRowdata) => {
    try {
      const response = await fetch("http://localhost:3000/clients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRowdata.values),
      });
      if (response.ok) {
        const newClient = await response.json();
        setData([...data, newClient]);
        console.log("Client created successfully:", newClient);
        alert("Client created successfully");
      } else {
        console.error("Failed to create client");
      }
    } catch (error) {
      console.error("Error creating client:", error);
    }
  };

  const handleSaveEditedRow = async (updatedRowdata) => {
    console.log(updatedRowdata);
    try {
      const response = await fetch(
        `http://localhost:3000/clients/${updatedRowdata.row.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedRowdata.values),
        }
      );
      if (response.ok) {
        const updatedClient = await response.json();
        const newdata = data.map((client) =>
          client._id === updatedClient._id ? updatedClient : client
        );
        setData(newdata);
        console.log("Client updated successfully:", updatedClient);
        alert("Client updated successfully");
      } else {
        console.error("Failed to update client");
      }
    } catch (error) {
      console.error("Error updating client:", error);
    }
  };

  async function openDeleteConfirmModal(row) {
    try {
      const response = await fetch(`http://localhost:3000/clients/${row.id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setData(data.filter((client) => client._id !== row.id));
        alert("Client deleted successfully");
      } else {
        console.error("Failed to delete client");
      }
    } catch (error) {
      console.error("Error deleting client:", error);
    }
  }

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        enableEditing: true,
        size: 100,
      },
      {
        accessorKey: "address",
        header: "Address",
        enableEditing: true,
      },
      {
        accessorKey: "zip",
        header: "ZIP Code",
        enableEditing: true,
      },
      {
        accessorKey: "city",
        header: "City",
        enableEditing: true,
      },
      {
        accessorKey: "country",
        header: "Country",
        enableEditing: true,
      },
      {
        accessorKey: "email",
        header: "Email",
        enableEditing: true,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
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
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Tooltip title="Add">
        <IconButton
          onClick={() => {
            table.setCreatingRow(true);
          }}
        >
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

  return (
    <Box sx={{ display: "flex" }}>
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
        <div className="container mt-5">
          <h1>Client Management</h1>

          <br />
          <MaterialReactTable table={table} />
        </div>
      </Box>
    </Box>
  );
};

export default Client;
