import { Box, Typography } from '@mui/material'
import React from 'react'

export default function MessageCard({text,date,direction}) {
  return (
    <Box display="flex" justifyContent={direction}>
        <Box>
        <Typography variant='subtitle2'
        backgroundColor="white"
        padding="5px"
        >
            {text}
        </Typography>
        <Typography variant='caption'
        >
            {date}
        </Typography>
    </Box>
    </Box>
  )
}
