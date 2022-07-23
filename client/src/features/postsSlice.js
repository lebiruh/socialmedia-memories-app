import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import {}
import API from '../api/axios';
// import axios from 'axios';

const initialState = {
    loading: false,
    posts: [],
    // currentPage: 1,
    // numberOfPages: 1,
    error: ''
};

// const API = axios.create({baseURL: 'http://localhost:5000'});

 API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
})

export const getPost = createAsyncThunk('post/getPost',async (id) => {
    try {
       const {data} = await API.get(`/posts/${id}`);
    //    console.log(data);
       return data;
    } catch (error) {
        console.log(error)
    }
})

export const getPosts = createAsyncThunk('post/getPosts',async (page) => {
    try {
       const {data} = await API.get(`/posts?page=${page}`);
    //    console.log(data);
       return data;
    } catch (error) {
        console.log(error)
    }
})

export const getPostsBySearch = createAsyncThunk('post/getPostsBySearch', async(searchQuery) => {
    try {
        const response = await API.get(`/posts/search?searchQuery=${searchQuery || 'none'}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
})

export const createPost = createAsyncThunk('post/createPost', async ({post, navigate}) => {
    // console.log(post);
    try {
        const response = await API.post('/posts', post);
        // console.log(response.data);
        // console.log(response);
        // console.log(post);
        navigate(`/posts/${response.data._id}`);
        return response.data;        
               
    } catch (error) {
        console.log(error)
    } 
    
})

export const updatePost = createAsyncThunk('post/updatePost', async ({currentId, updatedPost, navigate}) => {
    // console.log(postData);
    try {
        const response = await API.patch(`/posts/${currentId}`, updatedPost);
        console.log(updatedPost);
        console.log('response: ',response.data);
        // console.log(postData);
        // console.log(id);
        // clear();
        navigate('/');
        // navigate(`/posts/${response.data._id}`);
        return response.data;        
               
    } catch (error) {
        console.log(error)
    } 
    
})

export const deletePost = createAsyncThunk('post/deletePost', async ({id, clear}) => {
    try {
        await API.delete(`/posts/${id}`);
        // console.log(response.data);
        clear();
        return id;        
               
    } catch (error) {
        console.log(error)
    } 
    
})

export const likePost = createAsyncThunk('post/likePost', async ({id, clear, navigate}) => {
    try {
        const response = await API.patch(`/posts/${id}/likepost`);
        // console.log(response.data);
        clear();
        navigate('/');
        return response.data;        
               
    } catch (error) {
        console.log(error)
    } 
    
})


const postSlice = createSlice({
    name: 'post',
    initialState,
    // reducers: {},
    extraReducers: {
        [createPost.pending]: (state) => {
            state.loading = true
        },
        [createPost.fulfilled]: (state, action) => {
            state.loading = false;
            state.posts.push(action.payload);
            state.error = ''
        },
        [createPost.rejected]: (state, action) => {
            state.error = 'error occured!'
        },
        [getPosts.pending]: (state) => {
            state.loading = true;
        },
        [getPosts.fulfilled]: (state, action) => {
            state.loading = false;
            state.posts = action.payload.data;
            state.currentPage = action.payload.currentPage;
            state.numberOfPages = action.payload.numberOfPages;
            state.error = ''
        },
        // [updatePost.pending]: (state) => {
        //     state.loading = true;
        // },
        [updatePost.fulfilled]: (state, action) => {
            state.loading = false;
            state.error = '';
            state.posts.map((post) => post._id === action.payload._id ? action.payload : post);
            // return {...initialState, posts: [...posts]};
            // console.log(action.payload);
            
        },
        [updatePost.rejected]: (state, action) => {
            state.error = action.error;
        },
        [deletePost.fulfilled]: (state, action) => {
            state.loading = false;
            state.posts.filter((post) => post._id !== action.payload); 
            state.error = ''           
        },
        [likePost.pending]: (state) => {
            state.loading = false
        },
        [likePost.fulfilled]: (state, action) => {
            state.loading = false;
            state.posts.map((post) => post._id === action.payload._id ? action.payload : post);
            state.error = ''
        },
        [likePost.rejected]: (state, action) => {
            state.error = 'error occured!'
        },
        [getPostsBySearch.pending]: (state) => {
            state.loading = true
        },
        [getPostsBySearch.fulfilled]: (state, action) => {
            state.loading = false;
            state.posts = action.payload;
            state.error = ''
        },
        [getPostsBySearch.rejected]: (state, action) => {
            state.error = 'error occured!'
        },
        [getPost.pending]: (state) => {
            state.loading = true
        },
        [getPost.fulfilled]: (state, action) => {
            state.loading = false;
            state.post = action.payload;
            state.error = ''
        },
        [getPost.rejected]: (state, action) => {
            state.error = 'error occured!'
        },
    }   
})


export default postSlice.reducer;

