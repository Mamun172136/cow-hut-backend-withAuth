/* eslint-disable @typescript-eslint/no-unused-vars */
import bcrypt from 'bcrypt'

const hashPassword = async (password: string) => {
  const pword = await bcrypt.hash(password, 10)
  return pword
}

export default hashPassword
