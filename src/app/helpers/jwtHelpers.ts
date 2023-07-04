import jwt, { Secret } from 'jsonwebtoken'

const createToken = (
  payload: Record<string, unknown>,
  secret: Secret
): string => {
  return jwt.sign(payload, secret, {
    expiresIn: '5h',
  })
}
const refreshToken = (
  payload: Record<string, unknown>,
  secret: Secret
): string => {
  return jwt.sign(payload, secret, {
    expiresIn: '1d',
  })
}

export const jwtHelpers = {
  createToken,
  refreshToken,
}
