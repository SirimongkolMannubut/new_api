import { NextRequest, NextResponse } from 'next/server'
import { donations } from '@/types/models'
import { handleCors, corsHeaders } from '@/libs/cors'

export async function OPTIONS(request: NextRequest) {
  return handleCors(request)
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  const corsResponse = handleCors(request)
  if (corsResponse) return corsResponse

  try {
    const { userId } = await params
    const userDonations = await donations.find({ userId }).toArray()
    
    return NextResponse.json({
      success: true,
      data: userDonations
    }, {
      headers: corsHeaders(request.headers.get('origin') || undefined)
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch user donations' },
      { status: 500, headers: corsHeaders(request.headers.get('origin') || undefined) }
    )
  }
}