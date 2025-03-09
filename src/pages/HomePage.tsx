import { Link, useNavigate } from "react-router-dom";
import ArticleListings from "../components/ArticleListings";
import { NavLinks } from "../components/Navbar";
import Container from "../components/Container";
const HomePage = ({
  category,
  links,
}: {
  category: string;
  links: NavLinks[];
}) => {
  const navigate = useNavigate();
  if (category === "news") {
    return (
      <>
        {links.map((link, index) => (
          <Container key={index}>
            <Link
              to={link.to}
              className="inline-block uppercase xl:text-5xl text-3xl font-bold mb-4 underline"
            >
              {link.text}
            </Link>
            <hr className="mb-4" />
            <ArticleListings isHome={true} category={link.text} />
            <button
              onClick={() => {
                navigate(`${link.to}`);
                window.scrollTo(0, 0);
              }}
              className="bg-black text-white rounded-full px-4 py-3 my-4"
            >
              {`See more of ${link.text}`}
            </button>
          </Container>
        ))}
      </>
    );
  } else return <></>;
};

export default HomePage;
