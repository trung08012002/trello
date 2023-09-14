

interface IUserMinimize {
  _id?: string;
  name?: string;
  backgroundColor?: string;
  email?: string;
  role?: string;
}
class UserMinimize {
  _id?: string;
  name: string;
  backgroundColor: string;
  email: string;
  role: string;
  constructor({ _id, name,backgroundColor, email, role }: IUserMinimize) {
    this._id = _id;
    this.name = name || "";
    this.email = email || "";
    this.role = role || "User";
    this.backgroundColor = backgroundColor || "#00875A"
  }
}

export default UserMinimize;
