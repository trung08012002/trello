"use client"
import { Box, Link, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import React, { ReactNode } from "react"

const WorkSpaceItem = ({ href, startIcon, title, endIcon }: { href: string, startIcon: ReactNode, title: string, endIcon: ReactNode }) => {
    return (
        <Link href={href} style={{ textDecoration: "none" }}>
            <ListItem sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                pr: 0
            }}>
                <ListItemIcon sx={{ minWidth: "24px" }}>
                    {startIcon}
                </ListItemIcon>
                <ListItemText><Typography>{title}</Typography></ListItemText>
                <ListItemIcon sx={{ minWidth: "24px", pr: "3px" }}>
                    {endIcon}
                </ListItemIcon>


            </ListItem>
        </Link>
    )
};

export default WorkSpaceItem;
