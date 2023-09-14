"use client"
import { Avatar, AvatarGroup, Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, IconButton, Tooltip, Typography } from "@mui/material";
import React from "react"
import VisibilityIcon from '@mui/icons-material/Visibility';
import MenuIcon from '@mui/icons-material/Menu';
import AttachmentIcon from '@mui/icons-material/Attachment';
import CardMediaCustom from "../../../../../card_media_custom";
import EditIcon from '@mui/icons-material/Edit';
import { CardInforView } from "model/card_infor.model";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';
import getBeginWordUppercase from "@/app/utils/getBeginWord";

import CreditCardIcon from '@mui/icons-material/CreditCard';
import LabelIcon from '@mui/icons-material/Label';
import PersonIcon from '@mui/icons-material/Person';
import WallpaperIcon from '@mui/icons-material/Wallpaper';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import ArchiveIcon from '@mui/icons-material/Archive';
import MenuButtonIcon from "@/components/appbar/menuButtonIcon";
import MenuLayout from "@/components/appbar/menu_layout";
import { useRouter } from "next/navigation";
const CardItem = ({ card }: { card: CardInforView }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({
        id: card._id!,
        data: { ...card }
    });
    const DndkitColumnStyle = {
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.5 : undefined
    };
    const router = useRouter()
    const [open, setopen] = React.useState<boolean>(false);
    const [anchorEl, setAnchorEl] = React.useState<null | { anchorEl: HTMLElement, type: string }>(null);
    const openAnchor = Boolean(anchorEl?.anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>, type: string) => {
        console.log("type", type)

        if (type === 'OpenCard') {

            router.push(`/card/${card._id}`)
        }
        else setAnchorEl({ anchorEl: event.currentTarget, type });
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handlePopoverOpen = () => {

        setopen(true);
    };

    const handlePopoverClose = () => {

        setopen(false);
    };
    function CreatePopUp(el: {
        anchorEl: HTMLElement;
        type: string;
        handleClose: () => void;
    } | null) {

    }
    const listActions = [
        { title: 'Open card', value: 'OpenCard', onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, type: string) => { handleClick(event, type) }, icon: <CreditCardIcon /> },
        { title: 'Edit labels', value: 'EditLabels', onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, type: string) => { handleClick(event, type) }, icon: <LabelIcon /> },
        { title: 'Change members', value: 'ChangeMembers', onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, type: string) => { handleClick(event, type) }, icon: <PersonIcon /> },
        { title: 'Change cover', value: 'ChangeCover', onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, type: string) => { handleClick(event, type) }, icon: <WallpaperIcon /> },
        { title: 'Move', value: 'Move', onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, type: string) => { handleClick(event, type) }, icon: <ArrowForwardIcon /> },
        { title: 'Copy', value: 'Copy', onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, type: string) => { handleClick(event, type) }, icon: <ContentCopyIcon /> },
        { title: 'Edit dates', value: 'EditDates', onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, type: string) => { handleClick(event, type) }, icon: <QueryBuilderIcon /> },
        { title: 'Archive', value: 'Archive', onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, type: string) => { handleClick(event, type) }, icon: <ArchiveIcon /> },
    ]
    return (
        <div style={DndkitColumnStyle}
            {...listeners}
            {...attributes}
            ref={setNodeRef}>
            <Card



                sx={{ marginY: "5px", overflow: 'unset', boxShadow: '0 1px 1px rgba(0,0,0,0.2)', borderRadius: "10px", display: `${card.fe_placeholder ? "none" : "block"}` }}>

                <CardActionArea component="span" onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose} sx={{ position: "relative" }}  >
                    {card.cover != '' ? <CardMediaCustom sx={{ height: 100, borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }} img={card.cover} title={"green iguana"} />
                        : null
                    }
                    {open ? <Box sx={{ position: 'absolute', top: 5, right: 0, zIndex: 1000 }}>
                        <MenuButtonIcon icon={
                            <EditIcon />
                        } onClose={handlePopoverClose} sx={{ borderRadius: "10px" }}>
                            <MenuLayout title="Card">
                                <Box display={"flex"} flexDirection={"column"}>
                                    {listActions.map((action, index) => <Button sx={{ justifyContent: "flex-start" }} key={index} startIcon={action.icon}
                                        onClick={(event) => {

                                            action.onClick(event, action.value)
                                        }}>{action.title}</Button>)}

                                </Box>
                            </MenuLayout>
                        </MenuButtonIcon>

                    </Box> : null}
                    <Box sx={{ padding: "10px 5px 10px 10px", }}>
                        <Box sx={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
                            {
                                card.labels.map((e, index) => <Button
                                    key={index}
                                    size="small"
                                    style={{ backgroundColor: `${e.color}`, }}
                                    sx={{
                                        borderradius: "4px",

                                        minwidth: "56px",
                                        maxwidth: "100%",
                                        height: "16px",
                                        boxsizing: "borderbox",
                                        backgroundcolor: "#4bce97",
                                        color: " #164b35",
                                        lineheight: "16px",
                                        fontsize: "12px",
                                        fontweight: 500,
                                        textalign: "left",
                                        verticalalign: "middle",
                                        overflow: "hidden",
                                        textoverflow: "ellipsis",
                                        whitespace: "nowrap",
                                    }}>{e.text}</Button>)
                            }

                        </Box>
                        <Typography >
                            {card.title}
                        </Typography>


                        <Box display={"flex"} justifyContent={"space-between"} width={"100%"} alignItems={"center"}>
                            <Box gap={2} display={"flex"}>

                                {card.visible ? <Tooltip title="You are watching this card.">
                                    <VisibilityIcon />
                                </Tooltip> : null}
                                {card.description != '' ? <Tooltip title="This card has description.">
                                    <MenuIcon />
                                </Tooltip> : null
                                }
                                {
                                    card.attachments.length > 0 ? <Tooltip title="Attachments">
                                        <Box display={"flex"} gap={0.3} alignItems={"center"}>
                                            <AttachmentIcon />
                                            <Typography>{card.attachments.length}</Typography>
                                        </Box>

                                    </Tooltip> : null
                                }

                            </Box>
                            <Box>
                                <AvatarGroup max={3}

                                    sx={{

                                        '& .mui-ak13cp-MuiAvatar-root-MuiAvatarGroup-avatar': {
                                            height: 25,
                                            width: 25,
                                        },
                                        '& .mui-1jyr32k-MuiAvatar-root': {
                                            height: 25,
                                            width: 25,
                                        },
                                        '& .MuiAvatar-roor': {
                                            border: 'none', color: 'white', cursor: 'pointer', '&:first-of-type': {
                                                bgColor: '#a4b0be',

                                            }
                                        }
                                    }}>
                                    {
                                        card.members.map((member, index) => <Tooltip key={index} title="avatar">
                                            <Avatar sx={{ bgColor: member.backgroundColor, color: "white" }}>{getBeginWordUppercase(member.name)}</Avatar>
                                        </Tooltip>)

                                    }


                                </AvatarGroup>
                            </Box>
                        </Box>
                    </Box>
                </CardActionArea>
            </Card>
        </div>
    )
};

export default CardItem;
