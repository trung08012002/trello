import { Box, Divider, IconButton, Stack, Typography } from "@mui/material";
import React, { useState } from "react"
import { Board } from "type";
import workSpaces from "../sidebar/workSpaces";
import ItemWorkSpace from "./item_work_space";
import MenuOneItemLayout from "./menu_one_item_layout";
import ItemBoard from "./item_board";
import { Start } from "@mui/icons-material";
import MenuLayout from "./menu_layout";
import ShowButton from "./showButton";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CustomGlobalStyle } from "../styles/customGlobalStyle";


async function getNotifications(): Promise<Board[]> {

    const response = await fetch(`http://localhost:3002/notifications`, { next: { revalidate: 10 } });

    const data = await response.json();
    if (data === null) {
        return []
    }
    return data;
}



const MenuNotification = async () => {

    // const Notifications=await getNotifications();
    return (
        <MenuLayout
        >
            <Box paddingX={"10px"} width={"437px"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                <Typography sx={CustomGlobalStyle.text20sublet}>Notifications</Typography>
                <Stack display="flex" flexDirection="row" gap={1} alignItems={"center"}>
                    <Typography sx={CustomGlobalStyle.text12sublet}>Only show unread</Typography>
                    <ShowButton />
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </Stack>
            </Box>
            <Divider />



        </MenuLayout>
    )
};

export default MenuNotification;
