"use client"
import { Box, Button, Typography, TypographyProps } from "@mui/material";
import { ButtonProps } from '@mui/material/Button';
import React, { ReactNode, createContext } from "react"



type Props = {
    title: string,
    children: ReactNode
}
interface OpenContext {
    open: boolean,
    handleClose: () => void,
    anchorEl: null | HTMLElement
}
export const ParentContextButtonPopup = createContext<OpenContext>({ open: false, handleClose: () => { }, anchorEl: null });

const ButtonPopUp = ({ title, children, style: styleButton, sx: sxTypo }: Props & ButtonProps & TypographyProps) => {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    console.log('buttonPopUp')
    return (
        <ParentContextButtonPopup.Provider value={{ open, handleClose, anchorEl }}>
            <Box>
                <Button onClick={handleClick} style={styleButton}>
                    <Typography sx={sxTypo}>{title}</Typography>
                </Button>
                {
                    children
                }
            </Box>
        </ParentContextButtonPopup.Provider>
    )
};

export default ButtonPopUp;
