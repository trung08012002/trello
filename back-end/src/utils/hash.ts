import bcrypt from 'bcrypt'
async function hash(value: string): Promise<string> {
  const salt = await bcrypt.genSalt(12)
  const hashValue = await bcrypt.hash(value, salt)
  return hashValue
}

export default hash
