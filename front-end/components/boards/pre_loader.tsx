"use client"
import ColumnInfor from "model/column_infor.model";
import React, { useRef } from "react"
import { setColumns } from "src/redux/features/board_reducer";
import { store } from "src/redux/store";

const PreLoader = ({ data }: { data: ColumnInfor[] }) => {
    const loaded = useRef(false)
    if (!loaded.current) {
        store.dispatch(setColumns(data))
        loaded.current = true
    }
    return null;
};

export default PreLoader;
