import connectDB from "@/app/utils/db";
import UserRole from "@/app/pages/api/models/roles_model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const reqBody = await request.json();
    const { username, email,user_role, password } = reqBody;

    const existingUser = await UserRole.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserRole({
      username,
      email,
      user_role,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    return NextResponse.json(
      { message: "User Registered Successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
