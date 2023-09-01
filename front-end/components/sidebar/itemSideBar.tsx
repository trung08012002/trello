import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React, { ReactNode } from "react"
import { text } from "stream/consumers";
type Props={
    open:boolean,
    text:string,
    icon:ReactNode
}
const ItemSideBar = ({open,text,icon}:Props) => {
  return (
    <ListItem>
          <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                 {icon}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
          </ListItem>
  )
};

export default ItemSideBar;
