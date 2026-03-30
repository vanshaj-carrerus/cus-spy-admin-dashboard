import { NextResponse } from "next/server";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import DBConnect from "../../../../../lib/DB_Connect";

export async function POST(request: Request) {
    try {
        await DBConnect();
        const { username, password } = await request.json();

        if (!username || !password) {
            return NextResponse.json({ success: false, error: "Username and password are required." }, { status: 400 });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return NextResponse.json({ success: false, error: "Invalid credentials." }, { status: 401 });
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return NextResponse.json({ success: false, error: "Invalid credentials." }, { status: 401 });
        }

        const userData = user.toObject();
        delete userData.password;

        return NextResponse.json({ success: true, user: userData }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
