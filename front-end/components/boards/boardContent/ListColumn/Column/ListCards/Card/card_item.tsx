"use client"
import { Avatar, AvatarGroup, Box, Button, Card, CardActions, CardContent, CardMedia, IconButton, Tooltip, Typography } from "@mui/material";
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
    return (
        <Card

            style={DndkitColumnStyle}
            {...listeners}
            {...attributes}
            ref={setNodeRef}

            sx={{ marginY: "5px", overflow: 'unset', boxShadow: '0 1px 1px rgba(0,0,0,0.2)', borderRadius: "10px" }}>

            {card.cover != '' ? <CardMediaCustom sx={{ height: 140, borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }} icon={<EditIcon />} img={card.cover} title={"green iguana"} />
                : null
            }


            <CardContent sx={{ overflow: 'unset' }}>
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
                <Typography mt={1}>
                    {card.title}
                </Typography>

            </CardContent>
            <CardActions>
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
                                    <Avatar sx={{ bgColor: member.backgroundColor }}>{getBeginWordUppercase(member.name)}</Avatar>
                                </Tooltip>)

                            }


                        </AvatarGroup>
                    </Box>
                </Box>
            </CardActions>
        </Card>
    )
};

export default CardItem;
