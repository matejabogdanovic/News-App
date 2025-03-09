import Article from "../components/Article";
import Aside from "../components/Aside";
import { Link, useLoaderData, useNavigate, useParams } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import { isAdmin } from "../services/auth";

import { TbEditCircle } from "react-icons/tb";
import Container from "../components/Container";
import { BiMinusCircle } from "react-icons/bi";
const ArticlePage = ({
  doesCategoryExist,
  deleteArticle,
}: {
  doesCategoryExist: Function;
  deleteArticle: Function;
}) => {
  const content = useLoaderData();
  const params = useParams();
  const navigate = useNavigate();
  return params && doesCategoryExist(params.category) ? (
    <Container styleCssOverride="bg-transparent">
      <div className=" mb-8 flex flex-col gap-4">
        {isAdmin() && (
          <div className="flex justify-end">
            <Link
              to={`/${params.category}/edit-article/${params.id}`}
              className="text-orange-500"
            >
              <TbEditCircle className="xl:text-5xl text-4xl" />
            </Link>
            <button
              onClick={() => {
                if (confirm("Are you sure you want to delete this article?")) {
                  deleteArticle(params.category, params.id);
                  navigate(-1);
                }
              }}
              className="text-red-500"
            >
              <BiMinusCircle className="xl:text-5xl text-4xl" />
            </button>
          </div>
        )}
        <div className="flex xl:flex-row flex-col justify-center gap-8">
          {content && <Article className="xl:w-[748px] " content={content} />}
          <Aside className="xl:min-w-[220px]" />
        </div>
      </div>
    </Container>
  ) : (
    <ErrorPage />
  );
};

export default ArticlePage;
