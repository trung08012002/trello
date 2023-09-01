import Background from "./background.model";
import ColumnInfor from "./column_infor.model";
import UserMinimize from "./userMinimize";

interface IBoard {
  visibility?: string;
  members?: Array<UserMinimize>;
  favorite?: boolean;
  background?: Background;
  columnInfor?: Array<ColumnInfor>;
}

class Board {
  visibility: string;
  members: Array<UserMinimize>;
  favorite: boolean;
  background: Background;
  columnInfor: Array<ColumnInfor>;
  constructor({
    visibility,
    members,
    favorite,
    background,
    columnInfor,
  }: IBoard) {
    this.visibility = visibility || "Public";
    this.members = members || [];
    this.favorite = favorite || false;
    this.background = background || new Background({ type: 0 });
    this.columnInfor = columnInfor || [];
  }
}

export default Board;
