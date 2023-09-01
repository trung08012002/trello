"use client"
import { Avatar, Box, Button, GlobalStyles, IconButton, InputAdornment, Typography } from "@mui/material";
import React, { useState } from "react"
import { useForm } from "react-hook-form";
import InputField from "./input-field";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { CustomGlobalStyle } from "../styles/customGlobalStyle";
import OtherLoginButton from "./iconButton";
import { signIn, useSession } from "next-auth/react";
export interface LoginPayLoad {
    email: string,
    password: string
}

const loginSchema = yup.object({
    email: yup.string().required("Please enter email").trim().email(),
    password: yup.string().required('Please enter your password')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            "Password must be min 8 characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
}).required();

export interface LoginFormProps {
    onSubmit?: (payload: LoginPayLoad) => void;
}

const LoginForm = ({ onSubmit }: LoginFormProps) => {
    const [showPassword, setShowPassword] = useState(false)
    const { control, handleSubmit } = useForm<LoginPayLoad>({
        defaultValues: {
            email: '',
            password: ''
        },
        resolver: yupResolver(loginSchema),
    })
    const providers = [
        { name: 'facebook', icon: '../../images/facebook.png' },
        { name: 'github', icon: '../../images/github.png' },
        { name: 'google', icon: '../../images/social.png' }
    ]
    async function handleLoginSubmit(payload: LoginPayLoad) {
        console.log(payload)
        onSubmit?.(payload)

    }
    function handleClickShowPassword() {
        setShowPassword((showPassword) => !showPassword)
    }
    const handleOAuthSignIn = (provider: string) => signIn(provider)
    return (
        <Box component="form" sx={{ backgroundColor: "#FFFFFF", padding: "50px 20px", borderRadius: "10px" }} display={"flex"} flexDirection={"column"} alignItems={"center"} onSubmit={handleSubmit(handleLoginSubmit)} width={'20rem'}>
            <Typography sx={CustomGlobalStyle.text25black}>Login</Typography>
            <Box display={'flex'} flexDirection={"column"} sx={{ mt: "2rem" }} width={"100%"} ><Typography>Email</Typography>
                <InputField name="email" control={control}
                    variant="standard"

                    InputProps={{

                        startAdornment: <EmailIcon />
                    }}
                /></Box>
            <Box mt={"10px"} display={'flex'} flexDirection={"column"} width={"100%"}>
                <Typography>Password</Typography>
                <InputField

                    type={showPassword ? 'password' : 'text'} name="password" control={control}
                    variant="standard"
                    InputProps={{
                        startAdornment: <LockIcon />,
                        endAdornment: <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                edge="end">
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }}
                />
            </Box>
            <Button sx={{ alignSelf: "flex-end" }}><Typography sx={CustomGlobalStyle.text9gray}>Forgot password?</Typography></Button>

            <Button type="submit" style={{
                width: "80%",
                borderRadius: "50px",

                color: "#FFFFFF",
                background: "linear-gradient(45deg, #68CFDE 30%, #E33FF4 90%)"
            }}>Login</Button>
            <Typography sx={{ mt: "3rem" }}>Or sign up using</Typography>
            <Box display={"flex"} flexDirection={"row"}>
                {
                    // eslint-disable-next-line react/jsx-key
                    providers.map(({ name, icon }, index) => <OtherLoginButton key={index} avatar={icon} name="facebook" width={25} height={25} onClick={async () => { await handleOAuthSignIn(name) }} />)
                }


            </Box>
            <Box sx={{ mt: "5rem" }} display={"flex"} flexDirection={"row"} alignItems={"center"}><Typography>Don&apos;t have account?</Typography>
                <Button onClick={() => { }} >Sign Up</Button>
            </Box>
        </Box>
    );
}
export default LoginForm;
