import { Button, Link, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword,
        }),
      });

      const data = await response.json();
      console.log(data)
      if (response.status == 200) {
        alert('Login successful');
        navigate('/home'); // Navigate to home page after successful login
      } else {
        alert(data.error || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error logging in. Please try again later.');
    }
  };

  return (
    <div style={{ backgroundColor: '#FFC0CB', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: '400px', textAlign: 'center' }}>
        <Typography variant="h3" component="div" style={{ fontWeight: 'bold', color: '#000', marginBottom: '20px' }}>
          BizNweb
        </Typography>
        <form onSubmit={handleLogin} style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
          <Typography variant="h4" gutterBottom>Log in</Typography>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '20px' }}>
            Log in
          </Button>
          <Typography variant="body2" style={{ marginTop: '10px', textAlign: 'center' }}>
            Not Registered Yet?{' '}
            <Link component="button" variant="body2" onClick={() => navigate('/register')}>
              Click here to register
            </Link>
          </Typography>
        </form>
      </div>
    </div>
  );
};

export default Login;
