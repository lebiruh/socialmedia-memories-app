import express from 'express';
import {getPostsBySearch, getPosts, getPost, createPost, updatePost, deletePost, likePost} from '../controllers/posts.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/search', getPostsBySearch);
router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/', protect, createPost);
router.patch('/:id', protect, updatePost);
router.delete('/:id',protect, deletePost);
router.patch('/:id/likepost', protect, likePost);


export default router;