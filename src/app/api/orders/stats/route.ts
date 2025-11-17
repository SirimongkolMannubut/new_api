import { NextResponse } from 'next/server'
import { shirtOrders } from '../../../types/models'

export async function GET() {
  try {
    const orders = await shirtOrders.find({}).toArray()
    
    const stats = {
      totalOrders: orders.length,
      totalShirts: orders.reduce((sum, order) => sum + order.quantity, 0),
      totalRevenue: orders.reduce((sum, order) => sum + order.totalAmount, 0),
      statusCounts: {
        pending: orders.filter(o => o.status === 'pending').length,
        confirmed: orders.filter(o => o.status === 'confirmed').length,
        processing: orders.filter(o => o.status === 'processing').length,
        shipped: orders.filter(o => o.status === 'shipped').length,
        delivered: orders.filter(o => o.status === 'delivered').length,
        cancelled: orders.filter(o => o.status === 'cancelled').length,
      }
    }
    
    return NextResponse.json({
      success: true,
      data: stats
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch statistics' },
      { status: 500 }
    )
  }
}