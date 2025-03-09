import { useEffect, useRef, useState } from "react";
import { ArticleType } from "./Article";
import ArticleListing from "./ArticleListing";
import Spinner from "./Spinner";

const ArticleListings = ({
  category,
  isHome = false,
}: {
  category: string | undefined; // todo fix
  isHome?: boolean;
}) => {
  const [listings, setListings] = useState<ArticleType[]>([]);
  const page = useRef<number>(1);
  const lastPage = useRef<number>(1);
  const [loadedAllArticles, setLoadedAllArticles] = useState<boolean>(false);
  const perPage = 3;
  const [loading, setLoading] = useState<boolean>(true);

  console.log("ArticleListings render.");

  const getArticles = async (loadMore: boolean) => {
    try {
      setLoading(true);
      console.log("LOADING PAGE", page.current);
      const limit = isHome
        ? `?_sort=-date&_page=${page.current}&_per_page=3`
        : `?_sort=-date&_page=${page.current}&_per_page=${perPage}`;
      console.log("fetching");
      const res = await fetch(`/api/${category}` + limit);
      if (!res.ok) throw new Error("Error while fetching article.");
      const data = await res.json();
      console.log("fetched");

      lastPage.current = data.last;

      if (lastPage.current === page.current) setLoadedAllArticles(true);
      else setLoadedAllArticles(false);

      console.log("Data", data);
      console.log(listings);

      if (loadMore) setListings(listings.concat(data.data));
      else setListings(data.data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    page.current = 1;
    lastPage.current = 1;

    getArticles(false);
  }, [category]);

  const dynamicArticleLoading = () => {
    if (loadedAllArticles) {
      console.log("LOADED ALL -> showing less");
      page.current = 1;
      //setLoadedAllArticles(false);
      getArticles(false);
      return;
    }
    page.current++;

    getArticles(true);
  };

  // if (!loading) console.log(listings);
  return (
    <>
      <div className="flex xl:flex-row flex-col gap-8 flex-wrap">
        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <>
            {listings &&
              listings.map((content, index) => (
                <ArticleListing
                  content={content}
                  category={category}
                  key={index}
                />
              ))}
          </>
        )}
      </div>
      {lastPage.current !== 1 && !isHome && (
        <button
          onClick={dynamicArticleLoading}
          className="bg-black text-white rounded-full px-4 py-3 my-4"
        >
          {loadedAllArticles ? "See less..." : "See more..."}
        </button>
      )}
    </>
  );
};

export default ArticleListings;
