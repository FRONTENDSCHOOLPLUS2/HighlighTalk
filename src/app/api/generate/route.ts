import { NextRequest, NextResponse } from 'next/server';
import FetchData from '@/hooks/fetchData';

export async function POST(req: NextRequest) {
  console.log('post test');
  const { prompt, message } = await req.json();

  try {
    const data = await FetchData(prompt, message);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
