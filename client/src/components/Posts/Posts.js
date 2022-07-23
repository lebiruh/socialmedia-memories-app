import React from 'react';
import Post from './Post/Post';
import { useSelector} from 'react-redux';
import { CircularProgress, Grid } from '@mui/material';


function Posts( { clear, setCurrentId, currentId } ) {

   const {posts, loading} = useSelector((state) => state.post)
  //  console.log(posts);

  if(!posts.length && !loading) return 'No posts';

  return (
    loading ? <CircularProgress /> : (
      <Grid container alignItems="stretch" spacing={3}>
        {
          posts.map((post) => (
            <Grid key={post._id} item xs={12} sm={12} md={6} lg={4}>
              <Post clear={clear} post={post} setCurrentId={setCurrentId} />
            </Grid>
          ))
        }
        
      </Grid>
    )     
      
     
  )
}

export default Posts;