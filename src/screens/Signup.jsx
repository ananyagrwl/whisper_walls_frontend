// src/components/SignupPageMui.js
import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography, Container } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup} from 'firebase/auth';
import { db, auth } from '../firebase/firebaseconfig';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { updateName } from '../redux/Name';

const Signup= () => {

  const dispatch = useDispatch(); //to push data in redux
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const [ name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if(Cookies.get("token")){
      navigate("/home")
    }
  }, [])

  const isValidEmail = (email) => {
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignup = async(e) => {
    e.preventDefault();

    if (email == "" || !isValidEmail(email)) {
      alert("Invalid Email")
    }
    else if (password == "" || password.length < 6) {
      alert("Enter a Valid Password")
    }
    else {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        const data = await axios.post("https://whisper-walls-backend.vercel.app/signup", {
          uid:user.uid, email: user.email, name: name
        })

        dispatch(updateName(data.data.name))
        // setName(data.data.name);
        Cookies.set('token', data.data.token, { expires: 7 });
        Cookies.set('name', data.data.name, { expires: 7 });
        console.log(data.data.token);
        // console.log(data);
        navigate("/home");
      } catch (error) {
        alert("User already Exists", error)
      }
    }
    
  };

  const loginWithGoogle = async(e)=>{
    e.preventDefault();
    try {
      const token = await signInWithPopup(auth, provider);
      if(token) {
        // console.log(token.user);
        // console.log(token.user.uid);
        // console.log(token.user.displayName);
        // console.log(token.user.email);
        const data = await axios.post("https://whisper-walls-backend.vercel.app/signup", {
          uid:token.user.uid, email: token.user.email, name:token.user.displayName
        })
        dispatch(updateName(data.data.name))
        setName(data.data.name);
        Cookies.set('token', data.data.token, { expires: 7 });
        Cookies.set('name', data.data.name, { expires: 7 });
        // console.log(data);
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleForgotPassword = () => {
    // Add logic to handle forgot password (e.g., show a modal)
    console.log('Forgot Password clicked. Implement forgot password logic.');
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
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSignup} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Username"
            name="name"
            value={name}
            autoFocus
            onChange={(e) => setName(e.target.value)}
            autoComplete='name'
          />
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
            autoComplete='email'
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            autoFocus
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: '#CE5A67', color: '#fff', '&:hover': {backgroundColor: '#a0414d'}}}
          >
            Sign Up
          </Button>
          <Link to="/" className=' text-pink-500 mb-2'>Already have an account ? Login</Link>
          <Button
            type="button"
            fullWidth
            variant="outlined"
            onClick={loginWithGoogle}
            sx={{ mb: 1, mt:2, color: '#CE5A67', borderColor: '#CE5A67', '&:hover': { backgroundColor: '#a0414d', color:"white"} }}
            className=' flex gap-2'
          >
            Sign in with <img Src="google.png" alt="" width={20} />
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;
