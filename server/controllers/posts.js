import PostMessage from '../models/postMessage.js';
import mongoose from 'mongoose';



export const getPosts = async(req, res) => {

    const {page} = req.query;

    try {
        const LIMIT = 3;
        const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
        const total = await PostMessage.countDocuments({});

        const posts = await PostMessage.find().sort({_id: -1}).limit(LIMIT).skip(startIndex);
        // console.log(postMessages);
        res.status(200).json({data: posts, currentPage: Number(page) || 1, numberOfPages: Math.ceil(total / LIMIT)});
    } catch (error) {
       res.status(404).json({message: error.message}) 
    }
}; 

export const getPostsBySearch = async(req, res) => {

    // console.log(req.query);
    const {searchQuery} = req.query;

    try {
        const title = new RegExp(searchQuery, 'i');
        // console.log(title);
        const posts = await PostMessage.find({title});
        // console.log(posts);
        res.json(posts);
    } catch (error) {
       res.status(404).json({message: error.message}); 
    }
}

export const getPost = async(req,res) => {
    
    const {id} = req.params;

    try {
        const post = await PostMessage.findById(id);
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({message: message.error});
    }

}

export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new PostMessage({...post, creator: req.userId});

    try {
        await newPost.save();

        res.status(201).json(newPost);
        // console.log(newPost);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
};

export const updatePost = async (req, res) => {
    const {id} = req.params;
    // const {message} = req.body;
    // console.log('req.body is: ' + message);

    const post = await PostMessage.findById(id);
    

    if(!post) return res.status(404).send('No post with that id');

    // const updatedPost = {creator, title, message, tags, selectedFile, _id: id}
    // const post = req.body;
    
    const updatedPost = await PostMessage.findByIdAndUpdate(id, req.body);

    // console.log('post is' + post);
    // console.log(req.params);
    // console.log('updatedPost is: ' + updatedPost);

    res.json(updatedPost);
}; 

export const deletePost = async (req, res) => {
    const { id } = req.params;
    // const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

    await PostMessage.findByIdAndRemove(id);

    res.json({message: 'post deleted successfully'});
}; 

export const likePost = async (req, res) => {
    const { id } = req.params;
    // const post = req.body;

    if(!req.userId) return res.json({message: 'Unauthenticated.'});
    
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId));

    if(index === -1) {
        post.likes.push(req.userId);
    } else {
        post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post)

    res.json(updatedPost);
}; 