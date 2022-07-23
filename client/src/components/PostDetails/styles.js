import { Paper } from '@mui/material';
import { styled } from "@mui/material/styles"; 

const DivCard = styled('div')(({theme}) => ({
     display: 'flex',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      flexDirection: 'column',
    }
  }))

export const DivSection = styled('div') (() => ({
  borderRadius: '20px',
  margin: '10px',
  flex: 1,
}))

export const DivImageSection = styled('div') (({theme}) => ({
  marginLeft: '20px',
  width: '60%',
  [theme.breakpoints.down('sm')]: {
    marginLeft: 0,
    width: '100%'
  },
}))

export const ImageMedia = styled('img') (() => ({
  borderRadius: '20px',
  objectFit: 'cover',
  width: '100%',
  maxHeight: '600px',
}))

export const PaperLoading = styled(Paper) (() => ({
  display: 'flex', 
  justifyContent: 'center', 
  alignItems: 'center', 
  padding: '20px', 
  borderRadius: '15px', 
  height: '39vh',
}))

export const DivRecommendedPosts = styled('div') (({theme}) => ({
  display: 'flex',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
}))


export default DivCard;


