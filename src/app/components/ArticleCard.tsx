"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import styles from "@/app/styles/article.module.css";
import { useRouter } from "next/navigation";
import { Buffer } from "buffer";

interface ArticlesData {
  _id: string;
  author_name: string;
  article_title: string;
  article_summary: string;
  article_image: string;
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
          console.log(data);
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
    <h1 className="text-center">Explore Published Articles</h1>
      {loading ? (
        <div className="text-center" style={{ marginTop: "25%" }}>
          <div className="spinner-border spinner-border-lg" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : articlesData.length > 0 ? (
        <Container fluid>
          <Row>
            {articlesData.map((article, index) => (
              <Col lg={6} md={6} sm={12} key={index}>
                <div className={`card ${styles.cardMargin}`}>
                  <Image
                    className="card-img-top img-fluid"
                    src={article.article_image}
                    alt={article.article_title}
                    width={500}
                    height={250}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{article.article_title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                      {" "}
                      Author: {article.author_name}
                    </h6>
                    <Card.Subtitle className="mb-2 text-muted">
                      Published on:{" "}
                      {formatPublishedDate(article.published_date)}
                    </Card.Subtitle>
                    <p className="card-text">
                      {" "}
                      {showContent[index]
                        ? article.article_summary
                        : article.article_summary.slice(0, 500) + "..."}
                    </p>
                    {article.article_summary.length > 500 && (
                      <Button
                        variant="dark"
                        onClick={() => toggleContent(index)}
                      >
                        {showContent[index] ? "Read Less" : "Read More"}
                      </Button>
                    )}
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      ) : (
        <p>No Article data available.</p>
      )}
    </>
  );
};

export default ArticleCard;
