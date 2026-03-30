import { NextResponse } from "next/server";
import TimeEntry from "@/models/time_entry";
import DBConnect from "../../../../../lib/DB_Connect";

export async function POST(request: Request) {
    try {
        await DBConnect();
        const { userId, timestamp } = await request.json();

        if (!userId) {
            return NextResponse.json({ success: false, error: "Missing userId." }, { status: 400 });
        }

        // Parse timestamp locally or fallback to current execution time
        const dateObj = timestamp ? new Date(timestamp) : new Date();
        const dateStr = dateObj.toISOString().split('T')[0];
        const dayStart = new Date(dateStr + "T00:00:00.000Z");

        await TimeEntry.findOneAndUpdate(
            { userId, date: dayStart },
            { $inc: { trackedTimeSeconds: 300 } },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        return NextResponse.json({ success: true, message: "Heartbeat updated" }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
