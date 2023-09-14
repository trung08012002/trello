interface LabelModelInterface {
  _id?: string;
  text?: string;
  color?: string;
}
class LabelModel {
  _id: string;
  text: string;
  color: string;
  constructor({ text, color, _id }: LabelModelInterface) {
    this._id = _id || "";
    this.text = text || "";
    this.color = color || "";
  }
}
export default LabelModel;
