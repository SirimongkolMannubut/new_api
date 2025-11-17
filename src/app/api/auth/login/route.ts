import { NextRequest, NextResponse } from 'next/server'
import { authenticate } from '../../../../libs/auth'

export async function POST(request: NextRequest) {
  try {
    const { name, password } = await request.json()
    
    const { user, token } = await authenticate(name, password)
    
    return NextResponse.json({
      success: true,
      data: { user: { uuid: user.uuid, name: user.name }, token }
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Invalid credentials' },
      { status: 401 }
    )
  }
}