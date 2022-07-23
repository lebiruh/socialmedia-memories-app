import { AppBar, styled, Typography } from "@mui/material";
// import {Container} from '@mui/material';

const MyAppBar = styled(AppBar)(() => ({
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }))

export const MyImg = styled('img') (() => ({
  marginLeft: '15px'
}))

export const MyTypography = styled(Typography)(() => ({
  color: 'rgba(0, 183, 255, 1)'
}))
  
export default MyAppBar;