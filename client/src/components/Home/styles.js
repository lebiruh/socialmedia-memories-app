import { AppBar, Grid, TextField } from "@mui/material";
import { styled } from "@mui/material/styles"; 
import Pagination from '@mui/material/Pagination';
// import {createTheme} from '@mui/material';
// const theme = createTheme()

const AppBarSearch = styled(AppBar)(() => ({
    borderRadius: 4,
    marginBottom: '1rem',
    display: 'flex',
    padding: '10px'
  }))

export const Paginate = styled(Pagination) (() => ({
  borderRadius: 4,
  marginTop: '1rem',
  padding: '16px'
}))

export const GridContainer = styled(Grid) (({theme}) => ({
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column-reverse'
  }
}))

export const TextFieldSearch = styled(TextField) (() => ({
  width: '97%',
  // margin: '10px 0'
}))



  
export default AppBarSearch;