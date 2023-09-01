import { Box, IconButton, Menu, TextField, Typography } from "@mui/material";
import { title } from "process";
import React from "react"
import { CustomGlobalStyle } from "../styles/customGlobalStyle";
import CloseIcon from '@mui/icons-material/Close';
const LabelMenu = ({ open, anchorEl, handleClose }: { open: boolean, anchorEl: HTMLElement, handleClose: () => void }) => {
  return (
    <Menu open={open} anchorEl={anchorEl} onClose={handleClose} >
      <Box display="flex" flexDirection="column">
       <Box display={"flex"} width={"100%"} position="relative" justifyContent={"center"}>


          <Typography textAlign={"center"} sx={CustomGlobalStyle.text16gray}>Labels</Typography>
          <IconButton onClick={handleClose} sx={{
            position: "absolute", top: 0,
            bottom: 0,
            right: "2px",
            margin: "auto 2px",
          }} >
            <CloseIcon />
          </IconButton>
        </Box> 
         <TextField variant="outlined" size="small" placeholder="Search labels..."/>
         <Typography>Labels</Typography>
         
      </Box>
    </Menu>
  )
};

export default LabelMenu;
