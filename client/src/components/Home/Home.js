import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {Container, Grow, Grid, Paper, Button} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import {getPostsBySearch, getPosts} from '../../features/postsSlice';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Pagination from '../Pagination/Paginate';
import AppBarSearch, { GridContainer, TextFieldSearch } from './styles';


function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {

  const [postData, setPostData] = useState({
    title:'',
    message:'',
    tags:'',
    selectedFile:''
  });

  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();  
  const query = useQuery();
  const navigate = useNavigate();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');
  const [search, setSearch] = useState('')
  // const [tags, setTags] = useState([]);

  // useEffect(() => {
  //     dispatch(getPosts())
  // }, [currentId, dispatch])

  const clear = () => {
    setCurrentId(0);
    setPostData(() => ({title:'', message:'', tags:'',selectedFile:''}))
  }

      
  // const handleAdd = (tag) => setTags([...tags, tag]);
  
  // const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete));
  
  const searchPost = () => {
    if(search.trim()) {
      console.log(search);
      dispatch(getPostsBySearch(search));
      navigate(`/posts/search?searchQuery=${search || 'none'}`);
    } else {
      navigate('/');
    }
  }

  const handleKeyPress = (e) => {
    if(e.key === 'Enter') {
      searchPost();
    }
  }

  return (
    <Grow in>
        <Container maxWidth='xl'>
          <GridContainer container justify="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={6} md={9}>
              <Posts clear={clear} currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppBarSearch position='static' color='inherit'>
                <TextFieldSearch name='search' variant='outlined' label='Search' fullWidth value={search} onChange={(e) => setSearch(e.target.value)} onKeyPress={handleKeyPress} />
                {/* <Chip style={{margin: '10px 0'}} value={tags} onclick={handleAdd} onDelete={handleDelete} label='Search by tags' variant='filled'/> */}
                <Button onClick={searchPost} color='primary' variant='contained'>Search</Button>
              </AppBarSearch>
              <Form postData={postData} setPostData={setPostData} clear={clear} currentId={currentId} setCurrentId={setCurrentId} />
              {
                !searchQuery && (
                  <Paper elevation={6}>
                    <Pagination page={page} />
                  </Paper>
                )
              }
            </Grid>
          </GridContainer>
        </Container>
      </Grow>
  )
}

export default Home;