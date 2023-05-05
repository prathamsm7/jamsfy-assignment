import { Avatar, Typography } from '@mui/material';
import { Box } from '@mui/system';

const Navbar = ({ userInfo }) => {
  return (
    <Box
      className='navbar'
      sx={{
        width: '100%',
        height: '70px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Typography
        sx={{ marginLeft: '20px', fontSize: '28px', fontWeight: 'bold' }}
        className='logo'
      >
        MyStore
      </Typography>
      {userInfo.photoURL ? (
        <Avatar
          alt='Remy Sharp'
          sx={{ marginRight: '20px' }}
          src={`${userInfo.photoURL}`}
        />
      ) : (
        <Avatar alt='Remy Sharp' sx={{ marginRight: '20px' }}>
          P
        </Avatar>
      )}
    </Box>
  );
};

export default Navbar;
