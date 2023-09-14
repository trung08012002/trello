import CardInfor from "./card_infor.model";

interface ColumnInforProps {
  _id?: string;
  name?: string;

  cards?: CardInfor[];
  cardOrderIds?: string[];
}

class ColumnInfor {
  _id?: string;
  name: string;
  cards: CardInfor[];
  cardOrderIds: string[];
  constructor({ _id, name, cards, cardOrderIds }: ColumnInforProps) {
    this._id = _id;
    this.name = name || "";

    this.cards = cards || [];
    this.cardOrderIds = cardOrderIds || [];
  }
}

export default ColumnInfor;
