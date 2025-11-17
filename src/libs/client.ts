import { MongoClient, Db } from 'mongodb'

const uri = process.env.MONGODB_URI || 'mongodb+srv://topt75870_db_user:<db_password>@cluster0.ritlkip.mongodb.net/?appName=Cluster0'
const dbName = process.env.DB_NAME || 'new-api'

let client: MongoClient
let _db: Db

const connectDB = async (): Promise<Db> => {
  if (!client) {
    client = new MongoClient(uri)
    await client.connect()
    _db = client.db(dbName)
    console.log('Connected to MongoDB Atlas')
  }
  return _db
}

// Initialize connection
connectDB().catch(console.error)

export const db = _db
export { connectDB }