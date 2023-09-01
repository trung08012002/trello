"use client"
import { Box, Button, Dialog, DialogContent } from "@mui/material";
import React, { useContext, useEffect, useState } from "react"
import FormCreateWorkSpace from "./form_create_workspace";
import { ParentContextButtonPopup } from "../button_pop_up";

type createWorkspaceType = {
    back: () => void
}

const CreateWorkspaceDiaLog = ({ openDiaLog, setopenDiaLog }: { openDiaLog: boolean, setopenDiaLog: React.Dispatch<React.SetStateAction<boolean>> }) => {



    const handleCloseDialog = () => {
        setopenDiaLog(false);
    };
    return (
        <>

            <Dialog open={openDiaLog} onClose={handleCloseDialog} >
                <DialogContent>
                    <Box><FormCreateWorkSpace /></Box>
                    <Box></Box>
                </DialogContent>
            </Dialog>
        </>
    )
};

export default CreateWorkspaceDiaLog;
