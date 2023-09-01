"use client"
import { Box, IconButton, ListItem, Menu, Typography } from "@mui/material";
import React, { ReactNode, useContext } from "react"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ParentContextButtonPopup } from "./button_pop_up";

import { CustomGlobalStyle } from "../styles/customGlobalStyle";
import CloseIcon from '@mui/icons-material/Close';
type Props = {
    children: ReactNode[],
    title: string | undefined,
    handleBack?: () => void
}




const MenuCustomLayout = ({ children, title, handleBack }: Props) => {
    const { open, handleClose, anchorEl } = useContext(ParentContextButtonPopup);


    return (
        <Menu
            disableScrollLock={true}
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
            {title ? <Box display={"flex"} width={"100%"} justifyContent={"space-between"} alignItems={"center"} textAlign={"center"}>
                {handleBack != undefined ?
                    <IconButton onClick={handleBack}>
                        <ArrowBackIcon />
                    </IconButton> : null}

                <Typography sx={CustomGlobalStyle.text16gray}>{title}</Typography>
                <IconButton onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
            </Box> : null}
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
                        scrollbarHeight: 'none',
                    }

                }>
                {children}
            </Box>


        </Menu>
    )
};

export default MenuCustomLayout;

