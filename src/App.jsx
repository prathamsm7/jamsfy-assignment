import { useState } from 'react';
import { signInWithGoogle } from './Components/firebase';
import Navbar from './Components/Navbar';
import { Button, Container } from '@mui/material';
import Dashboard from './Components/Dashboard';
import { Box } from '@mui/system';
import GoogleIcon from '@mui/icons-material/Google';
import { LoadingButton } from '@mui/lab';

function App() {
  const [user, setUser] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [userLoading, setUserLoading] = useState(false);

  async function handleLogin() {
    setUserLoading(true);

    try {
      const res = await signInWithGoogle();

      let { displayName, email, photoURL } = res;
      setUserInfo((prev) => ({ ...prev, displayName, email, photoURL }));

      // setTimeout(() => {
      setUser(!user);
      setUserLoading(false);
      // }, 1000);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <Container sx={{ width: '100%', padding: '0px !important' }}>
      {user ? (
        <>
          <Navbar userInfo={userInfo} />
          <Dashboard userInfo={userInfo} />
        </>
      ) : (
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            height: '100vh',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {userLoading ? (
            <LoadingButton
              loading
              variant='outlined'
              sx={{
                backgroundColor: '#1976d2',
                color: 'white !important',
                fontWeight: 'bold',
              }}
            >
              Logging In...
            </LoadingButton>
          ) : (
            <Button
              onClick={handleLogin}
              variant='contained'
              sx={{
                backgroundColor: '#1976d2',
                color: 'white',
                fontWeight: 'bold',
              }}
            >
              <GoogleIcon
                sx={{
                  paddingRight: '10px',
                }}
              />
              | Sign In With Google
            </Button>
          )}
        </Box>
      )}
    </Container>
  );
}

export default App;
