"use client"
import React, { useContext, useState } from "react"
import MenuCreate from "../menu_create";
import CreateWorkspaceDiaLog from "./dialog";
import { ParentContextButtonPopup } from "../button_pop_up";

const MenuCreateParent = () => {
    const [openDiaLog, setopenDiaLog] = useState(false)
    const closeCreateFormAndPopUpDialog = () => {
        handleClose()
        setopenDiaLog(true)
    }
    console.log(typeof closeCreateFormAndPopUpDialog)
    const { handleClose } = useContext(ParentContextButtonPopup);
    return (

        <>
            <MenuCreate closeCreateFormAndPopUpDialog={closeCreateFormAndPopUpDialog} />
            <CreateWorkspaceDiaLog openDiaLog={openDiaLog} setopenDiaLog={setopenDiaLog} />
        </>
    )
};

export default MenuCreateParent;
