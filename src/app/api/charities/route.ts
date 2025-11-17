import { NextRequest, NextResponse } from 'next/server'
import { charities, CharitySchema } from '@/types/models'

export async function GET() {
  try {
    const charitiesCursor = await charities.find({})
    const allCharities = await charitiesCursor.toArray()
    
    return NextResponse.json({
      success: true,
      data: allCharities
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch charities' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const charityData = await CharitySchema.parseAsync(body)
    
    const result = await charities.insertOne(charityData)
    
    return NextResponse.json({
      success: true,
      data: { uuid: charityData.uuid }
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create charity' },
      { status: 400 }
    )
  }
}