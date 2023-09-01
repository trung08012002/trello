"use client"
import { useTheme } from "@emotion/react";
import { Box, Button } from "@mui/material";

import React from "react"

const ButtonTrello = () => {

    return (
        <Button>
            <Box component={"img"} src={"../../images/trello-white.gif"} width={60} style={{ fill: "white" }} sx={{

                position: "relative",

                backgroundBlendMode: "screen",
                "&::before": {
                    color: "white",
                    display: "block",
                    content: '""',
                    position: "absolute",
                    height: "inherit",
                    width: "inherit",
                }
            }}>

            </Box>
        </Button>
    )
};

export default ButtonTrello;
