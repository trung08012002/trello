"use client"
import { themeOptions } from "@/app/them";
import { Avatar, Box, Divider, Drawer, IconButton, List, ListSubheader, Toolbar, Typography } from "@mui/material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import { styled } from '@mui/material/styles';
import React from "react"
import { drawerWidth } from "./boardLayout";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/store";
import getBeginWordUppercase from "@/app/utils/getBeginWord";
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import WorkSpaceItem from "./workSpaceItem";
import BoardNavbarItem from "./Board_Navbar_item";
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    mt: "100px",
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));
const CustomDrawer = ({ openDrawer, handleCloseDrawer }: { openDrawer: boolean, handleCloseDrawer: () => void }) => {
    const boardState = useSelector((state: RootState) => state.board)
    const workSpaceInfor = [
        { name: "Board", startIcon: <SpaceDashboardIcon />, endIcon: undefined },
        { name: "Members", startIcon: <PersonIcon />, endIcon: <AddIcon /> },
        { name: "Workspace settings", startIcon: <SettingsIcon />, endIcon: <KeyboardArrowDownIcon /> },
    ]

    return (
        <Drawer
            sx={{


                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
                display: openDrawer ? "block" : "none"
            }}
            variant="persistent"
            anchor="left"
            open={openDrawer}>
            <Toolbar style={{ minHeight: themeOptions.trello.appBarHeight }}
                sx={{

                    "&.MuiToolbar-regular": {
                        padding: 0
                    }
                }} />
            <DrawerHeader>
                <Box display={"flex"} alignItems={"center"}>
                    <Avatar sx={{ bgcolor: boardState.backgroundWorkSpace, mr: "5px" }}>{getBeginWordUppercase(boardState.workSpaceName)}</Avatar>
                    <Typography>{boardState.workSpaceName}</Typography>
                </Box>
                <IconButton onClick={handleCloseDrawer}>
                    <ChevronLeftIcon />
                </IconButton>
            </DrawerHeader>
            <Divider />
            <List component="nav">
                {workSpaceInfor.map((workSpace, index) => <WorkSpaceItem key={index} title={workSpace.name} href={"#"} startIcon={workSpace.startIcon} endIcon={workSpace.endIcon} />)}
            </List>
            <List
                component="nav"
                subheader={<ListSubheader>Your boards</ListSubheader>}>
                {boardState.boardOfWorkSpace.map((board, index) => <BoardNavbarItem key={index} board={board} />)}
            </List>
        </Drawer>
    )
};

export default CustomDrawer;
