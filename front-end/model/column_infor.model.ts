import { ObjectId } from "mongodb";
import CardInfor from "./card_infor.model";

interface ColumnInforProps {
  _id?: ObjectId;
  name?: string;
  position?: number;
  cards?: CardInfor[];
}

class ColumnInfor {
  _id?: ObjectId;
  name: string;
  position: number;
  cards: CardInfor[];
  constructor({ _id, name, position, cards }: ColumnInforProps) {
    this._id = _id;
    this.name = name || "";
    this.position = position || 0;
    this.cards = cards || [];
  }
}

export default ColumnInfor;
