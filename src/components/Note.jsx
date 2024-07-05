import React, { useState, useMemo, useEffect } from "react";
import { IconButton, Tooltip, Box, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMaterialReactTable } from "./useMaterialReactTable";

const Note = () => {
  const [validationErrors, setValidationErrors] = useState({});
  const [fetchedUsers, setFetchedUsers] = useState([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [isUpdatingUser, setIsUpdatingUser] = useState(false);
  const [isDeletingUser, setIsDeletingUser] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoadingUsers(true);
    try {
      const response = await fetch("http://localhost:3000/items");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setFetchedUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsLoadingUsers(false);
    }
  };

  const handleCreateUser = async ({ values, table }) => {
    const newValidationErrors = validateUser(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    setIsCreatingUser(true);
    try {
      await createUser(values);
      await fetchUsers();
      table.setCreatingRow(null);
    } catch (error) {
      console.error("Error creating user:", error);
    } finally {
      setIsCreatingUser(false);
    }
  };

  const handleSaveUser = async ({ values, table }) => {
    const newValidationErrors = validateUser(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    setIsUpdatingUser(true);
    try {
      await updateUser(values);
      await fetchUsers();
      table.setEditingRow(null);
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      setIsUpdatingUser(false);
    }
  };

  const openDeleteConfirmModal = async (row) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setIsDeletingUser(true);
      try {
        await deleteUser(row.original.id);
        await fetchUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
      } finally {
        setIsDeletingUser(false);
      }
    }
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "itemcode",
        header: "itemcode",
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: "itemname",
        header: "itemname",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.firstName,
          helperText: validationErrors?.firstName,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              firstName: undefined,
            }),
        },
      },
      // Add other columns as needed
    ],
    [validationErrors]
  );

  const table = useMaterialReactTable({
    columns,
    data: fetchedUsers,
    createDisplayMode: "row",
    editDisplayMode: "row",
    enableEditing: true,
    getRowId: (row) => row.id,
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateUser,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveUser,
    renderRowActions: ({ row }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => handleEditUser(row)}>
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
      <Button
        variant="contained"
        onClick={() => {
          table.setCreatingRow(true);
        }}
      >
        Create New User
      </Button>
    ),
    state: {
      isLoading: isLoadingUsers,
      isSaving: isCreatingUser || isUpdatingUser || isDeletingUser,
      showAlertBanner: false, // You can handle error alerts as needed
      showProgressBars: false, // You can add progress bars as needed
    },
  });

  const createUser = async (user) => {
    // Implement create user API call
  };

  const updateUser = async (user) => {
    // Implement update user API call
  };

  const deleteUser = async (userId) => {
    // Implement delete user API call
  };

  const validateRequired = (value) => !!value.length;
  const validateEmail = (email) =>
    !!email.length &&
    email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );

  function validateUser(user) {
    return {
      firstName: !validateRequired(user.firstName)
        ? "First Name is Required"
        : "",
      lastName: !validateRequired(user.lastName) ? "Last Name is Required" : "",
      email: !validateEmail(user.email) ? "Incorrect Email Format" : "",
    };
  }

  return <MaterialReactTable table={table} />;
};

export default Note;
