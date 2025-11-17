import { NextRequest, NextResponse } from 'next/server'
import { donations, DonationSchema } from '@/types/models'

export async function GET() {
  try {
    const donationsCursor = await donations.find({})
    const allDonations = await donationsCursor.toArray()
    
    return NextResponse.json({
      success: true,
      data: allDonations
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch donations' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const donationData = await DonationSchema.parseAsync(body)
    
    const result = await donations.insertOne(donationData)
    
    return NextResponse.json({
      success: true,
      data: { uuid: donationData.uuid }
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create donation' },
      { status: 400 }
    )
  }
}