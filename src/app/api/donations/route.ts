import { NextRequest, NextResponse } from 'next/server'
import { donations, DonationSchema } from '@/types/models'
import { handleCors, corsHeaders } from '@/libs/cors'

export async function OPTIONS(request: NextRequest) {
  return handleCors(request)
}

export async function GET(request: NextRequest) {
  const corsResponse = handleCors(request)
  if (corsResponse) return corsResponse

  try {
    const donationsCursor = await donations.find({})
    const allDonations = await donationsCursor.toArray()
    
    return NextResponse.json({
      success: true,
      data: allDonations
    }, {
      headers: corsHeaders(request.headers.get('origin') || undefined)
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch donations' },
      { status: 500, headers: corsHeaders(request.headers.get('origin') || undefined) }
    )
  }
}

export async function POST(request: NextRequest) {
  const corsResponse = handleCors(request)
  if (corsResponse) return corsResponse

  try {
    const body = await request.json()
    const donationData = await DonationSchema.parseAsync(body)
    
    const result = await donations.insertOne(donationData)
    
    return NextResponse.json({
      success: true,
      data: { uuid: donationData.uuid }
    }, {
      headers: corsHeaders(request.headers.get('origin') || undefined)
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create donation' },
      { status: 400, headers: corsHeaders(request.headers.get('origin') || undefined) }
    )
  }
}