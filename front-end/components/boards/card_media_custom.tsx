"use client";
import { CardMedia, CardMediaProps } from "@mui/material";
import React from "react";

type CardMediaCustomProp = {
  img: string;
  title: string;
} & CardMediaProps;

const CardMediaCustom = ({ img, title, ...rest }: CardMediaCustomProp) => {
  return <CardMedia {...rest} image={img} title={title} />;
};

export default CardMediaCustom;
