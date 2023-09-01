"use client"
import { Box, Button, CardActionArea, CardMedia, CardMediaProps, IconButton, Popover, Typography } from "@mui/material";
import React, { MouseEventHandler, ReactNode, useState } from "react"
import CustomPopover from "./custom_popover";
import MenuButtonIcon from "../appbar/menuButtonIcon";
import MenuLayout from "../appbar/menu_layout";
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LabelIcon from '@mui/icons-material/Label';
import PersonIcon from '@mui/icons-material/Person';
import WallpaperIcon from '@mui/icons-material/Wallpaper';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import ArchiveIcon from '@mui/icons-material/Archive';
type CardMediaCustomProp = {
    img: string,
    title: string,
    icon: ReactNode
} & CardMediaProps



const CardMediaCustom = ({ img, title, icon, ...rest }: CardMediaCustomProp) => {
    const [open, setopen] = React.useState<boolean>(false);
    const [anchorEl, setAnchorEl] = React.useState<null | { anchorEl: HTMLElement, type: string }>(null);
    const openAnchor = Boolean(anchorEl?.anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>, type: string) => {
        setAnchorEl({ anchorEl: event.currentTarget, type });
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handlePopoverOpen = () => {

        setopen(true);
    };

    const handlePopoverClose = () => {

        setopen(false);
    };
    function CreatePopUp(el: {
        anchorEl: HTMLElement;
        type: string;
        handleClose: () => void;
    } | null) {

    }
    const listActions = [
        { title: 'Open card', value: 'OpenCard', onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, type: string) => { handleClick(event, type) }, icon: <CreditCardIcon /> },
        { title: 'Edit labels', value: 'EditLabels', onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, type: string) => { handleClick(event, type) }, icon: <LabelIcon /> },
        { title: 'Change members', value: 'ChangeMembers', onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, type: string) => { handleClick(event, type) }, icon: <PersonIcon /> },
        { title: 'Change cover', value: 'ChangeCover', onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, type: string) => { handleClick(event, type) }, icon: <WallpaperIcon /> },
        { title: 'Move', value: 'Move', onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, type: string) => { handleClick(event, type) }, icon: <ArrowForwardIcon /> },
        { title: 'Copy', value: 'Copy', onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, type: string) => { handleClick(event, type) }, icon: <ContentCopyIcon /> },
        { title: 'Edit dates', value: 'EditDates', onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, type: string) => { handleClick(event, type) }, icon: <QueryBuilderIcon /> },
        { title: 'Archive', value: 'Archive', onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, type: string) => { handleClick(event, type) }, icon: <ArchiveIcon /> },
    ]

    return (

        <CardActionArea onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose} sx={{ position: "relative" }} >
            <CardMedia
                {...rest}
                image={img}
                title={title}

            />

            {open ? <Box sx={{ position: 'absolute', top: 0, right: 0, zIndex: 1000 }}>
                <MenuButtonIcon icon={icon} onClose={handlePopoverClose}>
                    <MenuLayout title="Card">
                        <Box display={"flex"} flexDirection={"column"}>
                            {listActions.map((action, index) => <Button sx={{ justifyContent: "flex-start" }} key={index} startIcon={action.icon} onClick={(event) => action.onClick(event, action.value)}>{action.title}</Button>)}

                        </Box>
                    </MenuLayout>
                </MenuButtonIcon>

            </Box> : null}
        </CardActionArea>

    )
};

export default CardMediaCustom;
