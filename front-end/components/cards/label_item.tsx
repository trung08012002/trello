
import { Box, Checkbox } from "@mui/material";
import React from "react"

const LabelItem = ({ check, color, title }: { check: boolean, color: string, title: string }) => {

    return (
        <Box display={"flex"} alignItems={"center"}>
            <Checkbox checked={check}></Checkbox>
            <Box></Box>
        </Box>
    )
};

export default LabelItem;
