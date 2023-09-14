"use client";
import {
    Button, ButtonProps,



} from "@mui/material";
import React, { ReactNode } from "react";
import { MenuButtonContext } from "../appbar/menuButtonIcon";

type Props = {

    children: ReactNode;
    onClose?: () => void;
    title?: string;
} & ButtonProps;

const MenuButton = ({ children, onClose, title, ...restButton }: Props) => {
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
            <Button onClick={handleClick} {...restButton}>{title}</Button>
            {children}
        </MenuButtonContext.Provider>
    );
};

export default MenuButton