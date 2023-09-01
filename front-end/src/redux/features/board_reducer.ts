import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Background from "model/background.model";
import Board from "model/board.model";
import ColumnInfor from "model/column_infor.model";
import UserMinimize from "model/userMinimize";

const initialState = {
  search: "",
  columns: new Array<ColumnInfor>(),
  visibility: "Public",
  members: new Array<UserMinimize>(),
  favorite: false,
  background: new Background({ type: 0 }),
};

const boardSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setBoard: (state, action: PayloadAction<Board>) => {
      console.log("board", action.payload);
      state.background = action.payload.background;
      state.columns = action.payload.columnInfor;
      state.favorite = action.payload.favorite;
      state.members = action.payload.members;
      state.visibility = action.payload.visibility;
    },
    setColumns(state, action: PayloadAction<Array<ColumnInfor>>) {
      state.columns = action.payload;
    },
  },
});

const { actions, reducer } = boardSlice;

export const { setSearch, setColumns, setBoard } = actions;
export default reducer;
