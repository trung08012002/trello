"use client"

import { Box, Button, SxProps } from "@mui/material";
import Background from "model/background.model";
import ColumnInfor from "model/column_infor.model";

import React, { useEffect, useState } from "react"
import { DataRef, DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, PointerSensor, UniqueIdentifier, defaultDropAnimationSideEffects, useSensor, useSensors } from '@dnd-kit/core';
import NoteAddIcon from '@mui/icons-material/NoteAdd';

import { arrayMove } from "@dnd-kit/sortable";
import { store } from "src/redux/store";
import ListColumn from "./ListColumn/ListColumn";
import Column from "./ListColumn/Column/Column";
import CardItem from "./ListColumn/Column/ListCards/Card/card_item";

function sxCustomByBackgroundType(background: Background): SxProps {
    if (background.type === 0) {
        return {
            width: '100%',
            height: '100%',
            backgroundImage: `url(${background.url})`,
            backgroundRepeat: `no-repeat`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            overflowY: 'hidden',
            overflowX: 'auto',
            display: 'flex',
            '&::-webkit-scrollbar': {
                width: '8px',
                height: '8px',
            },
            '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#ced0da',

                borderRadius: " 50px"
            },

            "&::-webkit-scrollbar-track": {
                m: 2
            },

            '&::-webkit-scrollbar-thumb:hover': {
                backgroundColor: '#bfc2cf'

            },
            '&::-webkit-scrollbar-button': {
                display: 'none',
            },
        }
    }
    else return {
        width: '100%',
        height: '100%',
        backgroundColor: background.backgroundColor,
        overflowY: 'hidden',
        overflowX: 'auto',
        display: 'flex',
        '&::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
        },
        '&::-webkit-scrollbar-button': {
            display: 'none',
        },
    }
}
export const COLUMN_HEADER_HEIGHT = "25px"
export const COLUMN_FOOTER_HEIGHT = "56px"
enum ACTIVE_DRAG_ITEM_TYPE {
    COLUMN,
    CARD
}
function BoardContent({ columns, background }: { columns: ColumnInfor[], background: Background }) {
    const [orderColumns, setOrderColumns] = useState<Array<ColumnInfor>>([])
    const sxCustom = sxCustomByBackgroundType(background)
    const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
    const sensors = useSensors(pointerSensor)
    const [activeDragItem, setActiveDrageItem] = useState<{ id: UniqueIdentifier | null, type: ACTIVE_DRAG_ITEM_TYPE | null, data: DataRef<any> | null }>()

    useEffect(() => {
        setOrderColumns(columns)

    }, [columns])
    const handleDragStart = (event: DragStartEvent) => {
        // console.log("handleDragStart:", event)
        setActiveDrageItem({ id: event?.active?.id, type: event?.active?.data?.current?.idBoard ? ACTIVE_DRAG_ITEM_TYPE.COLUMN : ACTIVE_DRAG_ITEM_TYPE.CARD, data: event.active.data })

    }
    const handleDragOver = (event: DragOverEvent) => {
        if (activeDragItem?.type == ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
            return
        }
        const { active, over } = event
        console.log("active:", active)
        console.log("over:", over)
    }
    const handleDragEnd = (event: DragEndEvent) => {
        // console.log("handleDragEnd:", event)

        const { active, over } = event
        if (!over) {
            return
        }
        if (active.id !== over!.id) {

            const oldIndex = orderColumns.findIndex((c) => c._id?.toString() == active.id)

            const newIndex = orderColumns.findIndex((c) => c._id?.toString() == over.id)

            if (activeDragItem?.type === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
                const dndOrderedColumns = arrayMove(orderColumns, oldIndex, newIndex)

                setOrderColumns(dndOrderedColumns)
            };
        }
        setActiveDrageItem({ id: null, type: null, data: null })
    }
    const dropAnimation = {
        sideEffects: defaultDropAnimationSideEffects(
            {
                styles: {
                    active: {
                        opacity: '0.5'
                    }
                }
            }
        )
    }
    return <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart} sensors={sensors}>
        <Box
            sx={sxCustom}
            justifyContent={"flex-start"}
            alignItems={"flex-start"}
            padding={"10px  5px"}
            gap={2}
        >
            <ListColumn columns={orderColumns} />
            <DragOverlay dropAnimation={dropAnimation}>
                {(!activeDragItem?.id || !activeDragItem.type) && null}
                {(activeDragItem?.id && activeDragItem.type === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Column column={activeDragItem.data?.current!} />}
                {(activeDragItem?.id && activeDragItem.type === ACTIVE_DRAG_ITEM_TYPE.CARD) && <CardItem card={activeDragItem.data?.current!} />}
            </DragOverlay>
            <Box sx={{ minWidth: '200px', 'maxWidth': "200px", mx: 2, borderRadius: '6px', height: "fit-content", bgColor: "#ffffff3d" }}>
                <Button startIcon={<NoteAddIcon />} sx={{ color: 'white' }} style={{ backgroundColor: "#ffffff3d" }}>Add new column</Button>
            </Box>
        </Box >
    </DndContext>
};

export default BoardContent;
