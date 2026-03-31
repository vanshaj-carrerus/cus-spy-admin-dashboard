// src/app/api/activity-log/route.ts

import { NextRequest, NextResponse } from "next/server";
import ActivityLog from "@/models/activity_log";
import DBConnect from "../../../../lib/DB_Connect";

// Browser suffixes to strip from window titles
const BROWSER_SUFFIXES = [" - Google Chrome", " - Microsoft Edge", " - Mozilla Firefox"];

function extractSite(title: string): string {
    let clean = title;
    for (const suffix of BROWSER_SUFFIXES) {
        if (clean.endsWith(suffix)) {
            clean = clean.slice(0, -suffix.length).trim();
            break;
        }
    }
    // If title had " - BrowserName" anywhere else, strip from last separator
    if (clean.includes(" - ")) {
        clean = clean.split(" - ").slice(0, -1).join(" - ").trim();
    }
    return clean || title.trim();
}

export async function POST(req: NextRequest) {
    try {
        await DBConnect();

        const body = await req.json();
        const { userId, title, app_name, start_time, duration_seconds } = body;

        // Validation
        if (!userId || !title || !app_name || !start_time || duration_seconds === undefined) {
            return NextResponse.json(
                { error: "Missing required fields: userId, title, app_name, start_time, or duration_seconds" },
                { status: 400 }
            );
        }

        // 1. Ignore short-lived events (accidental clicks / rapid Alt-Tab)
        if (Number(duration_seconds) < 5) {
            return NextResponse.json(
                { message: "Log ignored: duration too short", ignored: true },
                { status: 200 }
            );
        }

        // 2. Extract website name for browser apps
        let site: string | null = null;
        const lowerApp = app_name.toLowerCase();
        if (lowerApp.includes("chrome") || lowerApp.includes("edge") || lowerApp.includes("firefox")) {
            site = extractSite(title);
        }

        // 3. Save the log
        const newLog = await ActivityLog.create({
            userId,
            title,
            app_name,
            start_time: new Date(start_time),
            duration_seconds: Number(duration_seconds),
            site,
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
