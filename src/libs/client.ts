import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI || 'mongodb+srv://topt75870_db_user:<db_password>@cluster0.ritlkip.mongodb.net/?appName=Cluster0'
const dbName = process.env.DB_NAME || 'new-api'

let client: MongoClient | null = null

const getClient = async () => {
  if (!client) {
    client = new MongoClient(uri)
    await client.connect()
  }
  return client
}

export const db = {
  collection: (name: string) => {
    return {
      find: async (query: any) => {
        const c = await getClient()
        return c.db(dbName).collection(name).find(query)
      },
      findOne: async (query: any) => {
        const c = await getClient()
        return c.db(dbName).collection(name).findOne(query)
      },
      insertOne: async (doc: any) => {
        const c = await getClient()
        return c.db(dbName).collection(name).insertOne(doc)
      }
    }
  }
}