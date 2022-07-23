import {configureStore} from '@reduxjs/toolkit';
import postReducer from '../../features/postsSlice';
import authReducer from '../../features/authSlice';

const store = configureStore({
    reducer: {
        post: postReducer,
        auth: authReducer
    }
})

export default store;