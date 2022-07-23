
import {Container} from '@mui/material';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';
import Navigate from './components/Navigation/Navigation';


function App() {

  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <Router>
      <Container maxwidth='xl'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Navigate/>} />
          <Route path='/posts' exact element={<Home/>} />
          <Route path='/posts/search' exact element={<Home/>} />
          <Route path='/posts/:id' element={<PostDetails />} />
          <Route path='/auth' exact element={(!user ? <Auth/> : <Navigate/>)}/>
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
