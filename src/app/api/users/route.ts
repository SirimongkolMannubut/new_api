import { NextRequest, NextResponse } from 'next/server'
import { users, UserSchema } from '@/types/models'
import { handleCors, corsHeaders } from '@/libs/cors'

export async function OPTIONS(request: NextRequest) {
  return handleCors(request)
}

export async function GET(request: NextRequest) {
  const corsResponse = handleCors(request)
  if (corsResponse) return corsResponse

  try {
    const usersCursor = await users.find({})
    const allUsers = await usersCursor.toArray()
    
    return NextResponse.json({
      success: true,
      data: allUsers.map(user => ({ uuid: user.uuid, name: user.name, email: user.email }))
    }, {
      headers: corsHeaders(request.headers.get('origin') || undefined)
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch users' },
      { status: 500, headers: corsHeaders(request.headers.get('origin') || undefined) }
    )
  }
}

export async function POST(request: NextRequest) {
  const corsResponse = handleCors(request)
  if (corsResponse) return corsResponse

  try {
    const body = await request.json()
    const { username, email, phone, password } = body
    
    const userData = await UserSchema.parseAsync({
      name: username,
      first_name: body.firstName || username,
      last_name: body.lastName || '',
      email,
      phone,
      password
    })
    
    const result = await users.insertOne(userData)
    
    return NextResponse.json({
      success: true,
      data: { uuid: userData.uuid }
    }, {
      headers: corsHeaders(request.headers.get('origin') || undefined)
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create user' },
      { status: 400, headers: corsHeaders(request.headers.get('origin') || undefined) }
    )
  }
}