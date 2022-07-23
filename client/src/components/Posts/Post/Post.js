import React from 'react';
import {useNavigate} from 'react-router-dom';
import { CardContent, Button, Typography } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import moment from 'moment';
import {deletePost, likePost} from '../../../features/postsSlice';
import {useDispatch} from 'react-redux';
import CardMediaContainer, { CardActionsContainer, CardContainer, DivDetails, DivOverlay, DivOverlay2, TypographyMessage, TypographyTitle, ButtonBaseContainer } from './styles';

function Post({post, setCurrentId, clear}) {

  const user = JSON.parse(localStorage.getItem('profile'));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = (id) => {
    setCurrentId(id);
    dispatch(deletePost({id, clear}));
    // clear();
    // post = null;
  }

  const handleLike = (id) => {
    // setCurrentId(id);
    dispatch(likePost({id, clear, navigate}));
    // navigate('/')
    // clear();
  }

  const openPost = () => {
    navigate(`/posts/${post._id}`);
  }

  // useEffect((id) => {
  //   dispatch(likePost(id));
  // },[dispatch])

  return (
    <CardContainer raised elevation={6}>
      <ButtonBaseContainer onClick={openPost}>
        <CardMediaContainer component='img' image={post.selectedFile} alt={post.title} style={{height: 260}} />
        <DivOverlay>
          <Typography variant='h6'>{post.name}</Typography>
          <Typography variant='body2' style={{color: 'black'}}>{moment(post.createdAt).fromNow()}</Typography>
        </DivOverlay>
          {
            (user?._id === post?.creator && (
              <DivOverlay2>
              <Button
                style={{color: 'white'}} 
                size='large' 
                onClick={(e) => {e.stopPropagation(); setCurrentId(post._id)}}
              >
                <MoreHorizIcon fontSize='default' /> 
              </Button>)
            </DivOverlay2>
            ))
          }
        <DivDetails>
          <Typography variant='body2' color='textSecondary'>{post.tags.map((tag) => `#${tag.split(',').join(' ')} `)}</Typography>
        </DivDetails>
          <TypographyTitle variant='h5' gutterBottom>{post.title}</TypographyTitle>
        <CardContent>
          <TypographyMessage variant='body2'>{post.message}</TypographyMessage>
        </CardContent>
      </ButtonBaseContainer>
      <CardActionsContainer>
        <Button size='small' color='primary' disabled={!user?._id} onClick={() => handleLike(post._id)}>
          <ThumbUpAltIcon fontSize='small' />
          &nbsp; Like &nbsp;
          {post.likes.length}
        </Button>
        {
          (user?._id === post?.creator && (

            <Button size='small' color='primary' onClick={() => handleDelete(post._id)}>
              <DeleteIcon fontSize='small' />
              Delete
            </Button>

          ))
        }
      </CardActionsContainer>

    </CardContainer>
  )
}

export default Post