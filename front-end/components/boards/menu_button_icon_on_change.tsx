"use client"
import { Button } from "@mui/material";
import React, { ReactNode, useState, createContext } from "react"


type Props = {
    icon: number,
    children: ReactNode,
    icons: ReactNode[]
}
type IconOnChange = {
    title: string,
    icon: ReactNode,
    description: string
}
interface OpenContextIconOnChange {
    open: boolean,
    selectedOption: number,
    handleClose: () => void,
    setSelectedOption: React.Dispatch<React.SetStateAction<number>>,
    anchorEl: null | HTMLElement
}
export const MenuButtonIconOnChangeContext = createContext<OpenContextIconOnChange | undefined>(undefined);

const MenuButtonIconOnChange = ({ icon, icons, children }: Props) => {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const [selectedOption, setSelectedOption] = React.useState<number>(icon)
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <MenuButtonIconOnChangeContext.Provider value={{ open, handleClose, anchorEl, selectedOption, setSelectedOption }}>

            <Button onClick={handleClick}
                style={{ width: "fit-content" }}
                sx={{
                    "&.MuiButtonBase-root,.MuiButton-root,.css-1e6y48t-MuiButtonBase-root-MuiButton-root": {
                        padding: 0,

                    }
                }}>

                {icons[selectedOption]}

            </Button>
            {
                children
            }


        </MenuButtonIconOnChangeContext.Provider>
    )
};

export default MenuButtonIconOnChange;
