'use client'
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import React, { ReactNode, useState } from "react"
import StarIcon from '@mui/icons-material/Star';

import getBeginWord from "@/app/utils/getBeginWord";
import { useRouter } from "next/navigation";
type Props = {
  id: string,
  backgroundColor: string,
  nameBoard: string,
  workPlace: string,
  icon: ((value: boolean) => ReactNode) | undefined,
}

const ItemBoard = ({ id, backgroundColor, nameBoard, workPlace, icon = (isFavorite) => <StarIcon sx={{ stroke: "#DFFF00", alignSelf: "flex-end", fill: `${isFavorite ? "#DFFF00" : "#FFFFFF"}` }} /> }: Props) => {
  const [favorite, setFavorite] = useState(false);
  const router = useRouter()

  return (
    <Stack display={"flex"} flexDirection={"row"}>

      <Button onClick={(e) => {
        e.preventDefault()
        router.push(`/boards/${id}`)
      }} >
        <Stack display="flex" direction={"row"} gap={1} alignItems={"center"} justifyContent={"flex-start"} sx={{ width: "100%" }}>
          <Box height={35} width={50} style={{ backgroundColor: backgroundColor }} display="flex"
            justifyContent="center"
            alignItems="center"  >{getBeginWord(nameBoard)}</Box>
          <Stack flex={1} direction={"row"} gap={1} alignItems={"center"} justifyContent={"space-between"}>
            <Stack display={"flex"} direction={"column"}>
              <Typography>{nameBoard}</Typography>
              <Typography>{workPlace}</Typography>

            </Stack>

          </Stack>
        </Stack>
      </Button>
      <IconButton onClick={() => setFavorite(!favorite)}>
        {icon(favorite)}
      </IconButton>
    </Stack>
  )
};

export default ItemBoard;
