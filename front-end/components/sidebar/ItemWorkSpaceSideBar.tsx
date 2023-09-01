"use client"
import React, { useState } from "react"
import ItemWorkSpace from "../appbar/item_work_space";
import { ArrowDropDown } from "@mui/icons-material";
import { Collapse } from "@mui/material";
type Props = {
  id: string,
  title: string,
  img: string,
}

const ItemWorkSpaceSideBar = ({ id,
  title,
  img, }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  function handleClick() {
    setOpen(!open);
  };
  return (
    <><ItemWorkSpace
      id={id} title={title} backgroundColor=""

      icon={<ArrowDropDown />} />
      <Collapse in={open} timeout="auto" unmountOnExit>

      </Collapse>
    </>
  )
};

export default ItemWorkSpaceSideBar;
