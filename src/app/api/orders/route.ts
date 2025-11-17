import { NextRequest, NextResponse } from 'next/server'
import { shirtOrders, ShirtOrderSchema } from '@/types/models'

export async function GET() {
  try {
    const ordersCursor = await shirtOrders.find({})
    const orders = await ordersCursor.toArray()
    
    return NextResponse.json({
      success: true,
      data: orders
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch orders' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const orderData = await ShirtOrderSchema.parseAsync(body)
    
    const result = await shirtOrders.insertOne(orderData)
    
    return NextResponse.json({
      success: true,
      data: { uuid: result.insertedId, orderNumber: orderData.orderNumber }
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create order' },
      { status: 400 }
    )
  }
}