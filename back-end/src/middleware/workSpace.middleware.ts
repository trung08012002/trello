import { checkSchema } from 'express-validator'
import validate from '~/utils/validate'

const workSpaceValidator = validate(
  checkSchema({
    name: {
      isString: true
    },
    type: {
      isNumeric: true
    }
  })
)
