import { NextRequest, NextResponse } from 'next/server'
import { users } from '@/types/models'
import { handleCors, corsHeaders } from '@/libs/cors'

export async function OPTIONS(request: NextRequest) {
  return handleCors(request)
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const corsResponse = handleCors(request)
  if (corsResponse) return corsResponse

  try {
    const { id } = await params
    const user = await users.findOne({ uuid: id })
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404, headers: corsHeaders(request.headers.get('origin') || undefined) }
      )
    }
    
    return NextResponse.json({
      success: true,
      data: { uuid: user.uuid, name: user.name, email: user.email }
    }, {
      headers: corsHeaders(request.headers.get('origin') || undefined)
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch user' },
      { status: 500, headers: corsHeaders(request.headers.get('origin') || undefined) }
    )
  }
}