"use client";

import { Box, Button, SxProps } from "@mui/material";
import Background from "model/background.model";
import ColumnInfor from "model/column_infor.model";

import React, {
    createContext,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import {
    CollisionDetection,
    DataRef,
    DndContext,
    DragEndEvent,
    DragOverEvent,
    DragOverlay,
    DragStartEvent,
    PointerSensor,
    UniqueIdentifier,
    closestCenter,
    closestCorners,
    defaultDropAnimationSideEffects,
    getFirstCollision,
    pointerWithin,
    rectIntersection,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import NoteAddIcon from "@mui/icons-material/NoteAdd";

import { arrayMove } from "@dnd-kit/sortable";

import ListColumn from "./ListColumn/ListColumn";
import Column from "./ListColumn/Column/Column";
import CardItem from "./ListColumn/Column/ListCards/Card/card_item";
import { cloneDeep } from "lodash";
import CardInfor from "model/card_infor.model";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/redux/store";
import { setColumns } from "src/redux/features/board_reducer";
function sxCustomByBackgroundType(background: Background): SxProps {
    if (background.type === 0) {
        return {
            width: "100%",
            height: "100%",
            backgroundImage: `url(${background.url})`,
            backgroundRepeat: `no-repeat`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            overflowY: "hidden",
            overflowX: "auto",
            display: "flex",
            "&::-webkit-scrollbar": {
                width: "8px",
                height: "8px",
            },
            "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#ced0da",

                borderRadius: " 50px",
            },

            "&::-webkit-scrollbar-track": {
                m: 2,
            },

            "&::-webkit-scrollbar-thumb:hover": {
                backgroundColor: "#bfc2cf",
            },
            "&::-webkit-scrollbar-button": {
                display: "none",
            },
        };
    } else
        return {
            width: "100%",
            height: "100%",
            backgroundColor: background.backgroundColor,
            overflowY: "hidden",
            overflowX: "auto",
            display: "flex",
            "&::-webkit-scrollbar": {
                width: "8px",
                height: "8px",
            },
            "&::-webkit-scrollbar-button": {
                display: "none",
            },
        };
}
export const COLUMN_HEADER_HEIGHT = "40px";
export const COLUMN_FOOTER_HEIGHT = "56px";
enum ACTIVE_DRAG_ITEM_TYPE {
    COLUMN,
    CARD,
}
type BoardContextType = {
    orderColumns: Array<ColumnInfor>;
    setOrderColumns: React.Dispatch<React.SetStateAction<ColumnInfor[]>>;
};
export const BoardContext = createContext<BoardContextType>({
    orderColumns: Array<ColumnInfor>(),
    setOrderColumns: () => { },
});
function BoardContent({
    columns,
    background,
}: {
    columns: ColumnInfor[];
    background: Background;
}) {

    const sxCustom = sxCustomByBackgroundType(background);
    const pointerSensor = useSensor(PointerSensor, {
        activationConstraint: { distance: 10 },
    });
    const sensors = useSensors(pointerSensor);
    const [activeDragItem, setActiveDrageItem] = useState<{
        id: UniqueIdentifier | null;
        type: ACTIVE_DRAG_ITEM_TYPE | null;
        data: DataRef<any> | null;
    }>();
    const lastOverId = useRef<UniqueIdentifier | null>(null);
    const dispatch = useDispatch();
    const prevColumns = useSelector((state: RootState) => state.board.columns);

    const handleDragStart = (event: DragStartEvent) => {
        setActiveDrageItem({
            id: event?.active?.id,
            type: event?.active?.data?.current?.idBoard
                ? ACTIVE_DRAG_ITEM_TYPE.COLUMN
                : ACTIVE_DRAG_ITEM_TYPE.CARD,
            data: event.active.data,
        });
    };
    const findColumnByIdCard = (id: UniqueIdentifier) => {
        return prevColumns.find(
            (column) =>
                column.cards.findIndex((card) => card._id?.toString() == id) != -1
        );
    };
    const handleDragOver = (event: DragOverEvent) => {
        const { active, over } = event;

        if (!active || !over) {
            return;
        }
        const {
            id: activeDraggingCardId,
            data: { current: activeDraggingCardData },
        } = active;
        const { id: overCardId } = over;

        if (activeDragItem?.type == ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
            return;
        } else if (activeDragItem?.type == ACTIVE_DRAG_ITEM_TYPE.CARD) {
            if (activeDraggingCardId !== overCardId) {
                const activeColumn = findColumnByIdCard(activeDraggingCardId);
                const overColumn = findColumnByIdCard(overCardId);
                if (!activeColumn || !overColumn) {
                    return;
                }

                if (activeColumn._id !== overColumn._id) {
                    const overCardIndex = overColumn.cards.findIndex(
                        (card) => card._id == overCardId
                    );

                    let newCardIndex;
                    const isBelowOverItem =
                        over &&
                        active.rect.current.translated &&
                        active.rect.current.translated.top >
                        over.rect.top + over.rect.height;

                    const modifier = isBelowOverItem ? 1 : 0;

                    newCardIndex =
                        overCardIndex >= 0
                            ? overCardIndex + modifier
                            : overColumn.cards.length + 1;

                    const nextColumns = cloneDeep(prevColumns);

                    const nextActiveColumn = nextColumns.find(
                        (column) => column._id === activeColumn._id
                    );

                    const nextOverColumn = nextColumns.find(
                        (column) => column._id === overColumn._id
                    );

                    if (nextActiveColumn) {
                        nextActiveColumn.cards = nextActiveColumn.cards.filter(
                            (card) => card._id != activeDraggingCardId
                        );
                        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(
                            (card) => card._id!
                        );

                    }
                    if (nextOverColumn) {

                        nextOverColumn.cards = nextOverColumn.cards.filter(
                            (card) => card._id != activeDragItem.id
                        );

                        nextOverColumn.cards = [
                            ...nextOverColumn.cards.slice(0, newCardIndex),
                            activeDraggingCardData,
                            ...nextOverColumn.cards.slice(newCardIndex),
                        ] as CardInfor[];
                        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(
                            (card) => card._id!
                        );


                    }
                    console.log("nextColumns")
                    nextColumns.forEach((column) => {
                        console.log("card", column.cards)
                        console.log("cardId", column.cardOrderIds)
                    })

                    dispatch(setColumns(nextColumns))


                }
            }
        }
    };
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!active || !over) {
            return;
        }
        if (activeDragItem?.type == ACTIVE_DRAG_ITEM_TYPE.CARD) {
            const {
                id: activeDraggingCardId,
                data: { current: activeDraggingCardData },
            } = active;
            const { id: overCardId } = over;

            const activeColumn = findColumnByIdCard(activeDraggingCardId);
            const overColumn = findColumnByIdCard(overCardId);
            if (!activeColumn || !overColumn) {
                return;
            }
            if (activeColumn._id !== overColumn._id) {
                const overCardIndex = overColumn.cards.findIndex(
                    (card) => card._id == overCardId
                );

                let newCardIndex;
                const isBelowOverItem =
                    over &&
                    active.rect.current.translated &&
                    active.rect.current.translated.top >
                    over.rect.top + over.rect.height;

                const modifier = isBelowOverItem ? 1 : 0;

                newCardIndex =
                    overCardIndex >= 0
                        ? overCardIndex + modifier
                        : overColumn.cards.length + 1;

                const nextColumns = cloneDeep(prevColumns);

                const nextActiveColumn = nextColumns.find(
                    (column) => column._id === activeColumn._id
                );

                const nextOverColumn = nextColumns.find(
                    (column) => column._id === overColumn._id
                );

                if (nextActiveColumn) {
                    nextActiveColumn.cards = nextActiveColumn.cards.filter(
                        (card) => card._id != activeDragItem.id
                    );
                    nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(
                        (card) => card._id!
                    );
                }
                if (nextOverColumn) {
                    nextOverColumn.cards = nextOverColumn.cards.filter(
                        (card) => card._id != activeDragItem.id
                    );

                    nextOverColumn.cards = [
                        ...nextOverColumn.cards.slice(0, newCardIndex),
                        activeDraggingCardData,
                        ...nextOverColumn.cards.slice(newCardIndex),
                    ] as CardInfor[];
                    nextOverColumn.cardOrderIds = nextOverColumn.cards.map(
                        (card) => card._id!
                    );
                }
                dispatch(setColumns(nextColumns))
            } else {
                const oldCardIndex = activeColumn.cards.findIndex(
                    (c) => c._id == activeDraggingCardId
                );
                const newCardIndex = overColumn.cards.findIndex(
                    (c) => c._id == overCardId!
                );

                const dndOrderedCard = arrayMove(
                    activeColumn.cards,
                    oldCardIndex,
                    newCardIndex
                );
                const nextColumns = cloneDeep(prevColumns);
                const targetColumn = nextColumns.find((c) => c._id == overColumn._id);
                if (!targetColumn) {
                    return prevColumns;
                }
                targetColumn.cards = dndOrderedCard;
                targetColumn.cardOrderIds = dndOrderedCard.map((c) => c._id!);
                dispatch(setColumns(nextColumns))

            }
        } else if (activeDragItem?.type == ACTIVE_DRAG_ITEM_TYPE.COLUMN) {

            if (active.id !== over!.id) {
                const oldIndex = prevColumns.findIndex(
                    (c) => c._id?.toString() == active.id
                );

                const newIndex = prevColumns.findIndex(
                    (c) => c._id?.toString() == over.id
                );

                if (activeDragItem?.type === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {

                    const dndOrderedColumns = arrayMove(prevColumns, oldIndex, newIndex);

                    dispatch(setColumns(dndOrderedColumns));
                }
            }
        }
        setActiveDrageItem({ id: null, type: null, data: null });
    };
    const dropAnimation = {
        sideEffects: defaultDropAnimationSideEffects({
            styles: {
                active: {
                    opacity: "0.5",
                },
            },
        }),
    };
    const collisionDetectionStrategy: CollisionDetection = useCallback(
        (args) => {
            if (activeDragItem?.type === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
                return closestCorners({ ...args });
            }

            const pointerIntersections = pointerWithin(args);
            if (!pointerIntersections.length) return rectIntersection(args);
            // const intersections =
            //     pointerIntersections.length > 0
            //         ? // If there are droppables intersecting with the pointer, return those
            //         pointerIntersections
            //         : rectIntersection(args);
            // let overId = getFirstCollision(intersections, 'id');
            let overId = getFirstCollision(pointerIntersections, "id");

            if (overId) {
                const haveColumn = prevColumns.find((column) => column?._id == overId);
                if (haveColumn) {
                    const temp = closestCorners({
                        ...args,
                        droppableContainers: args.droppableContainers.filter(
                            (container) => {
                                return (
                                    container.id !== overId &&
                                    haveColumn.cardOrderIds.includes(container.id.toString())
                                );
                            }
                        ),
                    });

                    if (temp.length > 0) {
                        overId = temp[0].id;
                    }
                }

                lastOverId.current = overId;
                return [{ id: overId }];
            }
            return closestCorners({ ...args });
        },
        [prevColumns, activeDragItem]
    );
    return (
        <DndContext
            collisionDetection={collisionDetectionStrategy}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDragStart={handleDragStart}
            sensors={sensors}
        >
            <Box
                sx={sxCustom}
                justifyContent={"flex-start"}
                alignItems={"flex-start"}
                padding={"10px  5px"}
                gap={2}
            >

                <ListColumn columns={prevColumns} />
                <DragOverlay dropAnimation={dropAnimation}>
                    {(!activeDragItem?.id || !activeDragItem.type) && null}
                    {activeDragItem?.id &&
                        activeDragItem.type === ACTIVE_DRAG_ITEM_TYPE.COLUMN && (
                            <Column column={activeDragItem.data?.current!} />
                        )}
                    {activeDragItem?.id &&
                        activeDragItem.type === ACTIVE_DRAG_ITEM_TYPE.CARD && (
                            <CardItem card={activeDragItem.data?.current!} />
                        )}
                </DragOverlay>

                <Box
                    sx={{
                        minWidth: "200px",
                        maxWidth: "200px",
                        mx: 2,
                        borderRadius: "6px",
                        height: "fit-content",
                        bgColor: "#ffffff3d",
                    }}
                >
                    <Button
                        startIcon={<NoteAddIcon />}
                        sx={{ color: "white" }}
                        style={{ backgroundColor: "#ffffff3d" }}
                    >
                        Add new column
                    </Button>
                </Box>
            </Box>
        </DndContext>
    );
}

export default BoardContent;
