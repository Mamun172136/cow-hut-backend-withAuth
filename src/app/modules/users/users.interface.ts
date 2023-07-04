export type UserName = {
  firstName: string
  lastName: string
}

export type Irole = 'seller' | 'buyer'

export type IUser = {
  phoneNumber: string
  role: Irole
  password: string
  name: UserName
  address?: string
  budget?: number
  income?: number
  needsPasswordChange: true | false
}
