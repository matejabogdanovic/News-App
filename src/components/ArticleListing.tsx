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
  return (
    <div className="xl:w-[312px] w-full bg-neutral-400">
      <div
        className=" hover:cursor-pointer bg-cover bg-center w-full xl:h-[200px] h-[25vh]"
        style={{ backgroundImage: `url('${content.bannerURL}')` }}
        onClick={() => {
          navigate(`/${category}/${content.id}`);
          window.scrollTo(0, 0);
        }}
      ></div>
      <div className="flex flex-col justify-between">
        <div className="bg-neutral-200 text-sm p-2 flex items-center justify-between">
          {getDateTime(content.date)}
          <ul className="flex gap-1 flex-wrap">
            <li>
              <Link to="https://www.facebook.com/">
                <FaFacebook className="" />
              </Link>
            </li>
            <li>
              <Link to="https://www.instagram.com/">
                <FaInstagram className="" />
              </Link>
            </li>
            <li>
              <Link to="https://www.whatsapp.com/">
                <FaWhatsapp className="" />
              </Link>
            </li>
          </ul>
        </div>
        <h1 className=" px-2 min-h-[3lh] font-semibold text-xl">
          {content.title}
        </h1>
      </div>
    </div>
  );
};

export default ArticleListing;
