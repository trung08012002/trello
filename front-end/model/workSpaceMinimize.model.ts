interface IWorkSpaceMinimize {
  _id?: string;
  workSpaceName: string;
  backgroundWorkSpace: string;
  boardOfWorkSpace: [];
}

class WorkSpaceMinimize {
  _id?: string;
  workSpaceName: string;
  backgroundWorkSpace: string;
  boardOfWorkSpace: [];
  constructor({
    _id,
    workSpaceName,
    boardOfWorkSpace,
    backgroundWorkSpace,
  }: IWorkSpaceMinimize) {
    this._id = _id;
    this.workSpaceName = workSpaceName;
    this.backgroundWorkSpace = backgroundWorkSpace;
    this.boardOfWorkSpace = boardOfWorkSpace;
  }
}
export default WorkSpaceMinimize;
