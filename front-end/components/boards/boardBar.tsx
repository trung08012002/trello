"use client"
import { Avatar, AvatarGroup, Box, Button, Chip, Tooltip } from "@mui/material";
import React, { useState } from "react"
import LockIcon from '@mui/icons-material/Lock';
import PeopleIcon from '@mui/icons-material/People';
import PublicIcon from '@mui/icons-material/Public';

import MenuVisiBility from "./menuVisibility";
import StartButton from "./startButton";
import MenuButtonIconOnChange from "./menu_button_icon_on_change";
import AutoSizeTextField from "./auto_size_textfield";
import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import FilterListIcon from '@mui/icons-material/FilterList';
import BoltIcon from '@mui/icons-material/Bolt';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Height } from "@mui/icons-material";
import { useSession } from "next-auth/react";
export const options = [
    {
        icon: <LockIcon />,
        title: "Private"
    },
    {
        icon: <PeopleIcon />,
        title: "Workspace"
    },
    {
        icon: <PublicIcon />,
        title: "Public"
    }
]

type BoardBarProp = {
    favorite: boolean
    visibility: string
}

const BoardBar = ({ favorite, visibility }: BoardBarProp) => {




    return (
        <Box sx={{ width: "100%", height: "100%" }} display={"flex"} alignItems={"center"} justifyContent={"space-between"} paddingLeft={"20px"}>
            <Box>
                <AutoSizeTextField size="small" sx={{ padding: 0, border: 'none' }} textDefault="pbl5" onBlur={() => { }} />
                <StartButton favorite={favorite} />
                <MenuButtonIconOnChange
                    // eslint-disable-next-line react/jsx-key
                    icon={options.findIndex((value) => value.title === visibility)} icons={options.map(el => el.icon)}
                >
                    <MenuVisiBility />
                </MenuButtonIconOnChange>
                <Chip
                    sx={{
                        color: 'primary.main',
                        bgcolor: 'white',
                        border: 'none',
                        paddingX: '5px',
                        borderRadius: '5px',
                        '& .MuiSvgIcon-root': {
                            color: 'primary.main',
                        },

                    }}
                    onClick={() => { }}
                    icon={<AddToDriveIcon />}
                    label="Add to Drive"
                />
                <Chip
                    sx={{
                        color: 'primary.main',
                        bgcolor: 'white',
                        border: 'none',
                        paddingX: '5px',
                        borderRadius: '5px',
                        '& .MuiSvgIcon-root': {
                            color: 'primary.main',
                        },

                    }}
                    onClick={() => { }}
                    icon={<BoltIcon />}
                    label="Automation"
                />
                <Chip
                    sx={{
                        color: 'primary.main',
                        bgcolor: 'white',
                        border: 'none',
                        paddingX: '5px',
                        borderRadius: '5px',
                        '& .MuiSvgIcon-root': {
                            color: 'primary.main',
                        },

                    }}
                    onClick={() => { }}
                    icon={<FilterListIcon />}
                    label="Filters"
                />

            </Box>
            <Box display={"flex"}>
                <Button variant="outlined" startIcon={<PersonAddIcon />}>Invite</Button>
                <AvatarGroup max={7} sx={{
                    '& .MuiAvatar-root': {
                        width: 40,
                        height: 40,
                        fontSize: 16, border: 'none', color: 'white', cursor: 'pointer', '&:first-of-type': {
                            bgColor: '#a4b0be'
                        },

                    }
                }}>
                    <Tooltip title="avatar">
                        <Avatar
                            src="https://res.cloudinary.com/dfr5hldri/image/upload/v1692802648/trello/avatar/image2_j160ja.jpg"
                            alt="avatar"
                        ></Avatar>
                    </Tooltip>
                    <Tooltip title="avatar">
                        <Avatar
                            src="https://res.cloudinary.com/dfr5hldri/image/upload/v1692802621/trello/avatar/image3_h7vvil.jpg"
                            alt="avatar"
                        ></Avatar>
                    </Tooltip>
                    <Tooltip title="avatar">
                        <Avatar
                            src="https://res.cloudinary.com/dfr5hldri/image/upload/v1692802648/trello/avatar/image1_oi36ec.jpg"
                            alt="avatar"
                        ></Avatar>
                    </Tooltip>
                    <Tooltip title="avatar">
                        <Avatar
                            src="https://res.cloudinary.com/dfr5hldri/image/upload/v1692802621/trello/avatar/image4_qgeqqy.jpg"
                            alt="avatar"
                        ></Avatar>
                    </Tooltip>
                    <Tooltip title="avatar">
                        <Avatar
                            src="https://res.cloudinary.com/dfr5hldri/image/upload/v1692802622/trello/avatar/image7_nxknz6.jpg"
                            alt="avatar"
                        ></Avatar>
                    </Tooltip>
                    <Tooltip title="avatar">
                        <Avatar
                            src="https://res.cloudinary.com/dfr5hldri/image/upload/v1692802622/trello/avatar/image6_uvkme6.jpg"
                            alt="avatar"
                        ></Avatar>
                    </Tooltip>
                    <Tooltip title="avatar">
                        <Avatar
                            src="https://res.cloudinary.com/dfr5hldri/image/upload/v1692802621/trello/avatar/image8_dasweh.jpg"
                            alt="avatar"
                        ></Avatar>
                    </Tooltip>
                    <Tooltip title="avatar">
                        <Avatar
                            src="https://res.cloudinary.com/dfr5hldri/image/upload/v1692802621/trello/avatar/image5_wy3bxu.jpg"
                            alt="avatar"
                        ></Avatar>
                    </Tooltip>
                </AvatarGroup>
            </Box>
        </Box>
    )
};

export default BoardBar;
