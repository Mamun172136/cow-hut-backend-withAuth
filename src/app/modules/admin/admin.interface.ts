export type AdminName = {
  firstName: string
  lastName: string
}

export type IAdmin = {
  phoneNumber: string
  role: 'admin'
  password: string
  name: AdminName
  address?: string
}
