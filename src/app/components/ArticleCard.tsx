"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container, Card, Button } from "react-bootstrap";
import styles from "@/app/styles/article.module.css";
import { useRouter } from "next/navigation";

interface ArticlesData {
  _id: string;
  author_name: string;
  article_title: string;
  article_summary: string;
  article_image: { type: string; data: number[] };
  entire_article: string;
  published_date: string;
}

const ArticleCard: React.FC = () => {
  const router = useRouter();
  const [showFullContent, setShowFullContent] = useState(false);

  const [articlesData, setArticlesData] = useState<ArticlesData[]>([]);
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState<{ [key: number]: boolean }>(
    {}
  );

  const toggleContent = (index: number) => {
    if (showContent[index]) {
      router.back();
    } else {
      router.push(`/views/article/${articlesData[index]._id}`);
    }
  };

  const formatPublishedDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return new Date(dateString).toLocaleString("en-GB", options);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setTimeout(async () => {
          const response = await fetch("pages/api/publish-article");
          if (!response) {
            throw new Error("No articles yet");
          }
          const data = await response.json();
          if (Array.isArray(data.articles)) {
            setArticlesData(data.articles);
            const initialShowContentState: { [key: number]: boolean } =
              data.articles.reduce(
                (acc: any, _: any, index: any) => ({ ...acc, [index]: false }),
                {}
              );

            setShowContent(initialShowContentState);
          } else {
            throw new Error("Data.articles is not an array");
          }
          setLoading(false);
        
        }, 2000);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <div className="text-center" style={{ marginTop: "25%" }}>
          {" "}
          {/* Center the spinner */}
          <div className="spinner-border spinner-border-lg" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : articlesData.length > 0 ? (
        articlesData.map((articles, index) => (
          
          <Container className={styles.articleContainer} key={index}>
            <Card>
              <Card.Body>
                <Card.Title>{articles.article_title}</Card.Title>
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "200px",
                    marginBottom: "10px",
                  }}
                >
                  <Image
                    src={`data:image/jpeg;base64,${Buffer.from( new Uint8Array(articles.article_image.data) ).toString("base64")}`}
                    alt=""
                    width={100}
                    height={100}
                  />
                </div>
                <Card.Subtitle className="mb-2 text-muted">
                  Author: {articles.author_name}
                </Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">
                  Published on: {formatPublishedDate(articles.published_date)}
                </Card.Subtitle>
                <Card.Text>
                  {showContent[index]
                    ? articles.article_summary
                    : articles.article_summary.slice(0, 500) + "..."}
                </Card.Text>
                {articles.article_summary.length > 500 && (
                  <Button
                    variant="dark"
                    onClick={() => toggleContent(index)}
                  >
                    {showContent[index] ? "Read Less" : "Read  More"}
                  </Button>
                )}
                <p className="card-text">
                  <small className="text-muted"></small>
                </p>
              </Card.Body>
            </Card>
          </Container>
        ))
      ) : (
        <p>No Article data available.</p>
      )}
    </>
  );
};

export default ArticleCard;
