"use client";
import * as React from "react";
import { NewsComponent } from "./News";
import { Button } from "@progress/kendo-react-buttons";
import { useState, useEffect } from "react";
import { NewsComponentSkeleton } from "./NewsSkeleton";
import { Tooltip } from "@progress/kendo-react-tooltip";
export const NewsContainerComponent = ({
  category,
  language,
}: {
  category: string;
  language: string;
}) => {
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNews = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/${language}/search/trending_topics/${category}?page=${currentPage}&type=CUSTOM_CATEGORY`
      );
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      if (data.data.suggested_news) {
        const latest = news.concat(
          data.data.suggested_news.map((item: any) => item.news_obj)
        );
        setNews(latest);
      } else {
        throw new Error("No news found");
      }
    } catch (error: any) {
      console.error("something went wrong; fetching news from api");
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [currentPage]);

  function handleLoadMore() {
    setCurrentPage((page) => page + 1);
  }

  return (
    <>
      <Tooltip anchorElement="target" position="top">
        {news.map((card, index) => {
          return <NewsComponent card={card} key={index} />;
        })}
      </Tooltip>

      {isLoading && <NewsComponentSkeleton />}
      <div className="flex justify-center">
        <Button
          disabled={isLoading}
          className="action-button mt-2"
          themeColor={"primary"}
          onClick={handleLoadMore}
        >
          Load More
        </Button>
      </div>
    </>
  );
};
