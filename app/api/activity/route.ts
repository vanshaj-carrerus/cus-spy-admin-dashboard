import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Activity from '@/models/Activity';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const userId = req.headers.get('X-User-ID');
    const role = req.headers.get('X-User-Role');

    let query = {};
    if (role !== 'Admin') {
      query = { userId };
    }

    const activities = await Activity.find(query).populate('userId', 'name email').sort({ timestamp: -1 });
    return NextResponse.json(activities);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const userId = req.headers.get('X-User-ID');
    const { appName, timeSpent } = await req.json();

    if (!appName || !timeSpent) {
      return NextResponse.json({ error: 'App name and time spent are required' }, { status: 400 });
    }

    const activity = await Activity.create({
      userId,
      appName,
      timeSpent,
    });

    return NextResponse.json(activity, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
