import React, {useEffect} from 'react';
import { Typography, Divider, Paper, CircularProgress } from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {useParams, useNavigate} from 'react-router-dom';
import DivCard, {DivSection, DivImageSection, ImageMedia, PaperLoading, DivRecommendedPosts} from './styles';

import {getPost, getPostsBySearch} from '../../features/postsSlice'

const PostDetails = () => {

  const {post, posts, loading} = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  useEffect(() => {
    if(post) {
      dispatch(getPostsBySearch({search: 'none'}))
    }
  }, [])

  if(!post) return null;

  if(loading) {
    return <PaperLoading elevation={6}>
      <CircularProgress size='7em'/>
    </PaperLoading>
  }

  const recommendedPosts = posts.filter(({_id}) => _id !== post._id);

  const openPost = (id) => navigate(`/posts/${id}`)

  return (
    <Paper style={{padding: '20px', borderRadius: '15px'}} elevation={6}>
      <DivCard>
        <DivSection>
          <Typography variant="h3" component="h2">{post.title}</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
          <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
          <Typography variant="h6">Created by: {post.name}</Typography>
          <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
          <Divider style={{ margin: '20px 0' }} />
            <Typography variant="body1"><strong>Realtime Chat - </strong></Typography>
          <Divider style={{ margin: '20px 0' }} />
            <Typography variant="body1"><strong>Comments - </strong></Typography>
          <Divider style={{ margin: '20px 0' }} />
        </DivSection>
        <DivImageSection>
          <ImageMedia src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
        </DivImageSection>
      </DivCard>
      {
        recommendedPosts.length && (
          <DivSection>
            <Typography gutterBottom variant='h5'>You might also like:</Typography>
            <Divider/>
            <DivRecommendedPosts>
              {
                recommendedPosts.map(({title, message, name, likes, selectedFile, _id}) => (
                  <div style={{margin: '20px', cursor: 'pointer'}} onClick={() => openPost(_id)} key={_id}>
                    <Typography gutterBottom variant='h6'>{title}</Typography>
                    <img src={selectedFile} alt='' width='200px'/>
                    <Typography gutterBottom variant='subtitle2'>{name}</Typography>
                    <Typography gutterBottom variant='subtitle2'>{message}</Typography>
                    <Typography gutterBottom variant='subtitle1'><b>Likes:</b> {likes.length}</Typography>
                  </div>
                ))
              }
            </DivRecommendedPosts>
          </DivSection>
        )
      }
    </Paper>
  )
}

export default PostDetails