import UserMinimize from "./userMinimize";

interface ActivityInterface {
  _id?: string;
  content: string;
  uploadedby: UserMinimize;
  createdate: string;
}

class Activity {
  _id?: string;
  content: string;
  uploadedby: UserMinimize;
  createdate: string;
  constructor({ _id, uploadedby, content, createdate }: ActivityInterface) {
    this._id = _id;
    this.content = content;
    this.uploadedby = uploadedby;
    this.createdate = createdate;
  }
}
export default Activity;
