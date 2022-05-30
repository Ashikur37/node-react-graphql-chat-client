import React from 'react'
import { Box, Divider,Typography,Stack, Button } from "@mui/material";
import UserCard from './UserCard';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../graphql/queries';
// import {LogoutIcon} from '@mui/icons-material'

export default function SideBar({isShowLogin}) {

    const {loading,data,error}=useQuery(GET_USER);
    if(data){
        console.log(data);
    }
   
  return (
    
    loading?<Typography variant="h6">Loading...</Typography>:
    <Box
    backgroundColor="#f7f7f7"
    height="100vh"
    width="250px"
    padding="10px"
    >
        <Stack direction="row" justifyContent="space-between">
        <Typography variant="h6"> Chat </Typography>
        <Button onClick={()=>{
            localStorage.removeItem('token');
            isShowLogin(true);
        }}>
            Logout
        </Button>

        </Stack>
        <Divider/>
        {data.users.map(item=><UserCard key={item.id} item={item} />)}
    </Box>
  )
}
