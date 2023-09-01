"use client"

import React from "react"
import MenuButtonIcon from "./menuButtonIcon";
import MenuTheme from "./menuTheme";

import ModeIcon from "@/public/images/mode.svg"
import { Box } from "@mui/material";
const ButtonTheme = () => {

    return (

        <MenuButtonIcon icon={<ModeIcon />}>
            <MenuTheme />
        </MenuButtonIcon>
    )
};

export default ButtonTheme;
