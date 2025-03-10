import { BiPlusCircle } from "react-icons/bi";
import ArticleListings from "../components/ArticleListings";
import { Link } from "react-router-dom";
import { isAdmin } from "../services/auth";
import Container from "../components/Container";
const ArticleListingsPage = ({ category }: { category: string }) => {
  return (
    <Container>
      <div className="mb-4 flex flex-wrap justify-between items-center">
        <h1 className="uppercase xl:text-5xl text-3xl font-bold ">
          {category}
        </h1>
        {isAdmin() && (
          <Link to={`/${category}/add-article`} className="text-green-500">
            <BiPlusCircle className="xl:text-5xl text-4xl" />
          </Link>
        )}
      </div>
      <hr className="mb-4 border-gray-300" />
      <ArticleListings category={category} />
    </Container>
  );
};

export default ArticleListingsPage;
