import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const user = localStorage.getItem('profile')

const initialState = {
    loading: false,
    user: user ? user : null,
    error: ''
};

const API = axios.create({baseURL: 'http://localhost:5000'});


export const signIn = createAsyncThunk('auth/signIn', async ({formData, navigate}) => {

    try {
        const response = await API.post('/user/signin', formData); 
        localStorage.setItem('profile', JSON.stringify(response.data));
        navigate('/');
    } catch (error) {
        console.log(error)
    } 
    
})  

export const signUp = createAsyncThunk('auth/signUp', async ({formData, navigate}) => {
    
    try {
        const response = await API.post('/user/signup', formData);         
        localStorage.setItem('profile', JSON.stringify(response.data));
        navigate('/');
    } catch (error) {
        console.log(error)
    } 
    
})  


const authSlice = createSlice({
    name: 'auth',
    initialState      
})

export default authSlice.reducer;

