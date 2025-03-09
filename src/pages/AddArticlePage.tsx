import { useParams } from "react-router-dom";
import { ArticleType } from "../components/Article";

import ArticleConfig from "../components/ArticleConfig";

const AddArticlePage = ({
  doesCategoryExist,
  addArticle,
  availableTags,
}: {
  doesCategoryExist: any;
  addArticle: any;
  availableTags: string[];
}) => {
  const { category } = useParams<string>();

  const data: ArticleType = {
    bannerURL: "",
    tags: category ? [category] : [],
    title: "",
    subtitle: "",
    paragraphs: [],
    date: Date.now(),
  };
  return (
    <ArticleConfig
      data={data}
      category={category ? category : ""}
      id={"0"}
      doesCategoryExist={doesCategoryExist}
      addArticle={addArticle}
      editArticle={() => null}
      availableTags={availableTags}
      operation="add"
    />
  );
};

export default AddArticlePage;
