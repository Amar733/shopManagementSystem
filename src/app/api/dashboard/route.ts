import { NextResponse } from 'next/server';
import { dashboardStats } from '@/lib/data';

export async function GET() {
  try {
    return NextResponse.json(dashboardStats);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
}
