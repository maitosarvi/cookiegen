import { NextResponse } from 'next/server';
import db from '../../lib/db';

export async function GET() {
  try {
    const fortune = db.prepare('SELECT message FROM fortunes ORDER BY RANDOM() LIMIT 1').get();
    
    if (!fortune) {
      return NextResponse.json({ error: 'No fortunes found' }, { status: 404 });
    }
    
    return NextResponse.json(fortune);
  } catch (error) {
    console.error('Error fetching fortune:', error);
    return NextResponse.json({ error: 'Failed to fetch fortune' }, { status: 500 });
  }
}