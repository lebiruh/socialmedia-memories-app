import { Button, styled, TextField } from "@mui/material";
// import {Container} from '@mui/material';

const FormInput = styled('form')(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',

}))

export const TextFieldInput = styled(TextField) (() => ({
  width: '97%',
  margin: '10px 0'
}))

export const DivInput = styled('div') (() => ({
  width: '100%',
  margin: '10px'
}))

export const ButtonSubmit = styled(Button)(() => ({
  marginBottom: 10,
  marginTop: 10
}))



  
export default FormInput;