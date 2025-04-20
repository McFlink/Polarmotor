import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getNewsArticle } from "../Services/newsService";
import "./NewsArticle.css";

const NewsArticle = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      const articleData = await getNewsArticle(id);
      setArticle(articleData);
    };
    fetchArticle();
  }, [id]);

  if (!article) {
    return <div>Laddar...</div>;
  }

  return (
    <div className="article-container">
      <h1 className="mb-5">{article.title}</h1>
      {article.image && (
        <img
          src={article.image}
          alt={article.title}
          className="img-fluid mb-5"
        />
      )}
      <p>{article.content}</p>
    </div>
  );
};

export default NewsArticle;
