"use client"
import { IconButton } from "@mui/material";
import React, { useContext } from "react"
import { MenuButtonIconContext } from "./menuButtonIcon";

import CloseIcon from '@mui/icons-material/Close';
const CloseButton = () => {

    const handleClose = useContext(MenuButtonIconContext)?.handleClose;
    return (
        <IconButton onClick={handleClose}>
            <CloseIcon />
        </IconButton>
    )
};

export default CloseButton;
