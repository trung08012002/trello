"use client"
import { themeOptions } from "@/app/them";
import { Box, Button, Card, IconButton } from "@mui/material";
import React, { useEffect } from "react"
import CardItem from "./Card/card_item";
import CardInfor, { CardInforView } from "model/card_infor.model";
import { COLUMN_HEADER_HEIGHT, COLUMN_FOOTER_HEIGHT } from "../../../board_content";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { UniqueIdentifier } from "@dnd-kit/core";
import CustomInput from "../customInput";
import { cardApi } from "src/api-client/card-api";
import AddItem from "./add_item";




const ListCards = ({ listCard, idColumn, add, setAdd }: { listCard: Array<CardInfor>, idColumn: string, add: boolean, setAdd: React.Dispatch<React.SetStateAction<boolean>> }) => {

    return (
        <SortableContext items={

            listCard.map((card) => card._id!)} strategy={verticalListSortingStrategy}>


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

                    listCard.map((e, index) =>

                        <CardItem key={index} card={{ ...e, visible: false }} />)
                }
                {
                    add ? <AddItem id={idColumn} setAdd={setAdd} /> : null
                }
            </Box>
        </SortableContext>
    )
};

export default ListCards;
