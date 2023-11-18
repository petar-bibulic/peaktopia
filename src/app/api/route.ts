import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  return NextResponse.json({ hello: 'Welcome to Peaktopia, an app for peak analysis and comparison in 2D charts' });
}
