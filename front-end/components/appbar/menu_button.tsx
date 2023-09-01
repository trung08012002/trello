"use client"
import { Box, Button, Typography } from "@mui/material";

import React, { ReactNode, createContext } from "react"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { CustomGlobalStyle } from "../styles/customGlobalStyle";

type Props = {
  title: string,
  children: ReactNode
}
interface OpenContext {
  open: boolean,
  handleClose: () => void,
  anchorEl: null | HTMLElement
}
export const ParentContext = createContext<OpenContext | undefined>(undefined);

const MenuButton = ({ title, children }: Props) => {

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <ParentContext.Provider value={{ open, handleClose, anchorEl }}>
      <Box>
        <Button onClick={handleClick} sx={{ ml: 2 }}>
          <Box display="flex" alignItems={"center"} >
            <Typography sx={CustomGlobalStyle.text14white}>{title}</Typography>
            <KeyboardArrowDownIcon style={{ color: "white", }} />
          </Box>
        </Button>
        {
          children
        }

      </Box>
    </ParentContext.Provider>
  )
};

export default MenuButton;
