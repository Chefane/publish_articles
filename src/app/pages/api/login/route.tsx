import connectDB from "@/app/utils/db";
import User from "@/app/pages/api/models/register_model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const SECRET_KEY: string = process.env.SECRET_KEY || "default-secret-key";

export async function POST(request: NextRequest) {
  await connectDB();
  const reqBody = await request.json();
  const { username, password } = reqBody;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return NextResponse.json(
        { message: "User Not Registered!" },
        { status: 401 }
      );
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json(
        { message: "Password or username incorrect, Please try again" },
        { status: 400 }
      );
    }

    const token = jwt.sign({ userId: user._id }, SECRET_KEY, {
      expiresIn: "1h",
    });

    return NextResponse.json(
      { message: "Login Successful", token },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 }
    );
  }
}
