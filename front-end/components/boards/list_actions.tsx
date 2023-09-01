"use client"
import React from "react"
import MenuButtonIcon from "../appbar/menuButtonIcon";
import MenuLayout from "../appbar/menu_layout";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Button, Divider, Typography } from "@mui/material";
const ButtonStyle = {
    cursor: "pointer",

    fontWeight: 400,
    justifyContent: "flex-start",
    color: "#172b4d"
}
const ListActions = () => {
    const listActions = [{ title: "Add card...", onClick: () => { } }, { title: "Copy list...", onClick: () => { } }, { title: "Move list...", onClick: () => { } }, { title: "Watch", onClick: () => { } }]
    const automationList = [{ title: "When a card is added to the list...", onClick: () => { } }, { title: "Every day, sort list by...", onClick: () => { } },
    { title: "Every Monday, sort list by...", onClick: () => { } }, { title: " Create a rule...", onClick: () => { } }
    ]
    const nextList = [{ title: "Move all cards in this list...", onClick: () => { } }, { title: "Archive all cards in this list...", onClick: () => { } }]

    return (
        <MenuButtonIcon icon={<MoreHorizIcon />}>
            <MenuLayout title={"List actions"}
            >
                {listActions.map((action, index) => <Button key={index} variant="text" onClick={action.onClick} style={ButtonStyle}>{action.title}</Button>)}
                <Divider />
                <Button variant="text" onClick={() => { }} style={ButtonStyle}>Sort by...</Button>
                <Divider />
                <Typography pl={1} sx={{
                    color: "#44546f", fontSize: "12px",
                    fontWeight: 600,
                    lineHeight: "16px",
                }}>Automation</Typography>
                {automationList.map((action, index) => <Button key={index} variant="text" onClick={action.onClick} style={ButtonStyle}>{action.title}</Button>)}
                <Divider />
                {nextList.map((action, index) => <Button key={index} variant="text" onClick={action.onClick} style={ButtonStyle}>{action.title}</Button>)}
                <Divider />
                <Button variant="text" onClick={() => { }} style={ButtonStyle}>Archive this list</Button>
            </MenuLayout>
        </MenuButtonIcon>
    )
};

export default ListActions;
