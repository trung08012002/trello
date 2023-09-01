import { Button, Box } from "@mui/material";
import React from "react"
import { UseFormRegister, UseFormSetValue } from "react-hook-form";

type ListImageType = {
  images: Array<any>
  setValue: UseFormSetValue<any>
  register: UseFormRegister<any>
}

const ListImage = ({ images, setValue, register }: ListImageType) => {

  return (
    <>
      {images.map((image, index) => {
        const { name, ref } = register('backgroundImage');
        return <Button sx={{ padding: 0 }} ref={ref} key={index} onClick={() => setValue('backgroundImage', image)}>
          <Box component={"img"} src={image.url} height={"45px"} sx={{ objectFit: "contain" }}>

          </Box>
        </Button>
      })}
    </>
  )
};

export default ListImage;
