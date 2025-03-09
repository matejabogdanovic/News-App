import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { getDateTime } from "../services/func";
export type ArticleType = {
  id?: number;
  bannerURL: string;
  tags: string[];
  title: string;
  subtitle: string;
  paragraphs: string[];
  date: number;
};

const Article = ({
  className,
  content,
}: {
  className?: string;
  content: ArticleType;
}) => {
  console.log(content);

  return (
    <article className={className}>
      <div
        className="w-full xl:h-[420px] h-[40vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${content && content?.bannerURL})` }}
      ></div>

      <div className="bg-neutral-300 px-4 py-3 flex flex-wrap gap-4">
        {content?.tags.map((tag, index) => {
          return (
            <span
              className="uppercase font-bold bg-white rounded-full px-4 py-1"
              key={index}
            >
              <Link to={"/" + tag}>{tag}</Link>
            </span>
          );
        })}
      </div>

      <div className=" bg-white p-4">
        <h1 className="font-bold text-5xl mb-4">{content?.title}</h1>
        <h3 className="text-lg mb-6">{content?.subtitle}</h3>
        <hr className="mb-6" />
        <div>
          {content?.paragraphs.map((paragraph, index) => {
            return (
              <p className="my-4" key={index}>
                {paragraph.split("\n").map((txt, index) =>
                  index !== 0 ? (
                    <span key={index}>
                      <br />
                      {txt}
                    </span>
                  ) : (
                    <span key={index}>{txt}</span>
                  )
                )}
              </p>
            );
          })}
        </div>
        <div className="mt-16 flex xl:flex-row flex-col justify-between xl:items-end gap-2 ">
          {getDateTime(content.date)}
          <ul className="flex gap-4 flex-wrap">
            <li>
              <Link to="https://www.facebook.com/">
                <FaFacebook className="text-4xl" />
              </Link>
            </li>
            <li>
              <Link to="https://www.instagram.com/">
                <FaInstagram className="text-4xl" />
              </Link>
            </li>
            <li>
              <Link to="https://www.whatsapp.com/">
                <FaWhatsapp className="text-4xl" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </article>
  );
};

export default Article;
