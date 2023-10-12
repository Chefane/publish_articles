"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container, Card } from "react-bootstrap";
import styles from "@/app/css/article.module.css";

interface ArticlesData {
  publisher_name: string;
  article_title: string;
  story: string;
  url: string;
  published_date: string;
}

const ArticleCard: React.FC = () => {
  const [showContent, setShowContent] = useState(false);

  const toggleContent = () => {
    setShowContent(!showContent);
  };
    const [articlesData, setArticlesData] = useState<ArticlesData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchData = async () => {
        try {
          setTimeout(async () => {
            const response = await fetch(
              "pages/api/publish-stories"
            );
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            const data = await response.json();
            if (Array.isArray(data.articles)) {
              setArticlesData(data.articles);
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
    { loading ? (
    <div className="text-center"> {/* Center the spinner */}
      <div className="spinner-border spinner-border-lg" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  ) :articlesData.length > 0 ? (
  articlesData.map((articles, index) => (
    <Container className={styles.articleContainer} key={index}>
      <Card>
        <Card.Body>
          <Card.Title>{articles.article_title}</Card.Title>
          <div style={{ position: "relative", width: "100%", height: "200px", marginBottom:"10px" }} >
              <Image
                src="https://img.freepik.com/free-photo/business-people-reading-newspaper_53876-14764.jpg"
                alt="Sample Image"
                layout="fill"
                objectFit="cover"
              />
            </div>
          <Card.Subtitle className="mb-2 text-muted">Author: {articles.publisher_name}</Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">
           Published on: {articles.published_date}
          </Card.Subtitle>
          <Card.Text> {articles.story} </Card.Text>

          <p className="card-text">
          <small className="text-muted">
            Published on: {articles.published_date}
          </small>
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
