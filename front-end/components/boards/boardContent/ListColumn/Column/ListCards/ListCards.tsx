"use client"
import { themeOptions } from "@/app/them";
import { Box } from "@mui/material";
import React from "react"
import CardItem from "./Card/card_item";
import CardInfor from "model/card_infor.model";
import { COLUMN_HEADER_HEIGHT, COLUMN_FOOTER_HEIGHT } from "../../../board_content";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";


const ListCards = ({ listCard }: { listCard: Array<CardInfor> }) => {
    return (
        <SortableContext items={listCard.map((card) => card._id)} strategy={verticalListSortingStrategy}>


            <Box
                sx={{

                    p: '0 5px',
                    m: '0 5px',
                    gap: 1,
                    overflowX: "hidden",
                    overflowY: "auto",
                    maxHeight: (theme) => `calc(${themeOptions.trello.boardBarContentHeight} - 
                    ${theme.spacing(5)} - 
                    ${COLUMN_HEADER_HEIGHT} - 
                    ${COLUMN_FOOTER_HEIGHT}                    
                    )`,
                    '&::-webkit-scrollbar': {
                        width: '8px',
                        height: '8px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: '#ced0da',

                        borderRadius: " 50px"
                    },


                    '&::-webkit-scrollbar-thumb:hover': {
                        backgroundColor: '#bfc2cf'

                    },
                    '&::-webkit-scrollbar-button': {
                        display: 'none',
                    },

                }}>
                {
                    listCard.map((e, index) => <CardItem key={index} card={{ ...e, visible: false }} />)
                }
            </Box>
        </SortableContext>
    )
};

export default ListCards;
