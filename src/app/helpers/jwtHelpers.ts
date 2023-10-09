import jwt, { Secret } from 'jsonwebtoken'

const createToken = (
  payload: Record<string, unknown>,
  secret: Secret
): string => {
  return jwt.sign(payload, secret, {
    expiresIn: '365d',
  })
}
const refreshToken = (
  payload: Record<string, unknown>,
  secret: Secret
): string => {
  return jwt.sign(payload, secret, {
    expiresIn: '370d',
  })
}

export const jwtHelpers = {
  createToken,
  refreshToken,
}
