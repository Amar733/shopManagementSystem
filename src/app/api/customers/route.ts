import { NextRequest, NextResponse } from 'next/server';
import { customers } from '@/lib/data';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');

    let filteredCustomers = customers;

    if (search) {
      filteredCustomers = filteredCustomers.filter(
        (c) =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.email.toLowerCase().includes(search.toLowerCase()) ||
          c.phone.includes(search)
      );
    }

    return NextResponse.json(filteredCustomers);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch customers' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const customer = await request.json();
    return NextResponse.json({ success: true, customer });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create customer' },
      { status: 500 }
    );
  }
}
