"use client";

import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";


import { NextAppDirEmotionCacheProvider } from "./EmotionCache";
import { Roboto } from "next/font/google";
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import { theme } from "@/app/them";







export const ThemeRegistry = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <NextAppDirEmotionCacheProvider options={{ key: "mui" }}>
      <CssVarsProvider theme={theme}>
        <CssBaseline />
        {children}
      </CssVarsProvider>
    </NextAppDirEmotionCacheProvider>
  );
}