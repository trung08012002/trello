import { Avatar, IconButton, IconButtonProps } from "@mui/material";
import React from "react"

interface IIconButton {
    onClick: Function
    avatar: string
    width: number
    height: number,
    name: string
}

const OtherLoginButton = ({ onClick, avatar, width, height, name, ...rest }: IIconButton & IconButtonProps) => {
    return (
        <IconButton onClick={onClick} size="small" key={name} {...rest}>
            <Avatar src={avatar} sx={{ width, height }} />
        </IconButton>
    )
};

export default OtherLoginButton;
