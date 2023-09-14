"use client";
import {
    IconButton,
    IconButtonProps,

} from "@mui/material";
import React, { ReactNode, createContext } from "react";



type Props = {
    icon: ReactNode;
    children: ReactNode;
    onClose?: () => void;
} & IconButtonProps;
interface OpenContext {
    open: boolean;
    handleClose: () => void;
    anchorEl: null | HTMLElement;
}
export const MenuButtonContext = createContext<OpenContext | undefined>(
    undefined
);

const MenuButtonIcon = ({ icon, children, onClose, ...restButton }: Props) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
        onClose?.();
    };
    return (
        <MenuButtonContext.Provider value={{ open, handleClose, anchorEl }}>
            <IconButton onClick={handleClick} {...restButton} >{icon}</IconButton>
            {children}
        </MenuButtonContext.Provider>
    );
};

export default MenuButtonIcon;
