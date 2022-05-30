import React from 'react'
import { Box } from "@mui/material";
import SideBar from '../components/SideBar';
import {Routes,Route} from 'react-router-dom';
import Welcome from '../components/Welcome';
import ChatScreen from '../components/ChatScreen.js';

const AllRoutes=()=>{
    return(
        <Routes>
            <Route
            path="/"
            element={<Welcome />}
            />
            <Route
            path="/:id/:name"
            element={<ChatScreen />}
            />
        </Routes>
    )
}
export default function HomeScreen({isShowLogin}) {
  return (
    <Box 
    display="flex"
    >
        <SideBar  isShowLogin={isShowLogin}/>
        <AllRoutes/>
    </Box>
  )
}
