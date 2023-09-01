
"use client"
// import { options } from "@/app/api/auth/[...nextauth]/options";

import BoardBar from "@/components/boards/boardBar";
import BoardLayout from "@/components/boards/boardLayout";



import React, { useEffect, useState } from "react"
import { store } from "src/redux/store";
import { setBoard } from "src/redux/features/board_reducer";

import axiosClient from "@/app/api/axiosClient";
import BoardContent from "@/components/boards/boardContent/board_content";
import Board from "model/board.model";
import customFetcher from "@/app/utils/fetch_instance";

async function fetchDataBoard(id: string) {
    customFetcher()
    try {
        const data = await axiosClient.get(`/boards/${id}`)



        return data.data.data;
    }
    catch (err) {
        console.log(err)
    }



}


function PageBoardDetail({ params }: { params: { id: string } }) {
    const [boardPageDetail, setboardPageDetail] = useState<Board>(new Board({}))
    useEffect(() => {
        fetchDataBoard(params.id).then((data) => {

            setboardPageDetail(data)

        })
    }, [params.id])


    return (
        <>
            <BoardLayout boardBar={<BoardBar
                favorite={boardPageDetail.favorite} visibility={boardPageDetail.visibility}
            />} boardContainer={<BoardContent columns={boardPageDetail.columnInfor} background={boardPageDetail.background} />} />
        </>

    )
};

export default PageBoardDetail;
