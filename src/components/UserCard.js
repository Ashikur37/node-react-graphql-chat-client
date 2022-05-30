import { Avatar, Stack, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function UserCard({item:{id,name}}) {
   const navigate= useNavigate();
  return (
   <Stack 
   className='usercard'
   direction="row"
   spacing={2}
   sx={{py:1}}
   alignItems="center"
   onClick={()=>navigate(`/${id}/${name}`)}
   >
       <Avatar
       src={`https://avatars.dicebear.com/api/initials/${name}.svg`}
       sx={{
           width:"32px",
           height:"32px",
       }}
       />
       <Typography variant='subtitle2'>
              {name}
       </Typography>
   </Stack>
  )
}
