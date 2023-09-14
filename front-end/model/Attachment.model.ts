interface AttachmentInterface {
    _id?: string,
    filename: string
    url: string
    uploadedby: string,
    createdat: Date
}

class Attachment {
    _id?: string
    filename: string
    url: string
    uploadedby: string
    createdat: Date
    constructor({ _id, filename, url, uploadedby, createdat }: AttachmentInterface) {
        this._id = _id
        this.filename = filename
        this.url = url
        this.uploadedby = uploadedby
        this.createdat = createdat
    }
}
export default Attachment