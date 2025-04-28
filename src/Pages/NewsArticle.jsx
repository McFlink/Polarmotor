import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getNewsArticle } from "../Services/newsService";
import DOMPurify from "dompurify";
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

  const createdAtDate = article.createdAt
    ? new Date(article.createdAt.seconds * 1000).toLocaleDateString()
    : "";

  const sanitizedContent = DOMPurify.sanitize(article.content);

  const handleLineBreaks = (content) => {
    // Ersätt varje "\n" med <br> (för radbrytning). dangerouslySetInnerHTML används för att injicera html i DOM, vilket betyder att BR-taggar kommer att tolkas som radbryt.
    return content.replace(/\n/g, "<br>");
  };

  const contentWithLineBreaks = handleLineBreaks(sanitizedContent);

  return (
    <div className="article-container">
      <div className="article">
        <h1 className="mb-2 mt-3">{article.title}</h1>
        <p className="mb-5 fst-italic">Upplagd: {createdAtDate}</p>
        {article.image && (
          <img
            src={article.image}
            alt={article.title}
            className="img-fluid mb-5"
          />
        )}
        <div
          className="article-content mb-5"
          dangerouslySetInnerHTML={{ __html: contentWithLineBreaks }}
        />
      </div>
    </div>
  );
};

export default NewsArticle;
