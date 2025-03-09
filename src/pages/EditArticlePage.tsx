import { useLoaderData, useParams } from "react-router-dom";
import { ArticleType } from "../components/Article";

import ArticleConfig from "../components/ArticleConfig";

const EditArticlePage = ({
  doesCategoryExist,
  editArticle,
  availableTags,
}: {
  doesCategoryExist: any;
  editArticle: any;
  availableTags: string[];
}) => {
  const data: ArticleType = useLoaderData();

  const { category, id } = useParams();

  return (
    <ArticleConfig
      data={data}
      category={category ? category : ""}
      id={id ? id : "0"}
      doesCategoryExist={doesCategoryExist}
      addArticle={() => null}
      editArticle={editArticle}
      availableTags={availableTags}
      operation="edit"
    />
  );
};

export default EditArticlePage;
