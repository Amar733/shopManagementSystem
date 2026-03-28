import { NextRequest, NextResponse } from 'next/server';
import { orders } from '@/lib/data';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    
    let filteredOrders = orders;
    
    if (status) {
      filteredOrders = filteredOrders.filter(o => 
        o.status === status
      );
    }
    
    return NextResponse.json(filteredOrders);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const order = await request.json();
    return NextResponse.json({ success: true, order });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}
