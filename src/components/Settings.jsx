import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "./Sidebar";

const Input = styled("input")({
  display: "none",
});

const Settings = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    profilePicture: null,
    name: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [editMode, setEditMode] = useState(false);

  const fetchLastImage = async () => {
    try {
      const response = await axios.get("http://localhost:3000/images");
      if (response.data.length > 0) {
        const latestImage = response.data[response.data.length - 1];
        setFormData((prevFormData) => ({
          ...prevFormData,
          profilePicture: latestImage.imageUrl,
        }));
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    fetchLastImage();
  }, []);

  const handleProfilePictureChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        profilePicture: e.target.files[0],
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("profilePicture", formData.profilePicture);

      const response = await fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formDataToSend,
        credentials: "include",
      });

      if (response.ok) {
        console.log("Profile picture uploaded successfully");
        alert("Profile picture uploaded successfully");
        setEditMode(false); // Exit edit mode after successful upload
        fetchLastImage();
      } else {
        console.error("Failed to upload profile picture");
      }
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    }
  };

  const handleCancel = () => {
    // Reset form data or add any other cancel logic
    fetchLastImage();
    setEditMode(false); // Exit edit mode on cancel
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/logout", {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        console.log("Logout successful");
        localStorage.removeItem("authToken");
        navigate("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const handleNameChange = async () => {
    try {
      const response = await fetch("http://localhost:3000/change-name", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: formData.name }),
        credentials: "include",
      });

      if (response.ok) {
        console.log("Name changed successfully");
        alert("Name changed successfully");
      } else {
        console.error("Failed to change name");
      }
    } catch (error) {
      console.error("Error changing name:", error);
    }
  };

  const handleChangePassword = async () => {
    if (formData.newPassword !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: formData.newPassword }),
        credentials: "include",
      });

      if (response.ok) {
        console.log("Password changed successfully");
        alert("Password changed successfully");
        setFormData({
          ...formData,
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        console.error("Failed to change password");
      }
    } catch (error) {
      console.error("Error changing password:", error);
    }
  };

  const handleResetPassword = async () => {
    try {
      const response = await fetch("http://localhost:3000/reset-password", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        console.log("Password reset successfully");
        alert(
          "Password reset successfully. Please check your email for further instructions."
        );
      } else {
        console.error("Failed to reset password");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
        <Typography variant="h4" gutterBottom>
          Settings
        </Typography>
        <Grid container spacing={2}>
          {/* Profile Picture */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Profile Picture</Typography>
            <input
              accept="image/*"
              id="profile-picture-upload"
              type="file"
              onChange={handleProfilePictureChange}
              style={{ display: "none" }}
              disabled={!editMode}
            />
            <label htmlFor="profile-picture-upload">
              <IconButton component="span">
                <Avatar
                  src={
                    formData.profilePicture
                      ? typeof formData.profilePicture === "string"
                        ? formData.profilePicture
                        : URL.createObjectURL(formData.profilePicture)
                      : ""
                  }
                  alt="Profile Picture"
                  sx={{ width: 100, height: 100 }}
                />
              </IconButton>
            </label>
            {editMode && formData.profilePicture && <Box mt={2}></Box>}
          </Grid>

          {/* Edit Button */}
          <Grid item xs={12}>
            {!editMode && (
              <Button
                variant="outlined"
                color="primary"
                onClick={() => setEditMode(true)}
                sx={{ mr: 2 }}
              >
                Edit Profile Picture
              </Button>
            )}
          </Grid>

          {/* Save, Cancel, and Logout Buttons */}
          {editMode && (
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
                sx={{ mr: 2 }}
              >
                Save
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleCancel}
                sx={{ mr: 2 }}
              >
                Cancel
              </Button>
            </Grid>
          )}

          {/* Change Name */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Change Name</Typography>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleNameChange}
              sx={{ mr: 2 }}
            >
              Change Name
            </Button>
          </Grid>

          {/* Change Password */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Change Password</Typography>
            <TextField
              label="New Password"
              name="newPassword"
              type="password"
              value={formData.newPassword}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              margin="normal"
            />
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleChangePassword}
              sx={{ mr: 2 }}
            >
              Change Password
            </Button>
          </Grid>

          {/* Reset Password */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Reset Password</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleResetPassword}
              sx={{ mr: 2 }}
            >
              Reset Password
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Button variant="outlined" onClick={handleLogout}>
              Logout
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Settings;
