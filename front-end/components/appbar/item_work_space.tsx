"use client"
import { Box, Button, Typography } from "@mui/material";
import React, { ReactNode } from "react"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import getBeginWordUppercase from "@/app/utils/getBeginWord";
import { useRouter } from 'next/navigation'

type Props = {
  id: string,
  backgroundColor: string,
  title: string,
  icon?: ReactNode,

}
const ItemWorkSpace = ({ id, title, backgroundColor, icon }: Props) => {
  const router = useRouter()
  return (
    <Button onClick={() => {
      router.push(`/workSpace/${id}`)
    }}>
      <Box display={"flex"} sx={{ width: "100%" }} alignItems={"center"}>
        <Box height={40} width={45} style={{ backgroundColor: backgroundColor }} display="flex"
          justifyContent="center"
          alignItems="center" mr={1}>{getBeginWordUppercase(title)}</Box>
        <Box display="flex" flex={1} >
          <Typography>
            {title}
          </Typography>
          {icon}
        </Box>

      </Box>
    </Button>
  )
};

export default ItemWorkSpace;
