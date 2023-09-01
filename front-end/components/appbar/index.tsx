
import React from "react"
import { AppBar, Avatar, Box, Stack, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MenuButton from "./menu_button";


import MenuWorkSpace from "./menu_work_space";
import MenuBoard from "./menu_board";
import { Button } from '../clientMuiComponent'

import SearchBar from "./searchBar";
import MenuButtonIcon from "./menuButtonIcon";
import MenuNotification from "./menuNotification";
import NotificationsIcon from '@mui/icons-material/Notifications';
import Brightness6Icon from '@mui/icons-material/Brightness6';
import { deepOrange, deepPurple } from '@mui/material/colors';
import MenuTheme from "./menuTheme";
import ButtonPopUp from "./button_pop_up";
import MenuCreateParent from "./formCreate/menu_create_parent";


import LayoutNabar from "./layout_navbar";
import ButtonTrello from "./button_trello";
import ButtonTheme from "./button_theme";


type WorkSpace = {
  img: string,
  id: string,
  nameWorkSpace: string,
}

const Navbar = () => {

  return (

    <LayoutNabar>
      <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} sx={{ width: "100%" }}>
        <Stack display={"flex"} flexDirection={"row"} gap={1} alignItems={"center"}>
          <Button><MenuIcon style={{ color: "white", }} /></Button>
          <ButtonTrello />

          <MenuButton title={"Workspaces"}>

            <MenuWorkSpace />
          </MenuButton>
          <MenuButton title={"Recent Boards"}>

            <MenuBoard />
          </MenuButton>
          <ButtonPopUp title={"Create"} sx={{ color: "#FFFFFF", padding: "4px 8px", borderRadius: "2px" }}>

            <MenuCreateParent />
          </ButtonPopUp>

        </Stack>
        <Stack display={"flex"} flexDirection={"row"} justifyContent={"flex-end"} alignItems={"center"}>
          <SearchBar />
          <MenuButtonIcon icon={<NotificationsIcon sx={{ stroke: "#ffffff", strokeWidth: 1 }} />}>

            <MenuNotification />
          </MenuButtonIcon>
          <ButtonTheme />
          <MenuButtonIcon icon={<Avatar sx={{ bgcolor: deepOrange[500] }} >HT</Avatar>}>

            <MenuNotification />
          </MenuButtonIcon>
        </Stack>
      </Box>
    </LayoutNabar>


  )
};

export default Navbar;
