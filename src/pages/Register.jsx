import {
  Button,
  FormControl,
  InputLabel,
  Link,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [registerFirstName, setRegisterFirstName] = useState("");
  const [registerLastName, setRegisterLastName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerMobile, setRegisterMobile] = useState("");
  const [registerAddress, setRegisterAddress] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerDob, setRegisterDob] = useState("");
  const [registerGender, setRegisterGender] = useState("");
  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationToken, setVerificationToken] = useState("");
  const [verificationInProgress, setVerificationInProgress] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: registerFirstName,
          lastName: registerLastName,
          email: registerEmail,
          mobile: registerMobile,
          address: registerAddress,
          password: registerPassword,
          dob: registerDob,
          gender: registerGender,
        }),
      });

      const data = await response.json();
      if (response.status === 201) {
        setVerificationSent(true);
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error registering user. Please try again later.");
    }
  };

  const handleVerifyEmail = async () => {
    try {
      setVerificationInProgress(true);
      const response = await fetch("http://localhost:3000/verify-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: registerEmail,
          token: verificationToken,
        }),
      });

      const data = await response.json();
      if (response.status === 200) {
        alert("Email verified successfully! You can now login.");
        navigate("/login");
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error verifying email. Please try again later.");
    } finally {
      setVerificationInProgress(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#FFC0CB",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div style={{ textAlign: "center", width: "100%", maxWidth: "800px" }}>
        <Typography
          variant="h3"
          component="div"
          style={{ fontWeight: "bold", color: "#000", marginBottom: "20px" }}
        >
          BizNweb
        </Typography>
        {verificationSent ? (
          <div>
            <Typography variant="h6" style={{ color: "green" }}>
              A verification email has been sent to {registerEmail}. Please
              check your inbox and enter the verification code below.
            </Typography>
            <TextField
              label="Verification Code"
              fullWidth
              margin="normal"
              value={verificationToken}
              onChange={(e) => setVerificationToken(e.target.value)}
              style={{ marginTop: "10px" }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleVerifyEmail}
              disabled={verificationInProgress}
              style={{ marginTop: "10px" }}
            >
              {verificationInProgress ? "Verifying..." : "Verify Email"}
            </Button>
          </div>
        ) : (
          <form
            onSubmit={handleRegister}
            style={{
              backgroundColor: "#FFFFFF",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography variant="h4" gutterBottom>
              Register
            </Typography>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "16px",
              }}
            >
              <TextField
                label="First Name"
                fullWidth
                margin="normal"
                value={registerFirstName}
                onChange={(e) => setRegisterFirstName(e.target.value)}
                style={{ marginRight: "10px" }}
              />
              <TextField
                label="Last Name"
                fullWidth
                margin="normal"
                value={registerLastName}
                onChange={(e) => setRegisterLastName(e.target.value)}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "16px",
              }}
            >
              <TextField
                label="Email"
                type="email"
                fullWidth
                margin="normal"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                style={{ marginRight: "10px" }}
              />
              <TextField
                label="Mobile Number"
                type="tel"
                fullWidth
                margin="normal"
                value={registerMobile}
                onChange={(e) => setRegisterMobile(e.target.value)}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "16px",
              }}
            >
              <TextField
                label="Address"
                fullWidth
                margin="normal"
                value={registerAddress}
                onChange={(e) => setRegisterAddress(e.target.value)}
                style={{ marginRight: "10px" }}
              />
              <TextField
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "16px",
              }}
            >
              <TextField
                label="Date of Birth"
                type="date"
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                value={registerDob}
                onChange={(e) => setRegisterDob(e.target.value)}
                style={{ marginRight: "10px" }}
              />
              <FormControl fullWidth margin="normal">
                <InputLabel id="gender-label">Gender</InputLabel>
                <Select
                  labelId="gender-label"
                  value={registerGender}
                  onChange={(e) => setRegisterGender(e.target.value)}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: "20px" }}
            >
              Register
            </Button>
            <Typography
              variant="body2"
              style={{ marginTop: "10px", textAlign: "center" }}
            >
              Already registered?{" "}
              <Link
                onClick={() => navigate("/login")}
                style={{ cursor: "pointer" }}
              >
                Login here
              </Link>
            </Typography>
          </form>
        )}
      </div>
    </div>
  );
};

export default Register;
