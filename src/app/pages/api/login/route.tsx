import connectDB from "@/app/utils/db";
import User from "@/app/pages/api/models/register_model";
import UserRole from "@/app/pages/api/models/roles_model";
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
    const userRole = await UserRole.findOne({ username });

    if (!user && !userRole) {
      return NextResponse.json(
        { message: "User Not Registered!" },
        { status: 401 }
      );
    } else if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return NextResponse.json(
          { message: "Password or username incorrect, Please try again" },
          { status: 400 }
        );
      }

      const token = jwt.sign(
        { userId: user._id, userName: user.username, userEmail: user.email, userRole:"Admin"},
        SECRET_KEY,
        {
          expiresIn: "1h",
        }
      );

      return NextResponse.json(
        { message: "Login Successful", token },
        { status: 201 }
      );
    } else if (userRole) {
      const passwordMatch = await bcrypt.compare(password, userRole.password);

      if (!passwordMatch) {
        return NextResponse.json(
          { message: "Password or username incorrect, Please try again" },
          { status: 400 }
        );
      }

      const token = jwt.sign(
        {
          userId: userRole._id,
          userName: userRole.username,
          userEmail: userRole.email,
          userRole: userRole.user_role,
        },
        SECRET_KEY,
        {
          expiresIn: "1h",
        }
      );

      return NextResponse.json(
        { message: "Login Successful", token },
        { status: 201 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 }
    );
  }
}
