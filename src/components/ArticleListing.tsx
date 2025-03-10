import { Link, useNavigate } from "react-router-dom";
import { ArticleType } from "./Article";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { getDateTime } from "../services/func";

const ArticleListing = ({
  content,
  category,
}: {
  content: ArticleType;
  category?: string;
}) => {
  const navigate = useNavigate();
  const goToArticle = () => {
    navigate(`/${category}/${content.id}`);
    window.scrollTo(0, 0);
  };
  return (
    <div className="xl:hover:-translate-y-1 transition-transform duration-100 bg-white shadow-xl xl:w-[312px] w-full group">
      <div
        className="cursor-pointer bg-cover bg-center w-full xl:h-[200px] h-[25vh] flex flex-col-reverse overflow-hidden"
        style={{ backgroundImage: `url('${content.bannerURL}')` }}
        onClick={goToArticle}
      >
        <div className="bg-black bg-opacity-60 text-white min-h-16 p-2 opacity-0 xl:group-hover:opacity-100 translate-y-full group-hover:translate-y-0 duration-300">
          {content.subtitle}
        </div>
      </div>
      <div className="flex flex-col justify-between">
        <div className=" text-sm p-2 flex items-center justify-between">
          {getDateTime(content.date)}
          <ul className="flex gap-2 flex-wrap">
            <li>
              <Link to="https://www.facebook.com/">
                <FaFacebook className="xl:hover:-translate-y-1 transition-transform duration-100" />
              </Link>
            </li>
            <li>
              <Link to="https://www.instagram.com/">
                <FaInstagram className="xl:hover:-translate-y-1 transition-transform duration-100" />
              </Link>
            </li>
            <li>
              <Link to="https://www.whatsapp.com/">
                <FaWhatsapp className="xl:hover:-translate-y-1 transition-transform duration-100" />
              </Link>
            </li>
          </ul>
        </div>
        <h1
          className="cursor-pointer px-2 pb-2 min-h-[3lh] font-semibold text-xl"
          onClick={goToArticle}
        >
          {content.title}
        </h1>
      </div>
    </div>
  );
};

export default ArticleListing;
