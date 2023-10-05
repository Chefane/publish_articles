import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/app/utils/db";
import User from "@/app/pages/api/models/register_model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const newUser = new User({
      username,
      email,
      password,
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
