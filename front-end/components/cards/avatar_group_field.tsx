import { Avatar, AvatarGroup, AvatarGroupProps, AvatarProps, Box, ButtonProps, IconButton, Tooltip, Typography } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import React, { ReactNode } from "react"
import AddIcon from '@mui/icons-material/Add';
import UserMinimize from "model/userMinimize";
import getBeginWordUppercase from "@/app/utils/getBeginWord";
import MenuButtonIcon from "../appbar/menuButtonIcon";
import MenuLayout from "../appbar/menu_layout";
import { Control, useController, useFormContext } from "react-hook-form";
import { CustomGlobalStyle } from "../styles/customGlobalStyle";
type AvatarGroupFieldProps = {


  titleAddMenu: string,
  avatarGroupProps: AvatarGroupProps,

  buttonProps: ButtonProps,
  childrenMenu: ReactNode
}
const AvatarGroupField = ({ avatarGroupProps, titleAddMenu, buttonProps, childrenMenu }: AvatarGroupFieldProps) => {
  const { watch } = useFormContext()
  const avatars = watch('members') as UserMinimize[]

  return <>
    {/* {avatars.length > 0 ?  */}
    <Box display={"flex"} flexDirection={"column"}>
      <Typography sx={CustomGlobalStyle.text12black600}>Members</Typography>
      <Box display={"flex"}>
        <AvatarGroup {...avatarGroupProps} >
          {avatars.map((member, index) => <Tooltip key={index}
            title={member.email}><Avatar sx={{ color: member.backgroundColor, height: "40px" }}>{getBeginWordUppercase(member.name)}</Avatar></Tooltip>)}
        </AvatarGroup>
        <MenuButtonIcon icon={<AddIcon />} {...buttonProps}>
          <MenuLayout title={titleAddMenu}>{childrenMenu}</MenuLayout>
        </MenuButtonIcon>
      </Box>
    </Box>
    {/* //  : null} */}
  </>

};

export default AvatarGroupField;
