import { Box, Button, Typography } from "@mui/material";
import React, { ReactNode } from "react"
import { CustomGlobalStyle } from "../styles/customGlobalStyle";

type ItemCreateType = {
    text: string,
    icon: ReactNode,
    description: string,
    onClick: () => void
}

const ItemCreate = ({ text, description, icon, onClick }: ItemCreateType) => {

    return (
        <Button onClick={onClick} fullWidth>
            <Box display="flex" flexDirection="column" width={"100%"}>
                <Box display={"flex"}>
                    {icon}

                    <Typography sx={CustomGlobalStyle.text13bluegray} ml={1}>{text}</Typography></Box>
                <Typography whiteSpace={"pre-line"} sx={CustomGlobalStyle.text10bluegray} textAlign={"start"}>{description}</Typography>
            </Box>
        </Button>
    )
};

export default ItemCreate;
