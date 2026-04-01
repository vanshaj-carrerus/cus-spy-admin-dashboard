import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Screenshot from '@/models/Screenshot';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const userId = req.headers.get('X-User-ID');
    const role = req.headers.get('X-User-Role');

    let query = {};
    if (role !== 'Admin') {
      query = { userId };
    }

    const screenshots = await Screenshot.find(query).populate('userId', 'name email').sort({ timestamp: -1 });
    return NextResponse.json(screenshots);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const userId = req.headers.get('X-User-ID');
    const { imageUrl } = await req.json();

    if (!imageUrl) {
      return NextResponse.json({ error: 'Image URL is required' }, { status: 400 });
    }

    const screenshot = await Screenshot.create({
      userId,
      imageUrl,
    });

    return NextResponse.json(screenshot, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
