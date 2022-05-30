import { Box,Stack,Typography,Button,TextField,Card,CircularProgress,Alert } from "@mui/material";
import React,{useState,useRef} from "react";
import {useMutation} from '@apollo/client'
import { SIGNUP_USER,LOGIN_USER } from "../graphql/mutations";

const AuthScreen = ({isShowLogin}) => {
    const [showLogin,setShowLogin] = useState(true);
    const [formData,setFormData] = useState({});
    const authForm = useRef(null);
    const[signupUser,{data:signupData ,loading:signupLoading,error:signupError}] =useMutation(SIGNUP_USER);
    const[signinUser,{data:signinData ,loading:signinLoading,error:signinError}] =useMutation(LOGIN_USER,{
        onCompleted(data){
            localStorage.setItem('token',data.signinUser.token);
            isShowLogin(false);
        }

    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        });
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        if(showLogin){
            signinUser({
                variables:{
                    userSignin:{
                        email:formData.email,
                        password:formData.password
                    }
                }
            });
        }
        else{
            signupUser({variables:{userNew:formData}});
        }
    }
    return (
        (signupLoading||signinLoading)?<Box display="flex" justifyContent="center" alignItems="center" height="100vh">

            <Box textAlign="center">
            <CircularProgress/>
            <Typography variant="h6">
                    Authenticating
            </Typography>
            </Box>
        </Box>: <Box 
        ref={authForm}
        component="form" onSubmit={handleSubmit}
        display="flex" justifyContent="center"  alignItems="center"
        height="80vh"

        >
           <Card
           variant="outlined"
           sx={{
               padding:"10px",
           }}
           >
           <Stack
            direction="column"
            spacing={2}
            sx={{width:"400px"}}
            >
                {signupData&& <Alert severity="success">
                    {signupData.signupUser.name} signuped
                </Alert>
                    }
                    {signupError&& <Alert severity="error">
                    {signupError.message} 
                </Alert>
                    }

{signinError&& <Alert severity="error">
                    {signinError.message} 
                </Alert>
                    }
                <Typography variant="h5">
                    Please  {showLogin ? "Login" : "Signup"}
                </Typography>
                {!showLogin && 
                <TextField
                name="name"
                label="Name" variant="standard"
                onChange={handleChange}
                required
                />
}
                <TextField
                type={'email'}
                name="email"
                label="Email" variant="standard"
                onChange={handleChange}
                required
                />
                <TextField
                type={'password'}
                name="password"
                label="Password" variant="standard"
                onChange={handleChange}
                required
                />
                <Typography
                textAlign="center"
                onClick={()=>{
                    authForm.current.reset();
                    setShowLogin(!showLogin);
                }}
                variant="subtitle1">
                    {showLogin ? "Don't have an account?" : "Already have an account?"}
                </Typography>
                <Button variant="outlined" type="submit">
                    Submit
                </Button>
                </Stack>
           </Card>
        </Box>
    );
    }

    export default AuthScreen;