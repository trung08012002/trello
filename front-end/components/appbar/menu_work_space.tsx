"use client"
import React, { useEffect, useState } from "react"

import ItemWorkSpace from "./item_work_space";
import MenuOneItemLayout from "./menu_one_item_layout";

import { Divider, Typography } from "@mui/material";
import { CustomGlobalStyle } from "../styles/customGlobalStyle";


import NoItems from "./noItems";

import customFetcher from "@/app/utils/fetch_instance";
import axiosClient from "@/app/api/axiosClient";

type workSpace = {
  id: string,
  name: string,
  backgroundImage: string,
}

async function getWorkSpaces(): Promise<workSpace[]> {

  const data = await axiosClient.get(`/workSpaces`)

  return data.data as unknown as workSpace[];
}

const MenuWorkSpace = () => {
  const [workSpaces, setWorkSpaces] = useState<workSpace[]>([])
  useEffect(() => {
    getWorkSpaces().then(workSpaces => setWorkSpaces(workSpaces));
  }, [])

  return (
    <MenuOneItemLayout
      title={undefined} theme={"Current WorkSpace"}>
      {workSpaces?.length > 0 ?

        <>
          <ItemWorkSpace id={workSpaces[0].id} backgroundColor={workSpaces[0].backgroundImage} title={workSpaces[0].name} icon={undefined} key={workSpaces[0].id} />
          <Divider />
          <Typography paddingLeft={2} mt={1} sx={CustomGlobalStyle.text12gray}>Your Workspaces</Typography>
          {workSpaces.map((item) => <ItemWorkSpace backgroundColor={item.backgroundImage} id={item.id} title={item.name} icon={undefined} key={item.id} />)}

        </>
        : <NoItems img={"/../../images/no-item.png"} text={"You’ll find the workspaces you’ve recently viewed here."} />
      }





    </MenuOneItemLayout>
  )
};

export default MenuWorkSpace;
