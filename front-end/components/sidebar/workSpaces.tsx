import { Box, IconButton, Typography } from "@mui/material";
import React, { useState } from "react"
import AddIcon from '@mui/icons-material/Add';
import ItemWorkSpace from "../appbar/item_work_space";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';


const WorkSpaces = () => {
    const [workSpaces, setWorkSpaces] = useState<Array<{ img: string, title: string, id: string }>>([
        { img: "#", title: "Nguyễn Hoài Trung's workspace", id: "1" },
        { img: "#", title: "tato", id: "2" },
        { img: "#", title: "w", id: "3" }
    ]);
    return (
        <Box display={"flex"} flexDirection={"column"}>
            <Box display={"flex"} justifyContent={"space-between"}>
                <Typography>Workspaces</Typography>
                <IconButton onClick={() => { }}><AddIcon /></IconButton>
            </Box>
            {

            }
        </Box>
    )
};

export default WorkSpaces;
