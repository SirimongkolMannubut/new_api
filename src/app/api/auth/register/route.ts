import { NextRequest, NextResponse } from 'next/server'
import { UserSchema, users } from '../../../types/models'
import { signToken } from '../../../libs/jwt'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const userData = await UserSchema.parseAsync(body)
    
    const result = await users.insertOne(userData)
    const token = signToken({ uuid: userData.uuid, name: userData.name })
    
    return NextResponse.json({
      success: true,
      data: { user: { uuid: userData.uuid, name: userData.name }, token }
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Registration failed' },
      { status: 400 }
    )
  }
}