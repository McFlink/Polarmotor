import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getNewsArticles } from "../Services/newsService";
import GenericTable from "../Components/GenericTable";
import CrudActions from "../Components/CrudActions";
import "./News.css";

const News = () => {
  const oneYearInMs = 365 * 24 * 60 * 60 * 1000; // 1 år i millisekunder

  const { data: articles = [] } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const newsData = await getNewsArticles();
      return newsData.sort((a, b) => b.createdAt - a.createdAt);
    },
    staleTime: oneYearInMs,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const navigate = useNavigate();

  // Ange kolumner som ska in i tabellen
  const newsColumns = [
    { header: "Titel", key: "title", style: { width: "20%" } },
    {
      header: "Hantera",
      render: (_, item) =>
        item && item.id ? (
          <CrudActions
            id={item}
            // onUpdate={handleUpdate}
            // onDelete={handleDelete}
          />
        ) : (
          "-"
        ),
      style: { width: "25%" },
    },
  ];

  return (
    <div>
      <h1>Nyheter</h1>
      <div className="news-container d-flex flex-column align-items-center">
        {articles.length > 0 ? (
          articles.map((article) => (
            <div key={article.id} className="card custom-article-card">
              <img
                src={article.image || "https://via.placeholder.com/300"}
                className="article-img"
                alt={article.title}
                loading="lazy"
              />
              <div className="card-body">
                <h5 className="card-title">{article.title}</h5>
                <p className="card-text">{article.content}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="fw-bold">Inga nyheter tillgängliga</p>
        )}
      </div>
      <div className="existing-news-items-table">
        <h4 className="text-center py-4">Alla nyheter</h4>
        <p className="text-center">(Administratörsvy)</p>
        <GenericTable data={articles} columns={newsColumns} />
      </div>
    </div>
  );
};

export default News;
