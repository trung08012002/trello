interface CheckListItemInterface {
  _id?: string;
  text: string;
  completed?: boolean;
}
class CheckListItem {
  _id?: string;
  text: string;
  completed: boolean;
  constructor({ _id, text, completed }: CheckListItemInterface) {
    this._id = _id;
    this.text = text;
    this.completed = completed || false;
  }
}

export default CheckListItem;
