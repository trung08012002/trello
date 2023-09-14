"use client"
import { Box, Button, ButtonProps, IconProps, SxProps, Typography, TypographyProps } from "@mui/material";

import React, { ReactNode, createContext } from "react"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { CustomGlobalStyle } from "../styles/customGlobalStyle";

type Props = {
  title: string,
  children: ReactNode,
  styleIcon?: React.CSSProperties,
  styleButton?: ButtonProps
} & TypographyProps
interface OpenContext {
  open: boolean,
  handleClose: () => void,
  anchorEl: null | HTMLElement
}
export const ParentContext = createContext<OpenContext | undefined>(undefined);

const MenuButton = ({ title, children, styleIcon = { color: "white" }, styleButton = { style: { marginLeft: 2 } }, ...rest }: Props) => {

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  let { sx } = { ...rest }
  if (sx == null) {
    sx = CustomGlobalStyle.text14white
  }
  return (
    <ParentContext.Provider value={{ open, handleClose, anchorEl }}>
      <Box>
        <Button onClick={handleClick} {...styleButton} >
          <Box display="flex" alignItems={"center"} >
            <Typography sx={sx}>{title}</Typography>
            <KeyboardArrowDownIcon style={styleIcon} />
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
