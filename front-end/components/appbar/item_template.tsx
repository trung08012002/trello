import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react"
import Image from "next/image";
type Props = {
  id: string,
  imgSrc: string,
  nameTemplate: string,

}
const ItemTemplate = ({ id, imgSrc, nameTemplate }: Props) => {
  return (
    <Button onClick={() => { }}>
      <Stack display={"flex"} direction={"row"}>
        <Box component={"img"} src={imgSrc}></Box>
        <Typography>{nameTemplate}</Typography>
      </Stack>
    </Button>
  )
};

export default ItemTemplate;
