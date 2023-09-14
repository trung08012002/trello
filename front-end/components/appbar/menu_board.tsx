"use client"
import React, { useEffect, useState } from "react"
import { Board } from "type";

import MenuOneItemLayout from "./menu_one_item_layout";
import ItemBoard from "./item_board";


import NoItems from "./noItems";

import axiosClient from "@/app/api/axiosClient";
import customFetcher from "@/app/utils/fetch_instance";
const MenuBoard = () => {
  async function getBoards(): Promise<Board[]> {

    return customFetcher({ url: `/boards`, config: {} })
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
