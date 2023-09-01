"use client"
import { Box, Typography } from "@mui/material";
import React from "react"
import SelectField from "./select_field";
import { useForm } from "react-hook-form";
import SelectFieldNormal from "./select_field_normal";
type WorkspacePayload = {
    name: string,
    type: string,
    description: string,
}
const FormCreateWorkSpace = () => {
    // const { control, handleSubmit, watch, setValue, register, setError, formState: { errors } } = useForm<WorkspacePayload>(
    //     {

    //         // mode: "onChange",
    //         // reValidateMode: "onChange",
    //         defaultValues: {
    //             name: '',
    //             type: '',
    //             description: ''
    //         },
    //         // resolver: yupResolver(boardSchema),
    //     })
    return (
        <Box display="flex" flexDirection="column" component={"form"}>
            <Typography>Let&apos;s build a Workspace</Typography>
            <Typography>Boost your productivity by making it easier for<br />everyone to access boards in one location</Typography>
            <Box display={"flex"} flexDirection={"column"}>
                <Typography>Workspace name</Typography>
                {/* <SelectFieldNormal control={control} name="type" options={["Engineering-IT", "Human Resources", "Education", "Operations", "Marketing", "Sales CRM", "Small Business", "Other"]} /> */}
            </Box>
        </Box>
    )
};

export default FormCreateWorkSpace;
