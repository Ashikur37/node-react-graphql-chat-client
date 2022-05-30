import { useMutation, useQuery, useSubscription } from '@apollo/client';
import { AppBar, Box, IconButton, Toolbar,Avatar, Typography, TextField,Stack } from '@mui/material';
import React, { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { GET_MSG } from '../graphql/queries';
import MessageCard from './MessageCard';
import SendIcon from '@mui/icons-material/Send';
import { CREATE_MSG } from '../graphql/mutations';
import { MSG_SUB } from '../graphql/subscriptions';

export default function ChatScreen() {
   const {id,name}= useParams();
   const [text,setText] = useState('');
   const [messages,setMessages] = useState([]);
   const [
     sendMessage
   ] = useMutation(CREATE_MSG,{
     onCompleted: (data) => {
        setMessages([...messages,data.createMessage])
      }
   });

    const {data:subData}= useSubscription(MSG_SUB,{
      onSubscriptionData:({subscriptionData})=>{
        console.log(subscriptionData.data.messageAdded)
        setMessages([...messages,subscriptionData.data.messageAdded])
      } 
    });
    if(subData){
      console.log(subData)
    }
    const {data,loading,error}=useQuery(GET_MSG,{
      variables:{
          receiverId:parseInt(id)
      },
      onCompleted(data){
        setMessages(data.messagesByUser);
      }
    });

    if(data){
      console.log(data);
    }
  return (
   <Box 
   flexGrow={1}
   >
     <AppBar position='static' 
     sx={{backgroundColor:"white",boxShadow:0}}
     >
        <Toolbar>
        <Avatar
       src={`https://avatars.dicebear.com/api/initials/${name}.svg`}
       sx={{
           width:"32px",
           height:"32px",
           mr:2
       }}
       />
       <Typography variant='h6' color="black">
          {name}
        </Typography>
        </Toolbar>
     </AppBar>
     <Box backgroundColor="#f5f5f5" height="80vh" padding="10px" sx={{
       overflowY:"auto"
     }}>
       {
         loading?<Typography variant="h6">Loading...</Typography>:
         messages.map(item=><MessageCard
         key={item.id}
            text={item.text}
            date={new Date(item.createdAt).toLocaleTimeString()}
            direction={item.senderId===parseInt(id)?"right":"left"}
           /> )
       }
      
        
       
     </Box>
     <Stack direction="row">
     <TextField 
     name='message'
     placeholder='Type your message'
     variant='standard'
     fullWidth
     multiline
     value={text}
     onChange={(e)=>setText(e.target.value)}
     rows={2}
     />
     <SendIcon fontSize='large' onClick={
       ()=>{
          sendMessage({
            variables:{
              receiverId:parseInt(id),
              text
            }
          });
          setText('');
       }
     }/>
     </Stack>
    </Box>
  )
}
