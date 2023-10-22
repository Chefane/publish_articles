import connectDB from "@/app/utils/db";
import Publisher from "@/app/pages/api/models/publish_model";
import { NextRequest, NextResponse } from "next/server";


export async function POST( req: NextRequest, res: NextResponse) {
  const reqBody = await req.json();
   const { article_title, entire_article } = reqBody;

  if (!article_title || !entire_article) {
    return NextResponse.json(
      { message: "article title and the article content is required" },
      { status: 400 }
      );
  }
  try {
    await connectDB();
      const existingArticle = await Publisher.findOne({ article_title });
  
      if (existingArticle) {
        existingArticle.entire_article = entire_article;
        await existingArticle.save();
        return NextResponse.json(
          { message: "Article Content saved successfully!" },
          { status: 200 }
          );
      } else {
        return NextResponse.json(
          { message: "Article Not Found" },
          { status: 401 }
          );
      }
    
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}