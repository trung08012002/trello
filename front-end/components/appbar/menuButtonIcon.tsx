"use client"
import { Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import React, { ReactNode, useState, createContext } from "react"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { CustomGlobalStyle } from "../styles/customGlobalStyle";

type Props = {
    icon: ReactNode,
    children: ReactNode,
    onClose?: () => void
}
interface OpenContext {
    open: boolean,
    handleClose: () => void,
    anchorEl: null | HTMLElement
}
export const MenuButtonIconContext = createContext<OpenContext | undefined>(undefined);

const MenuButtonIcon = ({ icon, children, onClose }: Props) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
        onClose?.()
    };
    return (
        <MenuButtonIconContext.Provider value={{ open, handleClose, anchorEl }}>

            <Button onClick={handleClick}

                style={{ width: "fit-content" }}
                sx={{
                    height: 30,

                    zIndex: 1000,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    "&.MuiButtonBase-root,.MuiButton-root,.css-1e6y48t-MuiButtonBase-root-MuiButton-root": {
                        padding: 0,

                    }
                }}>

                {icon}

            </Button>
            {
                children
            }


        </MenuButtonIconContext.Provider>
    )
};

export default MenuButtonIcon;
