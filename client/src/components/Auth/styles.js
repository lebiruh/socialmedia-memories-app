import {styled, Paper, Button} from '@mui/material';

const PaperContainer = styled(Paper)(() => ({
  marginTop: '16px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '4px'
}))

export const Form = styled('form')(() => ({
  width: '100%',
  marginTop: '6px'
}))

export const ButtonSign = styled(Button)(() => ({
  marginTop: '16px',
  marginBottom: '16px'
}))

export default PaperContainer