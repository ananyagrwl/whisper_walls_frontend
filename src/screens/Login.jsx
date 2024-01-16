// src/components/LoginPageMui.js
import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography, Container } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { db, auth } from '../firebase/firebaseconfig';
import Cookies from 'js-cookie';
import axios from 'axios';
import { updateName } from '../redux/Name';
import { useDispatch } from 'react-redux';

const Login = () => {

  const provider = new GoogleAuthProvider();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (Cookies.get("token")) {
      navigate("/home")
    }
  }, [])

  const isValidEmail = (email) => {
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    // const data = new FormData(e.currentTarget);
    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password')
    // });

    if (email == "" || !isValidEmail(email)) {
      alert("Invalid Email")
    }
    else if (password == "" || password.length < 6) {
      alert("Enter a Valid Password")
    }
    else {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
       
        const data = await axios.post("https://whisper-walls-backend.vercel.app/login", {
          uid: user.uid
        })
        dispatch(updateName(data.data.name))
        setName(data.data.name);
        Cookies.set('token', data.data.token, { expires: 7 });
        Cookies.set('name', data.data.name, { expires: 7 });

        navigate("/home")
      } catch (error) {
        console.log("Invalid Credentials", error);
        alert("Invalid Cred")
      }
    }
  };

  const loginWithGoogle = async (e) => {
    e.preventDefault();
    try {
      const token = await signInWithPopup(auth, provider);
      if (token) {
        console.log(token.user);
        console.log(token.user.uid);
        console.log(token.user.displayName);
        console.log(token.user.email);
        // console.log(data.data.name);
        const data = await axios.post("https://whisper-walls-backend.vercel.app/login", {
          uid: token.user.uid
        })
        console.log(data.data.name);
        dispatch(updateName(data.data.name))
        setName(data.data.name);
        Cookies.set('token', data.data.token, { expires: 7 });
        Cookies.set('name', data.data.name, { expires: 7 });
        // console.log(data);
        navigate("/home")
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleForgotPassword = async () => {
    if (email == "" || !isValidEmail(email)) {
      alert("Enter a valid email")
    }
    else {
      try {
        await sendPasswordResetEmail(auth, email);
        // setResetSent(true);
        alert('Password reset email sent');
      } catch (error) {
        alert('Error sending password reset email');
      }
    }

  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: '#fff', // Set background color to white
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography component="h1" variant="h5" sx={{ color: '#CE5A67' }}>
          Login
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            value={email}
            autoFocus
            onChange={(e) => setEmail(e.target.value)}

          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value = {password}
            onChange={(e) => setPassword(e.target.value)}

          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: '#CE5A67', color: '#fff', '&:hover': { backgroundColor: '#a0414d' } }}
            onClick={handleLogin}
          >
            Login
          </Button>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 3,
              color: '#CE5A67',
              fontSize: '14px',
            }}
          >
            <div className='text-pink-500' onClick={handleForgotPassword}>Forgot Password</div>
            <Link to="/signup" className='text-pink-500 text-center'>New to Whisper Walls? Signup</Link>
          </Box>
          <Button
            type="button"
            fullWidth
            variant="outlined"
            onClick={loginWithGoogle}
            sx={{ mb: 1, color: '#CE5A67', borderColor: '#CE5A67', '&:hover': { backgroundColor: '#a0414d', color: "white" } }}
            className=' flex gap-2'
          >
            Sign in with <img Src="google.png" alt="" width={20} />
          </Button>

        </Box>
      </Box>
    </Container>
  );
};

export default Login;
