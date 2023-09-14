import LabelModel from "./Label.model";
import CheckList from "./check_list";

interface CardInforProps {
  _id?: string;
  title?: string;
  members?: any[];
  description?: string;
  dueDate?: Date;
  acrhived?: boolean;
  checkLists?: Array<CheckList>;
  comments?: Array<any>;
  labels?: Array<LabelModel>;
  shownLabels?: Array<LabelModel>;
  cover?: string;
  startDate?: Date;
  visible?: boolean;
  attachments?: Array<any>;
  fe_placeholder?: boolean;
}
class CardInfor {
  _id?: string;
  title: string;
  members: any[];
  checkLists: Array<CheckList>;
  description: string;
  dueDate: Date;
  shownLabels: Array<LabelModel>;
  comments: Array<any>;
  acrhived: boolean;
  labels: Array<any>;
  cover: string;
  startDate: Date;
  visible: boolean;
  attachments: Array<any>;
  fe_placeholder?: boolean;
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
    fe_placeholder,
    shownLabels,
    visible,
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
    this.fe_placeholder = fe_placeholder ?? false;
    this.shownLabels = shownLabels || [];
    this.visible = visible || false;
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
