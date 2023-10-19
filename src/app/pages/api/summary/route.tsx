import connectDB from "@/app/utils/db";
import Publisher from "@/app/pages/api/models/publish_model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await connectDB();

  try {
    const reqBody = await request.json();

    const { publisher_name, article_title, story, url, article_image, published_date } = reqBody;

    const existingStory = await Publisher.findOne({ article_title });

    if (existingStory) {
      return NextResponse.json(
        { message: "Article Already Exist" },
        { status: 400 }
      );
    }

    const newArticle = new Publisher({
      publisher_name,
      article_title,
      story,
      url,
      article_image,
      published_date,
    });

    const savedArticle = await newArticle.save();
    return NextResponse.json(
      { message: "Article Added Successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 }
    );
  }
}
