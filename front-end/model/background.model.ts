interface IBackground {
  _id?: string;
  type: number;
  url?: string;
  backgroundColor?: string;
}

class Background {
  _id?: string;
  type: number;
  url: string;
  backgroundColor: string;
  constructor({ _id, type, url, backgroundColor }: IBackground) {
    this._id = _id;
    this.type = type;
    this.url = url || "";
    this.backgroundColor = backgroundColor || "";
  }
}
export default Background;
