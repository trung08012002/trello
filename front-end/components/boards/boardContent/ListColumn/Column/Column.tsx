"use client"

import ListActions from "@/components/boards/list_actions";
import { Typography, Button, Tooltip } from "@mui/material";
import Box from "@mui/material/Box/Box";
import React from "react"

import AddIcon from '@mui/icons-material/Add';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import ListCards from "./ListCards/ListCards";
import ColumnInfor from "model/column_infor.model";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';
import { COLUMN_FOOTER_HEIGHT, COLUMN_HEADER_HEIGHT } from "../../board_content";
import { defaultDropAnimationSideEffects } from "@dnd-kit/core";
const Column = ({ column }: { column: ColumnInfor }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({
        id: column._id!,
        data: { ...column }
    });
    const DndkitColumnStyle = {
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.5 : undefined


    };

    return (
        <div ref={setNodeRef}
            style={DndkitColumnStyle}
            {...attributes}>
            <Box
                {...listeners}
                sx={{
                    width: '300px',
                    borderRadius: "10px",
                    padding: "10px 0px 10px 10px",

                    backgroundColor: (theme) => {

                        return (theme.palette.mode === 'dark' ? '#333643' : '#ebecf0')
                    }

                }}
            >
                <Box height={COLUMN_HEADER_HEIGHT} display={"flex"} justifyContent={"space-between"} alignItems={"center"} sx={{
                    "& .mui-u75zac-MuiTypography-root": {
                        margin: "10px"
                    }
                }}><Typography>{column.name}</Typography>
                    <ListActions />
                </Box>
                <ListCards listCard={column.cards} />

                <Box height={COLUMN_FOOTER_HEIGHT} display={"flex"} alignItems={"center"} justifyContent={"space-between"}><Button fullWidth={true}
                    style={{ justifyContent: "flex-start" }} startIcon={<AddIcon />}>Add a card</Button><Tooltip title="Drag to move">
                        <DragHandleIcon sx={{ cursor: 'pointer' }} />
                    </Tooltip></Box>

            </Box>
        </div>
    )
};

export default Column;
