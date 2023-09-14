"use client"
import { theme, themeOptions } from "@/app/them"
import { AppBar, Toolbar, useColorScheme, useTheme } from "@mui/material"
import React, { ReactNode } from "react"


const LayoutNabar = ({ children }: { children: ReactNode }) => {
  const theme = useTheme();

  return (
    <>
      <AppBar sx={{ height: () => themeOptions.trello.appBarHeight, position: "fixed", backgroundColor: theme.palette.mode === 'dark' ? '#2c3e50' : '#1565c0', zIndex: 10000000, }}>
        <Toolbar
          style={{ minHeight: themeOptions.trello.appBarHeight }}
          sx={{

            "&.MuiToolbar-regular": {
              padding: 0
            }
          }}>
          {children}
        </Toolbar>
      </AppBar>

    </>
  )
};

export default LayoutNabar;
