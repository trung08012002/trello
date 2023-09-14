"use client"

import ListActions from "@/components/boards/list_actions";
import { Typography, } from "@mui/material";
import Box from "@mui/material/Box/Box";
import React, { useContext, useState } from "react"



import ListCards from "./ListCards/ListCards";
import ColumnInfor from "model/column_infor.model";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';
import { BoardContext, COLUMN_FOOTER_HEIGHT, COLUMN_HEADER_HEIGHT } from "../../board_content";
import FootColumn from "./foot_column";

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
    const [add, setAdd] = useState(false);
    return (
        <div ref={setNodeRef}
            style={DndkitColumnStyle}
            {...attributes}>
            <Box
                {...listeners}
                sx={{
                    width: '300px',
                    borderRadius: "10px",


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
                <ListCards listCard={column.cards} idColumn={column._id || ""} add={add} setAdd={setAdd} />

                {add ? null :
                    <Box sx={{
                        p: '0 5px',
                        m: '0 5px',
                    }} minHeight={COLUMN_FOOTER_HEIGHT}

                    >
                        <FootColumn setAdd={setAdd} />
                    </Box>
                }

            </Box>
        </div>
    )
}
export default Column
