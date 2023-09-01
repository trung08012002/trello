import { ObjectId } from 'mongodb'
import databaseService from './database.services'
import attachment from './attachment.services'
import comments from './comments.services'
import CardRequest from '~/models/requests/Card.request'
import Card from '~/models/schemas/Card.schema'
import usersService from './usersService'

class CardService {
  async getCardsInforByIds(cardsId: ObjectId[]) {
    const cardsInfor = new Array<any>()
    const cardCusor = databaseService.cards.find({ _id: { $in: cardsId } })
    for await (const card of cardCusor) {
      cardsInfor.push(card)
    }
  }
  async getMinimizeCardByIds(cardsId: ObjectId[]) {
    const cardsInfor = new Array<any>()
    const cardCusor = databaseService.cards.find({ _id: { $in: cardsId } })
    for await (const card of cardCusor) {
      cardsInfor.push({
        _id: card._id,
        title: card.title,
        members: card.members,
        label: card.labels,
        dueDate: card.dueDate,
        complete: card.acrhived
      })
    }
    return cardsInfor
  }
  async getInforCardByIds(userId: ObjectId, cardIds: ObjectId[]) {
    const cardsInfor = new Array<any>()
    const cardCusor = databaseService.cards.find({ _id: { $in: cardIds } })
    for await (const card of cardCusor) {
      let members = []
      if (card.members.length > 0) {
        members = (await usersService.getAllUserMinimizesByIds(card.members)) ?? []
      }

      const visible = card.watcher?.findIndex((id) => id.toString() === userId.toString()) !== -1
      const { watcher, ...newObject } = card
      cardsInfor.push({
        ...newObject,
        members,
        visible
      })
    }
    return cardsInfor
  }
  async getCardsNameByIds(cardsId: ObjectId[]) {
    const cardsInfor = new Array<any>()
    const cardCusor = databaseService.cards.find({ _id: { $in: cardsId } })
    for await (const card of cardCusor) {
      cardsInfor.push({ _id: card._id, title: card.title })
    }
    return cardsInfor
  }
  async updateCard(cardId: ObjectId, cardBody: CardRequest) {
    const { watcher, ...cardRemove } = cardBody
    const card = databaseService.cards.updateOne(
      { _id: cardId },
      { $set: { ...cardRemove }, $push: { watcher: watcher } }
    )

    return card
  }
  async addCard(cardBody: CardRequest) {
    const card = databaseService.cards.insertOne(new Card({ ...cardBody, watcher: [] }))
    return card
  }
  async deleteMultipleCards(cardsId: ObjectId[]) {
    const result = await databaseService.cards.deleteMany({ _id: { $in: cardsId } })
    return result
  }
  async deleteCard(cardId: ObjectId) {
    const card = databaseService.cards.deleteOne({ _id: cardId })
    return card
  }
}

const cardService = new CardService()

export default cardService
