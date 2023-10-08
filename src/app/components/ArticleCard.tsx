"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "@/app/page.module.css";

interface ArticlesData {
  publisher_name: string;
  article_title: string;
  story: string;
  url: string;
  published_date: string;
}

const ArticleCard: React.FC = () => {
  const [articlesData, setArticlesData] = useState<ArticlesData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setTimeout(async () => {
          const response = await fetch(
            "http://localhost:3001/pages/api/publish-stories"
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
    <div className="cardContent">
      <h4 style={{ marginBottom: "5%" }}>Explore Published Articles</h4>
      { loading ? (
          <div className="text-center"> {/* Center the spinner */}
            <div className="spinner-border spinner-border-lg" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) :articlesData.length > 0 ? (
        articlesData.map((articles, index) => (
          <div className="card mb-4" style={{ width: "100%" }} key={index}>
            <div
              style={{ position: "relative", width: "100%", height: "200px" }}
            >
              <Image
                src="https://img.freepik.com/free-photo/business-people-reading-newspaper_53876-14764.jpg"
                alt="Sample Image"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="card-body">
              <h5 className="card-title">{articles.article_title}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                Author: {articles.publisher_name}
              </h6>
              <p className="card-text">{articles.story}</p>
              <Link className={styles.button} href={articles.url}>
                Read More
              </Link>

              <p className="card-text">
                <small className="text-muted">
                  Published on: {articles.published_date}
                </small>
              </p>
            </div>
          </div>
        ))
      ) : (
        <p>No Article data available.</p>
      )}
    </div>
  );
};

export default ArticleCard;
