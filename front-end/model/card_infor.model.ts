import { ObjectId } from "mongodb";
import CheckList from "./check_list";

interface CardInforProps {
  _id?: ObjectId;
  title?: string;
  members?: any[];
  description?: string;
  dueDate?: Date;
  acrhived?: boolean;
  checkLists?: Array<CheckList>;
  comments?: Array<any>;
  labels?: Array<any>;
  cover?: string;
  startDate?: Date;
  attachments: Array<any>;

}
class CardInfor {
  _id?: ObjectId;
  title: string;
  members: any[];
  checkLists: Array<CheckList>;
  description: string;
  dueDate: Date;

  comments: Array<any>;
  acrhived: boolean;
  labels: Array<any>;
  cover: string;
  startDate: Date;
  attachments: Array<any>;

  constructor({
    _id,
    title,
    members,
    labels,
    dueDate,
    acrhived,
    checkLists,
    comments,
    cover,
    startDate,
    attachments,
    description,

  }: CardInforProps) {
    this._id = _id;
    this.title = title || "";
    this.members = members || [];
    this.labels = labels || [];
    this.dueDate = dueDate || new Date();
    this.acrhived = acrhived || false;
    this.checkLists = checkLists || [];
    this.comments = comments || [];
    this.cover = cover || "";
    this.startDate = startDate || new Date();
    this.attachments = attachments || [];
    this.description = description || "";
   
  }
}
interface ICardInforView extends CardInforProps {
  visible?: boolean;
}
class CardInforView extends CardInfor {
  visible: boolean;
  constructor({
    _id,
    title,
    members,
    labels,
    dueDate,
    acrhived,
    checkLists,
    comments,
    cover,
    startDate,
    attachments,
    description,
    visible,
  }: ICardInforView) {
    super({
      _id,
      title,
      members,
      labels,
      dueDate,
      acrhived,
      checkLists,
      comments,
      cover,
      startDate,
      attachments,   
      description,
    });
    this.visible = visible ?? false;
  }
}
export { CardInforView };
export default CardInfor;
