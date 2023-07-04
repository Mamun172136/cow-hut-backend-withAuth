import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
  port: process.env.PORT,
  database: process.env.DATABASE_URL,
  env: process.env.NODE_ENV,
}
