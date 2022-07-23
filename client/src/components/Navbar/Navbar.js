import React, { useEffect, useState } from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import { Avatar, Button } from "@mui/material";
import decode from 'jwt-decode';
import MyAppBar from './styles';
import {MyImg, BrandContainer, MyToolbar, TypographyUserName, Profile} from './styles';
import memoriesLogo from '../../images/memories-Logo.png';
import memoriesText from '../../images/memories-Text.png';

const Navbar = () => {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  const location = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    // localStorage.clear();
    setUser(null);
    navigate('/');
  }

  useEffect(() => {
    const token = user?.token;
    
    if(token) {
      const decodedToken = decode(token);
      
      if(decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem('profile')));

  },[location]);
 
   
  return (
    <MyAppBar position='static' color='inherit'>
      <BrandContainer>
        <Link to='/posts'>
          <MyImg src={memoriesText} alt='icon' height='45px'/>
        </Link>
        <MyImg src={memoriesLogo} alt="icon" height="40px"/>  
      </BrandContainer>
      <MyToolbar>
        {
          user ? (
            <Profile>
              <Avatar alt={user.name} src={user.picture}>{user.name.charAt(0)}</Avatar>
              <TypographyUserName variant='h6'>{user.name}</TypographyUserName>
              <Button variant='contained' color='secondary' onClick={logout}>Logout</Button>
            </Profile>
          ) : (
            <Button component={Link} to='/auth' variant='contained' color='primary' >Sign In</Button>
          )
        }
      </MyToolbar>
    </MyAppBar>
  )
}

export default Navbar