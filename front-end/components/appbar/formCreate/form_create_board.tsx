"use client"
import axiosClient from "@/app/api/axiosClient";
import { Box, Button, ImageList, ImageListItem, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react"
import { BackgroundImage } from "type";
import InputField from "../../login/input-field";
import { Form, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import ListImage from "./list_image";
import SelectField from "./select_field";
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';
import PublicIcon from '@mui/icons-material/Public';
import PeopleIcon from '@mui/icons-material/People';
import { Link } from "react-router-dom";
type FormCreateBoardType = {
    onSubmit?: (payload: BoardPayload) => void
}
async function getAllImages() {
    try {
        const response = await fetch('http://127.0.0.1:3002/images/4')
        console.log(response)
        const data = await response.json();


        return data.images
    } catch (err) {
        console.log(err)
    }
}
export interface BoardPayload {
    backgroundImage: any
    title: string,
    visibility: string
}
const boardSchema = yup.object({
    title: yup.string().required("👋 Board title is required"),
    visibility: yup.string(),
    backgroundImage: yup.object()
})

const FormCreateBoard = ({ onSubmit }: FormCreateBoardType) => {
    const options = [
        { icon: <EnhancedEncryptionIcon />, name: "Private", description: 'Only board members can see and edit\nthis board' },
        { icon: <PeopleIcon />, name: "Workspace", description: 'All members of the\n workspace Workspace can see and\n edit this workspace' },
        { icon: <PublicIcon />, name: "Public", description: 'Anyone on the internet can see this\nboard. Only board members can edit' }
    ]
    const { control, handleSubmit, watch, setValue, register, setError, formState: { errors } } = useForm<BoardPayload>(
        {

            mode: "onChange",
            reValidateMode: "onChange",
            defaultValues: {
                title: '',
                visibility: options[1].name,
                backgroundImage: ''
            },
            resolver: yupResolver(boardSchema),
        })
    const [images, setImages] = useState<Array<BackgroundImage>>([])
    useEffect(() => {
        getAllImages().then(data => setImages(data))
        setError("title", { type: 'custom', message: "👋 Board title is required" })
    }, [])

    async function handleCreatSubmit(payload: BoardPayload) {
        console.log(payload)
        onSubmit?.(payload)
    }
    return (

        <Box p={1} display="flex" flexDirection={"column"} component={"form"} onSubmit={handleSubmit(handleCreatSubmit)}>
            <Box
                sx={{ position: 'relative' }}
                marginY={"20px"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
            >

                <Box component={"img"} m={1} src={watch("backgroundImage")?.url ?? images[0]?.url} sx={{ position: 'absolute', height: "127px", width: "70%" }}></Box>
                <Box component={"img"} m={1} src={"/../../images/columns.png"} sx={{ zIndex: 1000, width: "50%" }}></Box>

            </Box>
            <Typography>Background</Typography>
            <Stack sx={{
                width: "100%", height: 45,
                gap: 1
            }} flexDirection={"row"}  >
                <ListImage images={images} setValue={setValue} register={register} />
            </Stack>
            <Box display={"flex"} flexDirection={"column"}>
                <Box display={"flex"} gap={"1px"}>
                    <Typography>Board title</Typography>
                    <Typography color={"red"}>*</Typography>
                </Box>

                <InputField name="title" control={control} size="small" ></InputField>

            </Box>
            <Box display={"flex"} flexDirection={"column"} sx={{ mb: 2 }}>
                <Typography>Visibility</Typography>

                <SelectField name="visibility" control={control}
                    size={"small"}
                    options={options} />

            </Box>
            <Button disabled={errors.title != undefined ? true : false} style={{ backgroundColor: errors.title != undefined ? "#091e4208" : " #0c66e4", color: errors.title != undefined ? "#091e424f" : "white" }} type="submit">Create</Button>
            <Button sx={{ mt: 2 }} disabled={errors.title != undefined ? true : false} style={{ backgroundColor: " #091e420f", color: "#091e424f" }}>Start with a template</Button>
            <Typography>By using images from Unsplash,you agree to their<br />
                <Typography component={"a"} href="/" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>license</Typography> and  <Typography component={"a"} href="/" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Term of Service</Typography>
            </Typography>
        </Box>

    )
};

export default FormCreateBoard;
