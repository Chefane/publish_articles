"use client"
import Navbar from "@/app/components/Navigation";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Spinner from "react-bootstrap/Spinner";
import NavBar from "@/app/components/Navigation";
import styles from "@/app/styles/entireArticle.module.css";

interface SearchParams {
  id?: string;
}

interface Article {
  _id: string;
  author_name: string;
  article_title: string;
  entire_article: string;
  published_date: string;
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
    <>
      <NavBar />
      <div>
        {article ? (
          <div className={styles.article_container}>
            <h1 className={styles.article_title}>{article.article_title}</h1>
            <p className={styles.article_author}>By {article.author_name}</p>
            <p className={styles.published_date}>{article.published_date}</p>
            <p className={styles.article_content}>{article.entire_article}</p>
          </div>
        ) : (
          <div className="text-center" style={{ marginTop: "25%" }}>
            {" "}
            {/* Center the spinner */}
            <div className="spinner-border spinner-border-lg" role="status">
              <span className="visually-hidden"></span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ArticlePage;
