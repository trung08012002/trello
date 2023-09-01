"use client"
import React, { useEffect, useState } from "react"
import { Board } from "type";

import MenuOneItemLayout from "./menu_one_item_layout";
import ItemBoard from "./item_board";


import NoItems from "./noItems";

import axiosClient from "@/app/api/axiosClient";
const MenuBoard = () => {
  async function getBoards(): Promise<Board[]> {

    const data = await axiosClient.get(`/boards`)


    console.log("data :" + data.data.data)
    return data.data.data as unknown as Board[];
  }
  const [boards, setBoards] = useState<Board[]>([]);
  useEffect(() => {
    getBoards().then(boards => setBoards(boards))
  }, [])

  return (
    <MenuOneItemLayout
      title={undefined} theme={"Your Boards"}>
      {
        boards.length > 0 ?
          boards.map((item) => <ItemBoard key={item._id} id={item._id} backgroundColor={item.backgroundColor} nameBoard={item.name} workPlace={""} icon={undefined} />) :
          <NoItems img={"/../../images/no-item.png"} text={"You’ll find the boards you’ve recently viewed here."} />
      }


    </MenuOneItemLayout>
  )
};

export default MenuBoard;
