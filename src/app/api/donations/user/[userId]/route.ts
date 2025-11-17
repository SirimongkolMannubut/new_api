import { NextRequest, NextResponse } from 'next/server'
import { donations } from '@/types/models'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params
    const userDonationsCursor = await donations.find({ userId })
    const userDonations = await userDonationsCursor.toArray()
    
    return NextResponse.json({
      success: true,
      data: userDonations
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch user donations' },
      { status: 500 }
    )
  }
}