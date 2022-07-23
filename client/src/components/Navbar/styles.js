import { AppBar, styled, Toolbar, Typography } from "@mui/material";
// import {Container} from '@mui/material';

const MyAppBar = styled(AppBar)(({theme}) => ({
  borderRadius: 15,
  margin: '30px 0',
  // width: 'auto',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 20px',
  [theme.breakpoints.down('sm')]: {
  flexDirection: 'column',
},
}))

export const MyImg = styled('img') (() => ({
  marginLeft: '10px',
  marginTop: '5px'
}))

export const TypographyAppbar = styled(Typography)(() => ({
  color: 'rgba(0, 183, 255, 1)',
  textDecoration: 'none',
  fontSize: '2em'
  // width: '80%'
}))

export const BrandContainer = styled('div') (() => ({
    display: 'flex',
    alignItems: 'center',
    // width: '100%'
}))

export const MyToolbar = styled(Toolbar) (({theme}) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  width: '400px',
  [theme.breakpoints.down('sm')]: {
    width: 'auto',
  },
}))

export const TypographyUserName = styled(Typography)(() => ({
  display: 'flex',
  alignItems: 'center',
  textAlign: 'center'
}))

export const Profile = styled('div') (({theme}) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '400px',
  [theme.breakpoints.down('sm')]: {
    width: 'auto',
    marginTop: 20,
    justifyContent: 'center',
  },
}))
  
export default MyAppBar;