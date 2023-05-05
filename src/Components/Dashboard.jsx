import { Card, CardContent, Typography, Avatar } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import ProductTable from './ProductTable';

const Dashboard = ({ userInfo }) => {
  return (
    <Box sx={{ padding: '20px' }}>
      <Typography
        sx={{ fontSize: 16, fontWeight: 'bold', color: 'blueviolet' }}
        color='text.secondary'
        gutterBottom
      >
        Dashboard
      </Typography>
      <Card
        varient='outlined'
        sx={{
          width: '400px',
          display: 'flex',
          marginBottom: '20px',
          backgroundColor: '#1c1731',
          color: '#627eea',
        }}
      >
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color='white' gutterBottom>
            Loged In As
          </Typography>
          <Typography>{userInfo.displayName}</Typography>
          <Typography
            sx={{ fontSize: 14, marginTop: '20px' }}
            color='white'
            gutterBottom
          >
            Email
          </Typography>
          <Typography>{userInfo.email}</Typography>
        </CardContent>
        <CardContent
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'center',
          }}
        >
          {userInfo.photoURL ? (
            <Avatar
              alt='Remy Sharp'
              sx={{ marginRight: '20px', width: '60px', height: '60px' }}
              src={`${userInfo.photoURL}`}
            />
          ) : (
            <Avatar
              alt='Remy Sharp'
              sx={{ marginRight: '20px', width: '60px', height: '60px' }}
            >
              {userInfo.displayName?.charAt(0)}
            </Avatar>
          )}
        </CardContent>
      </Card>
      <Typography
        sx={{ fontSize: 16, fontWeight: 'bold', color: 'blueviolet' }}
        color='text.secondary'
        gutterBottom
      >
        All Products
      </Typography>
      <ProductTable />
    </Box>
  );
};

export default Dashboard;
