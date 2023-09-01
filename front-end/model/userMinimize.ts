import { ObjectId } from "mongodb";

interface IUserMinimize {
  _id?: ObjectId;
  name?: string;

  email?: string;
  role?: string;
}
class UserMinimize {
  _id?: ObjectId;
  name: string;

  email: string;
  role: string;
  constructor({ _id, name, email, role }: IUserMinimize) {
    this._id = _id;
    this.name = name || "";
    this.email = email || "";
    this.role = role || "User";
  }
}

export default UserMinimize;
