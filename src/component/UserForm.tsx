import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography } from '@mui/material';

function UserForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const Navigate = useNavigate();

  const handleSubmit = () => {
    if (name && phone && email) {
      // Save user details in local storage
      localStorage.setItem('name', name);
      localStorage.setItem('phone', phone);
      localStorage.setItem('email', email);

      // Redirect to the second page
      Navigate('/second-page');
    }
    else if(!name || !phone || !email){
        alert("Please enter your details before accessing the second page.");
    }
  };

  return (

    <Container>
      <Typography variant="h4" gutterBottom>
        Enter Your Details
      </Typography>
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </Container>
  );
}

export default UserForm;