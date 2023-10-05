import connectDB from "@/app/utils/db";
import Publisher from "@/app/pages/api/models/publish_model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  await connectDB();

  const articles = await Publisher.find({});

  try {
    if (articles.length === 0) {
      return NextResponse.json(
        { message: "No Articles released yet!" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { message: "Article Returned Successfully", articles },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 }
    );
  }
}
