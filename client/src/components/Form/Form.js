import React, { useEffect } from 'react'
import { Button, Typography, Paper } from "@mui/material";
import FileBase from 'react-file-base64';
import FormInput, { TextFieldInput, ButtonSubmit, DivInput } from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {createPost, updatePost} from '../../features/postsSlice';

function Form( { currentId, setCurrentId, postData, setPostData, clear } ) {

 
  // const [postData, setPostData] = useState({
  //   title:'',
  //   message:'',
  //   tags:'',
  //   selectedFile:''
  // });

  const post = useSelector((state) => currentId ? state.post.posts.find((p) => p._id === currentId) : null);
  const user = JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
    if(post) setPostData(post);
    // console.log(post);
  }, [post, setPostData])
  

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(currentId === 0) {
      const post = {...postData, name: user?.name};
      dispatch(createPost({post, navigate}));
      clear();
    } else {
        const updatedPost = {...postData, name: user?.name}
        dispatch(updatePost({currentId, updatedPost, navigate})); 
        clear();  
      }
     
  }

  if(!user?.name) {
    return(
      <Paper>
        <Typography variant='h6' align='center'>
          Please sign in to create your own posts.
        </Typography>
      </Paper>
    )
  }

  return (
    <Paper elevation={6}>
      <FormInput autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Typography variant='h6'>{(currentId) ? 'Edit' : 'Create'} a Memory</Typography>
        <TextFieldInput 
          name='Title' 
          variant='outlined' 
          label='Title' 
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({...postData, title: e.target.value})}  
        />
        <TextFieldInput
          name='Message' 
          variant='outlined' 
          label='Message'
          rows={4} 
          fullWidth
          multiline
          value={postData.message}
          onChange={(e) => setPostData({...postData, message: e.target.value})}  
        />
        <TextFieldInput 
          name='Tags' 
          variant='outlined' 
          label='Tags' 
          fullWidth
          value={postData.tags}
          onChange={(e) => setPostData({...postData, tags: e.target.value})}  
        />
        <DivInput>
          <FileBase 
            type='file' 
            multiple={false}
            onDone={({base64}) => setPostData({...postData, selectedFile: base64})}
          />
        </DivInput>
        <ButtonSubmit variant='contained' color='primary' size='large' type='submit' fullWidth>Post</ButtonSubmit>
        <Button variant='contained' color='secondary' size='small' onClick={clear} fullWidth>Clear</Button>

      </FormInput>
    </Paper>
  )

}

export default Form