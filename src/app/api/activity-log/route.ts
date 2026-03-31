// src/app/api/activity-log/route.ts

import { NextRequest, NextResponse } from "next/server";
import ActivityLog from "@/models/activity_log";
import Machine from "@/models/machine";
import DBConnect from "../../../../lib/DB_Connect";

export async function POST(req: NextRequest) {
    try {
        await DBConnect();

        const body = await req.json();
        const { machine_id, title, app_name, start_time, duration_seconds } = body;

        // Basic validation
        if (!machine_id || !title || !app_name || !start_time || duration_seconds === undefined) {
            return NextResponse.json(
                { error: "Missing required fields: machine_id, title, app_name, start_time, or duration_seconds" },
                { status: 400 }
            );
        }

        // 1. Ignore logs with duration < 5 seconds
        if (Number(duration_seconds) < 5) {
            return NextResponse.json(
                { message: "Log ignored due to short duration", ignored: true },
                { status: 200 }
            );
        }

        // 2. Check if machine_id exists in Machines table
        const machineExists = await Machine.findOne({ machineId: machine_id });
        if (!machineExists) {
            return NextResponse.json(
                { error: "Unauthorized: machine_id not found" },
                { status: 403 }
            );
        }

        // 3. Extract website name for Chrome/Edge
        let site = null;
        const lowerAppName = app_name.toLowerCase();
        if (lowerAppName.includes("chrome") || lowerAppName.includes("edge")) {
            const parts = title.split(" - ");
            if (parts.length > 1) {
                // Remove the last segment (often the browser name) and join others back
                site = parts.slice(0, -1).join(" - ").trim();
            } else {
                site = title.trim();
            }
        }

        // 4. Save the log
        const newLog = await ActivityLog.create({
            machine_id,
            title,
            app_name,
            start_time: new Date(start_time),
            duration_seconds,
            site
        });

        return NextResponse.json(
            { success: true, message: "Activity log recorded", id: newLog._id },
            { status: 201 }
        );

    } catch (error: any) {
        console.error("Activity Log Error:", error);
        return NextResponse.json(
            { error: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}
