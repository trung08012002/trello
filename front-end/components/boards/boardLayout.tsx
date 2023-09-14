"use client"
import { Container, Box, IconButton } from "@mui/material";
import React, { useState } from "react"
import { themeOptions } from "../../src/app/them";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';


import { styled } from '@mui/material/styles';
import CustomDrawer from "./Drawer";
export const drawerWidth = 240;
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,

    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),

    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: `${drawerWidth}px`,
    }),
}));

type boardLayoutType = {
    boardBar: React.ReactNode,
    boardContainer: React.ReactNode,
}


const BoardLayout = ({ boardBar, boardContainer }: boardLayoutType) => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const handleOpenDrawer = () => {
        setOpenDrawer(true);
    }
    const handleCloseDrawer = () => {
        setOpenDrawer(false);
    }
    return (
        <Container disableGutters maxWidth={false}
            sx={{ height: '100vh', display: "flex" }}>
            {!openDrawer && <Box sx={{ position: "relative", backgroundColor: "hsla(60,1.4%,86.5%,0.9)", height: "100vh", width: "14px" }}>
                <IconButton onClick={handleOpenDrawer} style={{ fontSize: "large" }} sx={{
                    zIndex: 1000, position: "absolute", top: "55px",
                    right: "-21px",
                }}><PlayCircleOutlineIcon /></IconButton>
            </Box>}
            <CustomDrawer openDrawer={openDrawer} handleCloseDrawer={handleCloseDrawer} />


            <Main open={openDrawer}>

                <Box sx={{
                    width: "100%",
                    height: () => themeOptions.trello.appBarHeight,


                }}>
                    boad Header

                </Box>
                <Box
                    sx={{
                        width: "100%",
                        height: () => themeOptions.trello.boardBarHeight
                    }}
                >
                    {boardBar}
                </Box>
                <Box sx={{
                    width: "100%",
                    height: () => `calc(100vh - ${themeOptions.trello.boardBarHeight} - ${themeOptions.trello.appBarHeight})`
                }}>{boardContainer}</Box>

            </Main>

        </Container>
    )
};

export default BoardLayout;
