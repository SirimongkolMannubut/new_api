import { NextRequest, NextResponse } from 'next/server'
import { users, UserSchema } from '@/types/models'

export async function GET() {
  try {
    const usersCursor = await users.find({})
    const allUsers = await usersCursor.toArray()
    
    return NextResponse.json({
      success: true,
      data: allUsers.map(user => ({ uuid: user.uuid, name: user.name }))
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const userData = await UserSchema.parseAsync(body)
    
    const result = await users.insertOne(userData)
    
    return NextResponse.json({
      success: true,
      data: { uuid: result.insertedId }
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create user' },
      { status: 400 }
    )
  }
}