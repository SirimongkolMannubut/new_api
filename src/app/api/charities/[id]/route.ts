import { NextRequest, NextResponse } from 'next/server'
import { charities } from '@/types/models'
import { handleCors, corsHeaders } from '@/libs/cors'

export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get('origin')
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': origin || 'http://localhost:3000',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Credentials': 'true',
    }
  })
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const charity = await charities.findOne({ uuid: id })
    
    if (!charity) {
      return NextResponse.json(
        { success: false, error: 'Charity not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      data: charity
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch charity' },
      { status: 500 }
    )
  }
}