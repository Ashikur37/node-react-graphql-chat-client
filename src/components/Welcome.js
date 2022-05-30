import { Stack,Typography } from '@mui/material'
import React from 'react'

export default function Welcome() {
  return (
    <Stack
    justifyContent="center"
    alignItems="center"
    flexGrow={1}
    >
        <Typography variant='h2'>
            Welcome to Chat App
        </Typography>
    </Stack>
  )
}
