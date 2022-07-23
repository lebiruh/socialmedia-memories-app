import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import { PaginationItem } from '@mui/material';
import Pagination from './styles';
import { useDispatch, useSelector } from 'react-redux';

import { getPosts } from '../../features/postsSlice';

const Paginate = ({page}) => {

  const {numberOfPages} = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    if(page) dispatch(getPosts(page));
  }, [page])

  return (
    <Pagination 
      count={numberOfPages} 
      page={Number(page) || 1} 
      variant= 'outlined' 
      color='primary' 
      shape='rounded'
      renderItem={(item) => (
        <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
      )} 
    />
  )
}

export default Paginate
