"use client"
import React, { useContext, useState } from "react"
import MenuLayout from "./menu_layout";
import { Box, Button, GlobalStyles, Radio, Typography, useColorScheme } from "@mui/material";
import CloseButton from "./closeButton";
import { CustomGlobalStyle } from "../styles/customGlobalStyle";

const MenuTheme = () => {

  return (
    <MenuLayout>
      <BodyTheme />
    </MenuLayout>
  )
};

const BodyTheme = () => {
  const Themes = ([{ name: "Light", mode: "light", img: "../../images/light.svg" }, { name: "Dark", mode: "dark", img: "../../images/dark.svg" },
  { name: "Automatic", mode: "system", img: "../../images/lightdark.svg", description: "Follow system settings" }])
  const { mode, setMode } = useColorScheme()
  const [current, setCurrent] = useState(Themes.findIndex((el) => el.mode === mode?.valueOf(),));

  return (
    <>
      <Box sx={{ position: 'relative' }}>
        <Typography textAlign={"center"} >Theme</Typography>
        <Box sx={{ position: "absolute", top: -10, right: 0 }}>
          <CloseButton />
        </Box>

      </Box>
      {
        Themes.map((theme, index) => <Item key={index}
          current={current} setCurrent={setCurrent} theme={theme} index={index} />)
      }
    </>
  )
}
type Props = {
  current: number,
  setCurrent: React.Dispatch<React.SetStateAction<number>>,
  theme: any,
  index: number
}
const Item = ({ current, setCurrent, theme, index }: Props) => {
  const { mode, setMode } = useColorScheme();
  function setTheme(theme: string) {
    switch (theme) {
      case "Light":

        setMode("light")

        break;
      case "Dark":

        setMode("dark")

        break;
      case "Automatic":
        setMode("system")
      default:
        return
    }
  }
  return (
    <Button
      style={{ backgroundColor: current === index ? "#E9F2FF" : "#FFFFFF" }}
      onClick={() => {
        setTheme(theme.name)
        setCurrent(index);

      }}>

      <Box display={"flex"} alignItems={"center"} justifyContent={"flex-start"} width={"100%"}>
        <Radio
          checked={index === current}
        ></Radio>
        <Box component={"img"} src={theme.img} mr={1}></Box>

        <Box display={"flex"} flexDirection={"column"} alignItems={"flex-start"}>
          <Typography sx={index === current ? CustomGlobalStyle.text14blue : CustomGlobalStyle.text14black}>{theme.name}</Typography>
          {theme.description ? <Typography sx={index === current ? CustomGlobalStyle.text12blue : CustomGlobalStyle.text12sublet100}>{theme.description}</Typography> : null}
        </Box>
      </Box>
    </Button>
  )
}

export default MenuTheme;
