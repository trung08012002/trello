import React, { useEffect, useState } from "react"
import MenuLayout from "../appbar/menu_layout";
import { TextField, List } from "@mui/material";
import { RootState } from "src/redux/store";
import { useSelector } from "react-redux";
import { useFormContext } from "react-hook-form";
import LabelModel from "model/Label.model";
import LabelItem from "./label_item";

const MenuLabel = ({ labels, labelShown }: { labels: LabelModel[], labelShown: LabelModel[] }) => {

  const [labelsMutate, setLabelsMutate] = useState(labels.map((label) => {
    if (labelShown.findIndex((item) => item._id == label._id) != -1) {
      return { ...label, checked: true };
    }
    else {
      return { ...label, checked: false };
    }
  }))

  return (
    <MenuLayout title="Labels">
      <TextField hiddenLabel placeholder="Search labels..."></TextField>
      <List>
        {labelsMutate.map((label, index) => <LabelItem check={label.checked} key={index} color={label.color} title={label.text} />)}
      </List>
    </MenuLayout>
  )
};

export default MenuLabel;
