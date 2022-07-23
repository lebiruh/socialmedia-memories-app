import { Card,  CardActions,  CardMedia,  styled, Typography, ButtonBase } from "@mui/material";
// import {Container} from '@mui/material';

export const CardContainer = styled(Card)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  borderRadius: '15px',
  height: '100%',
  position: 'relative'
}))


export const DivOverlay = styled('div')(() => ({
  position: 'absolute',
  top: '5px',
  left: '20px',
  color: 'white'
}))

export const DivOverlay2 = styled('div')(() => ({
  position: 'absolute',
  top: '10px',
  right: '20px',
  color: 'white',
}))

const CardMediaContainer = styled(CardMedia)(() => ({
  // height: 0,
  paddingTop: '0%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  backgroundBlendMode: 'darken'
}))

export const CardActionsContainer = styled(CardActions)(() => ({
  display: 'flex',
  padding: '0 16px 8px 16px',
  justifyContent: 'space-between'
}))


export const DivDetails = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  margin: '20px'
}))

export const TypographyTitle = styled(Typography)(() => ({
  padding: '0 16px',  
}))

export const TypographyMessage = styled(Typography)(() => ({
  display: 'block',
  textAlign: 'initial'  
}))

export const ButtonBaseContainer = styled(ButtonBase)(() => ({
  display: 'block',
  textAlign: 'initial'  
}))




  
export default CardMediaContainer;