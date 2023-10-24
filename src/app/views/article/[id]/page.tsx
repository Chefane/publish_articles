"use client";
import Navbar from "@/app/components/Navigation";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface SearchParams {
  id?: string;
}

interface Article {
  _id: string;
  article_title: string;
  entire_article: string;
}

const ArticlePage = () => {
  const searchParams = useParams();
  const id = searchParams?.id;

  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    if (id) {
      const fetchArticle = async () => {
        try {
          const response = await fetch(`/pages/api/search/${id}`);
          if (response.ok) {
            const data = await response.json();
            setArticle(data);
          }
        } catch (error) {
          console.error("Error fetching article:", error);
        }
      };

      fetchArticle();
    }
  }, [id]);

  return (
    <div>
      {article ? (
        <div>
          <h1>{article.article_title}</h1>
          <p>{article.entire_article}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ArticlePage;
