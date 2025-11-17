import argon2 from 'argon2'
import { signToken, verifyToken } from './jwt'
import { users } from '../types/models'

export const hashPassword = async (password: string): Promise<string> => {
  return await argon2.hash(password, { type: argon2.argon2id })
}

export const verifyPassword = async (hash: string, password: string): Promise<boolean> => {
  return await argon2.verify(hash, password)
}

export const authenticate = async (name: string, password: string) => {
  const user = await users.findOne({ name })
  if (!user || !await verifyPassword(user.password, password)) {
    throw new Error('Invalid credentials')
  }
  
  const token = signToken({ uuid: user.uuid, name: user.name })
  return { user, token }
}