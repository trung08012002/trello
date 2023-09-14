
"use client"
// import { options } from "@/app/api/auth/[...nextauth]/options";

import BoardBar from "@/components/boards/boardBar";
import BoardLayout from "@/components/boards/boardLayout";



import React, { useEffect, useState } from "react"
import { RootState, store } from "src/redux/store";
import { setBoard } from "src/redux/features/board_reducer";

import axiosClient from "@/app/api/axiosClient";
import BoardContent from "@/components/boards/boardContent/board_content";
import Board from "model/board.model";
import customFetcher from "@/app/utils/fetch_instance";
import CardInfor from "model/card_infor.model";
import { useDispatch, useSelector } from "react-redux";
import WorkSpaceMinimize from "model/workSpaceMinimize.model";

async function fetchDataBoard(id: string) {

    try {
        const data: Board & WorkSpaceMinimize = await customFetcher({ url: `/boards/${id}`, config: {} })


        data.columnInfor.forEach((column) => {
            column.cards.unshift(new CardInfor({ _id: `${column._id}Place_holder_view`, fe_placeholder: true }))
            column.cardOrderIds.unshift(`${column._id}Place_holder_view`)
        })

        return data;
    }
    catch (err) {
        console.log(err)
    }



}


function PageBoardDetail({ params }: { params: { id: string } }) {
    const dispatch = useDispatch();
    const board = useSelector((state: RootState) => state.board)
    useEffect(() => {

        fetchDataBoard(params.id).then((data) => {

            if (data) {
                dispatch(setBoard(data));

            }
        })
    }, [params.id])


    return (
        <>
            <BoardLayout boardBar={<BoardBar
                favorite={board.favorite} visibility={board.visibility}
            />} boardContainer={<BoardContent columns={board.columns} background={board.background} />} />
        </>

    )
};

export default PageBoardDetail;
