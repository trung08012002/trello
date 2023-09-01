import { Collection, Db, MongoClient, ServerApiVersion } from 'mongodb'
import dotenv from 'dotenv'
import User from '~/models/schemas/User.schema'
import RefreshToken from '~/models/schemas/RefreshToken.schema'
import WorkSpace from '~/models/schemas/WorkSpace.schema'
import Board from '~/models/schemas/Board.schema'
import Card from '~/models/schemas/Card.schema'
import CheckList from '~/models/schemas/CheckList.schema'
import CheckListItem from '~/models/schemas/CheckListItem.schema'
import Attachment from '~/models/schemas/Attachment.schema'
import Column from '~/models/schemas/Columns.schema'
import WorkSpaceType from '~/models/schemas/WorkSpaceType.schema'
import Background from '~/models/schemas/background.schema'

dotenv.config()

const uri = `mongodb+srv://${process.env.ACCOUNT_DB}:${process.env.PASSWORD_DB}@cluster0.bzkesrd.mongodb.net/?retryWrites=true&w=majority`

class DatabaseService {
  private client: MongoClient
  private db: Db
  constructor() {
    this.client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
      }
    })
    this.db = this.client.db(process.env.DB_NAME)
  }

  destructor() {
    this.client.close()
  }
  async connect(): Promise<void> {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await this.client.connect()
      // Send a ping to confirm a successful connection
      await this.db.command({ ping: 1 })
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } catch (error) {
      console.log(error)
    }
  }
  get users(): Collection<User> {
    return this.db.collection<User>(process.env.DB_USERS_COLLECTION as string)
  }
  get tokenRefreshToken(): Collection<RefreshToken> {
    return this.db.collection<RefreshToken>(process.env.DB_REFRESH_TOKENS_COLLECTION as string)
  }
  get workSpaces(): Collection<WorkSpace> {
    return this.db.collection<WorkSpace>(process.env.DB_WORKSPACE_COLLECTION as string)
  }
  get boards(): Collection<Board> {
    return this.db.collection<Board>(process.env.DB_BOARD_COLLECTION as string)
  }
  get cards(): Collection<Card> {
    return this.db.collection<Card>(process.env.DB_CARD_COLLECTION as string)
  }
  get checkLists(): Collection<CheckList> {
    return this.db.collection<CheckList>(process.env.DB_CHECKLIST_COLLECTION as string)
  }
  get checkListItems(): Collection<CheckListItem> {
    return this.db.collection<CheckListItem>(process.env.DB_CHECKLISTITEM_COLLECTION as string)
  }
  get comments(): Collection<Comment> {
    return this.db.collection<Comment>(process.env.DB_COMMENT_COLLECTION as string)
  }
  get attachments(): Collection<Attachment> {
    return this.db.collection<Attachment>(process.env.DB_ATTACHMENT_COLLECTION as string)
  }
  get columns(): Collection<Column> {
    return this.db.collection<Column>(process.env.DB_COLUMN_COLLECTION as string)
  }
  get workSpaceTypes(): Collection<WorkSpaceType> {
    return this.db.collection<WorkSpaceType>(process.env.DB_WORKSPACETYPE_COLLECTION as string)
  }
  get background(): Collection<Background> {
    return this.db.collection<Background>(process.env.DB_BACKGROUND_COLLECTION as string)
  }
}

// Create a MongoClient with a MongoClientOptions object to set the Stable API version

const databaseService = new DatabaseService()

export default databaseService
