import connectDB from "@/app/utils/db";
import Publisher from "@/app/pages/api/models/publish_model";
import Article from "@/app/pages/api/models/publish_model"; 
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest, res: NextResponse) {
  await connectDB();

  try {

    const id = req.url.split("search/")[1];
 
    if (!id) {
      return NextResponse.json(
        { message: "Invalid Parameter" },
        { status: 400 }
      );
    }

    const article = await Article.findById(id);

    if (!article) {
      return NextResponse.json(
        { message: "Article Not Found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      article
    );
  } catch (error) {
    console.error('Error fetching article:', error);
    return NextResponse.json(
      { message: "Internal Server error" },
      { status: 500 }
    );
}

}