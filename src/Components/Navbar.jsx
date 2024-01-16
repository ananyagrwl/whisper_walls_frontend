// src/components/Navbar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const logoColor = '#F4BF96';
  const textColor = '#FCF5ED';
  const navigate = useNavigate();
  const name = useSelector((state) => state.name.name);

  return (
    <div position="static" className=' bg-transparent m-0'>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>

        <span variant="h6" component="div" className='nav_head'>Whisper Walls</span>

        <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <Button color="inherit" component={Link} to="/home" sx={{ color: textColor }} className='nav_home'>
            Home
          </Button>
          <Button color="inherit" onClick={() => { Cookies.remove("token"); Cookies.remove("name"); navigate("/") }} sx={{ color: textColor }}>
            Logout
          </Button>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>

          <Typography variant="body2" sx={{ color: textColor, marginRight: '10px' }}>
            {name}
          </Typography>
        </Box>
      </Toolbar>
    </div>
  );
};

export default Navbar;
