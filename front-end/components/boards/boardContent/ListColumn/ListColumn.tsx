"use client"
import { Box } from "@mui/material";
import ColumnInfor from "model/column_infor.model";
import React, { useEffect } from "react"
import Column from "./Column/Column";
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
const ListColumn = ({ columns }: { columns: Array<ColumnInfor> }) => {
    return (
        <SortableContext items={columns.map(column => column._id!)} strategy={horizontalListSortingStrategy}>
            <Box display={"flex"} gap={2}>
                {columns.map((column, index) => <Column key={index} column={column} />)}
            </Box>
        </SortableContext>
    )
};

export default ListColumn;
