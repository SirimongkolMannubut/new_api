import { NextRequest, NextResponse } from 'next/server'
import { charities } from '@/types/models'
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
    const charity = await charities.findOne({ uuid: id })
    
    if (!charity) {
      return NextResponse.json(
        { success: false, error: 'Charity not found' },
        { status: 404, headers: corsHeaders(request.headers.get('origin') || undefined) }
      )
    }
    
    return NextResponse.json({
      success: true,
      data: charity
    }, {
      headers: corsHeaders(request.headers.get('origin') || undefined)
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch charity' },
      { status: 500, headers: corsHeaders(request.headers.get('origin') || undefined) }
    )
  }
}