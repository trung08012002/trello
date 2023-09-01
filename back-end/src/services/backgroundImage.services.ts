import Background from '~/models/schemas/background.schema'
import databaseService from './database.services'

class BackgroundService {
  getOnlyNumberImages = async (number: number) => {
    const imagesCursor = databaseService.background.find().limit(number)
    const images = new Array<Background>()
    for await (const image of imagesCursor) {
      images.push(image)
    }
    return images
  }
  createImage = async (image: Background) => {
    const result = databaseService.background.insertOne(image)
    return result
  }
}

const backgroundService = new BackgroundService()

export default backgroundService
