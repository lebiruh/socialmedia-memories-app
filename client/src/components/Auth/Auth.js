
import React, { useState, useEffect } from 'react';
import { Container, Avatar, Typography, Grid, Button } from '@mui/material';
import jwt_decode from 'jwt-decode';
import {useDispatch} from 'react-redux';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PaperContainer, { Form, ButtonSign } from './styles';
import Input from './Input';
import {signUp, signIn} from '../../features/authSlice';
import { useNavigate} from 'react-router-dom';

const Auth = () => {

    const initialState = {firstName: '', lastName: '', email: '', password: '', confirmPassword: ''}

    const [showPassword, setShowPassword] = useState(false);
    const [isSignUP, setisSignUP] = useState(false);
    const [formData, setFormData] = useState(initialState);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const googleAuth = (user) => {
        localStorage.setItem('profile', JSON.stringify(user));
        navigate('/');
    }


    const handleCallbackResponse = async (res) => {       
        try {
            var userObject = jwt_decode(res.credential);
            console.log(userObject);
            googleAuth(userObject);            
            
        } catch (error) {
            console.log(error);
        }        
    }

    useEffect(() => {
        /*global google*/
        google.accounts.id.initialize({
            client_id: "596069393974-2c5a1ce949lulvn8irn98gurvbmdimh0.apps.googleusercontent.com",
            callback: handleCallbackResponse
        })

        google.accounts.id.renderButton(
            document.getElementById('signInDiv'),
            {theme:'outline', size: 'large'}
        )

    })

    const handleSubmit = (e) => {
        e.preventDefault();

        if(isSignUP) {
            dispatch(signUp({formData, navigate}));
        } else {
            dispatch(signIn({formData, navigate}));
        }

    };

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value})
    }

    const switchMode = () => {
        setisSignUP((prevIsSignUP) => !prevIsSignUP);
        setShowPassword(false);
    }

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

  return (
    <Container component='main' maxWidth='xs'>
        <PaperContainer elevation={3}>
            <Avatar>
                <LockOutlinedIcon />
            </Avatar>
            <Typography variant='h5'>
                {
                    isSignUP ? 'Sign Up' : 'Sign In'
                }
            </Typography>
            <Form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {
                        isSignUP && (
                            <>
                                <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half />
                                <Input name='lastName' label='Last Name' handleChange={handleChange} half />
                            </>
                        )
                    }
                    <Input name='email' label='Email Address' handleChange={handleChange} type='email' />
                    <Input name='password' label='password' handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                    {
                        isSignUP && <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} type='password' />
                    }
                </Grid>
                <ButtonSign type='submit' fullWidth variant='contained' color='primary'>
                    {
                        isSignUP ? 'Sign Up' : 'Sign In'
                    }
                </ButtonSign>
                 <Grid container justifyContent='center'>
                    <Grid item>
                        <div id='signInDiv'></div>
                    </Grid>
                </Grid>
                <Grid container justifyContent='center'>
                    <Grid item>
                        <Button onClick={switchMode}>
                            {
                                isSignUP ? 'Already have an acconunt? Sign In' : "Don't have an acoount? Sign Up"
                            }
                        </Button>
                    </Grid>
                </Grid>
            </Form>
        </PaperContainer>
    </Container>
  )
}

export default Auth