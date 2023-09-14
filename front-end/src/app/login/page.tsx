"use client"
import { Box } from "@mui/material";
import React from "react"
import LoginForm, { LoginPayLoad } from "@/components/login/login-form";
import axiosClient from "../api/axiosClient";
import { setCookie } from "cookies-next";
import { useRouter } from 'next/navigation'





const LoginPage = () => {
    const router = useRouter()
    const onSubmit = async (payload: LoginPayLoad) => {
        try {
            const res = await axiosClient.post('/users/login', { ...payload });

            if (res.status === 200) {
                const { accessToken, refreshToken, ...newData } = res.data;
                localStorage.setItem('refreshToken', refreshToken)
                localStorage.setItem('inforUser', JSON.stringify(newData))
                router.push('/boards');
            }

        }
        catch (err) {
            console.log(err)
        }
    }
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            flexDirection={"column"}
            sx={{ background: "linear-gradient(45deg,#61D9DE 10%,#E33FF4 60%)" }}
        >

            <LoginForm onSubmit={onSubmit} />
        </Box>
    )
};

export default LoginPage;
