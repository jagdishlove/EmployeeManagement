import { Box, Typography } from '@mui/material'
import React from 'react'
import UserHerders from './userHeaders'
import UserListPage from './userListPage.js'

export default function user() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Users
      </Typography>
      <div
        style={{
          width: "100%",
          margin: "auto",
          marginBottom: "18px",
          border: "1px solid #008080",
        }}
      />
      <UserHerders />
      <UserListPage />
    </Box>
  )
}