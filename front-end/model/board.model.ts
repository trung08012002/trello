import Background from "./background.model";
import ColumnInfor from "./column_infor.model";
import UserMinimize from "./userMinimize";

interface IBoard {
  _id: string;
  name?: string;
  visibility?: string;
  members?: Array<UserMinimize>;
  favorite?: boolean;
  background?: Background;
  columnInfor?: Array<ColumnInfor>;
}

class Board {
  _id: string;
  name: string;
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
    name,
    _id,
  }: IBoard) {
    this._id = _id || "";
    this.name = name || "";
    this.visibility = visibility || "Public";
    this.members = members || [];
    this.favorite = favorite || false;
    this.background = background || new Background({ type: 0 });
    this.columnInfor = columnInfor || [];
  }
}

export default Board;
