"use client"
import { Box, IconButton, ListItem, Menu, MenuItem, MenuProps, Select, Typography } from "@mui/material";
import React, { ReactNode, useContext } from "react"
import { ParentContext } from "./menu_button";

import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { CustomGlobalStyle } from "../styles/customGlobalStyle";
type Props = {
  children: ReactNode,
  title: string | undefined,
  theme: string | undefined
}




const MenuOneItemLayout = ({ children, title, theme }: Props) => {
  const context = useContext(ParentContext);

  const open = context?.open || false
  const handleClose = context?.handleClose!
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
      {title ? <ListItem>
        <IconButton>
          <ArrowBackIcon />
        </IconButton>
        <Typography sx={CustomGlobalStyle.text12gray}>{title}</Typography>
        <IconButton onClick={() => handleClose()}>
          <CloseIcon />
        </IconButton>
      </ListItem> : null}
      {theme ? <Typography ml={2} sx={CustomGlobalStyle.text12gray}>{theme}</Typography> : null}
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


    </Menu>
  )
};

export default MenuOneItemLayout;

