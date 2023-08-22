import  { useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import PostTable from './PostTable';
import Hiearchial from './Hiearchial';

function SecondPage() {
  const Navigate = useNavigate();

  useEffect(() => {
    // Check if user details are present in local storage
    const name = localStorage.getItem('name');
    const phone = localStorage.getItem('phone');
    const email = localStorage.getItem('email');

    if (!name || !phone || !email) {
      // Redirect to the first page with a message
      alert("Please enter your details before accessing the second page.");
      Navigate('/');
    }
  }, []);

  return (
    <Container>
      <Typography variant="h4">Welcome to the Second Page</Typography>
      <Typography> <PostTable/> </Typography>
      <Typography><Hiearchial/> </Typography>
    </Container>
  );
}

export default SecondPage;