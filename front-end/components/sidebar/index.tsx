import { Box, CSSObject, Divider, IconButton, List, Theme, styled, useTheme } from "@mui/material";
import React, { ReactNode } from "react"
import MuiDrawer from '@mui/material/Drawer';

import { ChevronRight, ChevronLeft } from '@mui/icons-material';
import { SpaceDashboard, Dashboard, AutoGraph } from '@mui/icons-material';

import ItemSideBar from "./itemSideBar";
const drawerWidth = 300;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

type Props = {
  open: boolean,
  onHandleClose: () => void
}
const SideBar = ({ open, onHandleClose }: Props) => {
  const theme = useTheme();
  const itemsBar: Array<{ text: string, icon: ReactNode }> = [{ "text": "Boards", "icon": <SpaceDashboard /> },
  { "text": "Templates", "icon": <Dashboard /> },
  { "text": "Home", "icon": <AutoGraph /> },];
  <Drawer variant="permanent" open={open}>
    <DrawerHeader>
      <IconButton onClick={onHandleClose}>
        {theme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
      </IconButton>
    </DrawerHeader>
    <Divider />
    <List>
      {itemsBar.map((item, index) => <ItemSideBar key={index} open={open} text={item.text} icon={item.icon} />)}
    </List>
    <Divider />
  </Drawer>
};

export default SideBar;
