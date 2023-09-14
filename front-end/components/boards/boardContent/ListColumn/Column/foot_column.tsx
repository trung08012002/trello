"use client"
import { Box, Button, Tooltip } from "@mui/material";
import React from "react"
import AddIcon from '@mui/icons-material/Add';
import DragHandleIcon from '@mui/icons-material/DragHandle';



const FootColumn = ({ setAdd }: { setAdd: React.Dispatch<React.SetStateAction<boolean>> }) => {



    return (
        <>

            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Button fullWidth={true}
                    onClick={() => { setAdd(true) }}
                    style={{ justifyContent: "flex-start" }} sx={{ borderRadius: "50px" }} startIcon={<AddIcon />}>Add a card</Button>

                <Tooltip title="Drag to move">
                    <DragHandleIcon sx={{ cursor: 'pointer' }} />
                </Tooltip>
            </Box>


        </>
    )
};

export default FootColumn;
