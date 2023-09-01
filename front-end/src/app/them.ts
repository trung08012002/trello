"use client";

import { experimental_extendTheme as extendTheme } from "@mui/material/styles";

import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const appBarHeight = "48px";
const boardBarHeight = "58px";

export const themeOptions = {
  trello: {
    appBarHeight: appBarHeight,
    boardBarHeight: boardBarHeight,
    boardBarContentHeight: `calc(100vh - ${appBarHeight} - ${boardBarHeight})`,
  },
  typography: {
    fontSize: 12,
    fontFamily: roboto.style.fontFamily,
  },
  palette: {
    headerBoard: {
      primary: "#392196",
    },
    barBoard: {
      startBarBoard: "#301C81",
      endBarBoard: "#732B7A",
    },
  },
};
export const theme = extendTheme(themeOptions);
