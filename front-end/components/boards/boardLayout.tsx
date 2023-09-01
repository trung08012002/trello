"use client"
import { Container, Box } from "@mui/material";
import React from "react"
import { themeOptions } from "../../src/app/them";


type boardLayoutType = {
    boardBar: React.ReactNode,
    boardContainer: React.ReactNode,
}

const BoardLayout = ({ boardBar, boardContainer }: boardLayoutType) => {

    return (
        <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>

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
        </Container>
    )
};

export default BoardLayout;
