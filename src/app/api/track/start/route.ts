import { NextResponse } from "next/server";
import User from "@/models/user";
import DBConnect from "../../../../../lib/DB_Connect";

export async function POST(request: Request) {
    try {
        await DBConnect();
        const { userId } = await request.json();

        if (!userId) {
            return NextResponse.json({ success: false, error: "Missing userId." }, { status: 400 });
        }

        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({ success: false, error: "User not found." }, { status: 404 });
        }

        if (user.role === 'admin' || user.role === 'manager') {
            return NextResponse.json({
                ignored: true,
                message: "Ignored tracking for admins."
            }, { status: 200 });
        } else {
            return NextResponse.json({
                success: true,
                userId: user._id
            }, { status: 200 });
        }
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
