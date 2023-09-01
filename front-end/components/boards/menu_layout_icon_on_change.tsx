
"use client"
import { Box, IconButton, Menu, Typography } from "@mui/material";
import React, { ReactNode, useContext } from "react"


import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { CustomGlobalStyle } from "../styles/customGlobalStyle";
import { MenuButtonIconOnChangeContext } from "./menu_button_icon_on_change";


type Props = {
    children: ReactNode,
    title?: string,
    handleBack?: () => void
}




const MenuLayoutOnChangeIcon = ({ children, title, handleBack }: Props) => {
    const context = useContext(MenuButtonIconOnChangeContext);

    const open = context?.open || false
    const handleClose = context?.handleClose
    const anchorEl = context?.anchorEl
    return (
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}

            MenuListProps={{
                'aria-labelledby': 'basic-button',
            }}
            sx={{
                "&.MuiList-root,.MuiList-padding": {
                    padding: 0,
                    paddingTop: 2,
                }
            }}

        >
            {title ? <Box display={"flex"} width={"100%"} position="relative" justifyContent={"center"}>
                {handleBack != undefined ?
                    <IconButton onClick={handleBack} sx={{
                        position: "absolute", top: 0,
                        bottom: 0,
                        margin: "auto 2px",
                    }} >
                        <ArrowBackIcon />
                    </IconButton> : null}

                <Typography textAlign={"center"} sx={CustomGlobalStyle.text16gray}>{title}</Typography>
                <IconButton onClick={handleClose} sx={{
                    position: "absolute", top: 0,
                    bottom: 0,
                    right: "2px",
                    margin: "auto 2px",
                }} >
                    <CloseIcon />
                </IconButton>
            </Box> : null
            }
            <Box display={"flex"}
                minWidth={"308px"}
                justifyContent={"flex-start"}
                flexDirection={"column"} sx={
                    {
                        overflow: 'auto',
                        borderRadius: "8px",
                        boxShadow: "0px 8px 12px #091e4226",
                        '&::-webkit-scrollbar': { display: 'none' },
                        msOverflowStyle: 'none',
                        scrollbarWidth: 'none',
                    }

                }>
                {children}
            </Box>


        </Menu >
    )
};

export default MenuLayoutOnChangeIcon;

