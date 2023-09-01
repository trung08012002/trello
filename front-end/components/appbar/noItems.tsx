import { Box, Typography } from "@mui/material";
import React from "react"
import { CustomGlobalStyle } from "../styles/customGlobalStyle";

type itemType = {
    img: string,
    text: string
}

const NoItems = ({ img, text }: itemType) => {
    return (
        <Box display={"flex"} flexDirection={"column"} width="20rem" padding="18px 14px">
            <Box component={"img"} src={img} sx={{ objectFit: "fill", mb: "20px" }} width={"100%"} />
            <Typography sx={CustomGlobalStyle.text15bluelight} textAlign={"center"}>{text}</Typography>
        </Box>
    )
};

export default NoItems;
