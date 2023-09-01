
import { Box, Button, Typography } from "@mui/material";
import React, { ReactNode } from "react"
import { CustomGlobalStyle } from "../styles/customGlobalStyle";
import DoneIcon from '@mui/icons-material/Done';
type ItemCreateType = {
    text: string,
    icon: ReactNode,
    description: string,
    iconOnChoose?: ReactNode,
    onClick: () => void
}

const ItemVisibility = ({ text, description, icon, onClick, iconOnChoose }: ItemCreateType) => {

    return (
        <Button onClick={onClick} fullWidth>
            <Box display="flex" flexDirection="column" width={"100%"}>
                <Box display={"flex"} alignItems={"center"}>
                    {icon}

                    <Typography sx={CustomGlobalStyle.text13bluegray} ml={1}>{text}</Typography>
                    {iconOnChoose}
                </Box>
                <Typography whiteSpace={"pre-line"} sx={CustomGlobalStyle.text10bluegray} textAlign={"start"}>{description}</Typography>
            </Box>
        </Button>
    )
};

export default ItemVisibility;

