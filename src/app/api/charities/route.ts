import { NextRequest, NextResponse } from 'next/server'
import { charities, CharitySchema } from '@/types/models'
import { handleCors, corsHeaders } from '@/libs/cors'

export async function OPTIONS(request: NextRequest) {
  return handleCors(request)
}

export async function GET(request: NextRequest) {
  const corsResponse = handleCors(request)
  if (corsResponse) return corsResponse

  try {
    const charitiesCursor = await charities.find({})
    const allCharities = await charitiesCursor.toArray()
    
    return NextResponse.json({
      success: true,
      data: allCharities
    }, {
      headers: corsHeaders(request.headers.get('origin') || undefined)
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch charities' },
      { status: 500, headers: corsHeaders(request.headers.get('origin') || undefined) }
    )
  }
}

export async function POST(request: NextRequest) {
  const corsResponse = handleCors(request)
  if (corsResponse) return corsResponse

  try {
    const body = await request.json()
    const charityData = await CharitySchema.parseAsync(body)
    
    const result = await charities.insertOne(charityData)
    
    return NextResponse.json({
      success: true,
      data: { uuid: charityData.uuid }
    }, {
      headers: corsHeaders(request.headers.get('origin') || undefined)
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create charity' },
      { status: 400, headers: corsHeaders(request.headers.get('origin') || undefined) }
    )
  }
}