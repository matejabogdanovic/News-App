import { BiArrowBack } from "react-icons/bi";
import Container from "./Container";
import ErrorPage from "../pages/ErrorPage";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArticleType } from "./Article";
import { isAdmin } from "../services/auth";

export type operationType = "add" | "edit";

const ArticleConfig = ({
  data,
  category,
  id,
  doesCategoryExist,
  addArticle,
  editArticle,
  availableTags,
  operation,
}: {
  data: ArticleType;
  category: string;
  id: string;
  doesCategoryExist: any;
  addArticle: Function;
  editArticle: Function;
  availableTags: string[];
  operation: operationType;
}) => {
  const [bannerURL, setBannerURL] = useState<string>(data.bannerURL);
  const [tags, setTags] = useState<string[]>(data.tags);
  const [title, setTitle] = useState<string>(data.title);
  const [subtitle, setSubtitle] = useState<string>(data.subtitle);
  const [text, setText] = useState<string>(data.paragraphs.join("\n\n"));

  const navigate = useNavigate();

  const autoGrow = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (confirm("Are you sure you want to submit this changes?")) {
      const data: ArticleType = {
        bannerURL,
        tags,
        title,
        subtitle,
        paragraphs: [...text.split(/\n\n/)],
        date: Date.now(),
      };
      switch (operation) {
        case "add":
          addArticle(data, category);
          navigate(`/${category}`);
          break;

        case "edit":
          editArticle(data, category, id);
          navigate(`/${category}/${id}`);
          break;
      }
    }
  };
  const toggleCheckboxStyle =
    "select-none cursor-pointer border-2 border-black rounded-full px-3 py-2";
  const toggleCheckboxStyleChecked =
    "select-none cursor-pointer border-2 border-black rounded-full px-3 py-2 bg-black text-white ";
  const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
    if (!tags.includes(e.target.id)) {
      setTags((prevTags) => [...prevTags, e.target.id]);
      e.target.labels?.forEach((element) => {
        element.className = toggleCheckboxStyleChecked;
      });
    } else {
      setTags((prevTags) => prevTags.filter((tag) => tag !== e.target.id));
      e.target.labels?.forEach((element) => {
        element.className = toggleCheckboxStyle;
      });
    }
  };
  return doesCategoryExist(category) && isAdmin() && data ? (
    <Container>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-full gap-4"
      >
        <div className="flex flex-col w-full">
          <label htmlFor="bannerURL">Banner URL: </label>
          <input
            className="border-black border-[1px] rounded-lg p-1"
            type="text"
            id="bannerURL"
            value={bannerURL}
            onChange={(e) => setBannerURL(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col w-full">
          <span>Current tags:</span>
          <div className="flex flex-wrap items-center w-full gap-4 border-black border-[1px] rounded-lg p-1">
            {tags.map((tag, index) => (
              <span key={index}>{tag.toUpperCase()}</span>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap items-center w-full gap-4">
          {availableTags.map((tag, index) => (
            <div className="" key={index}>
              <label
                className={
                  category === tag
                    ? toggleCheckboxStyleChecked + "bg-neutral-500"
                    : tags.includes(tag)
                    ? toggleCheckboxStyleChecked
                    : toggleCheckboxStyle
                }
                htmlFor={tag}
              >
                {tag.toUpperCase() + " "}
              </label>

              <input
                type="checkbox"
                id={tag}
                checked={tags.includes(tag)}
                disabled={category === tag}
                onChange={handleCheck}
                hidden
              />
            </div>
          ))}
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="title">Title: </label>
          <input
            className="border-black border-[1px] rounded-lg p-1"
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="subtitle">Subtitle: </label>
          <input
            className="border-black border-[1px] rounded-lg p-1"
            type="text"
            id="subtitle"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="paragraphs">Text: </label>
          <textarea
            className="border-black border-[1px] rounded-lg p-1 resize-none overflow-hidden"
            id="paragraphs"
            onChange={(e) => {
              setText(e.target.value);
              autoGrow(e);
            }}
            onFocus={autoGrow}
            required
            value={text}
          />
        </div>
        <div className="w-full flex flex-row-reverse justify-between items-center">
          <button
            className="bg-black text-white rounded-full px-4 py-3 my-4"
            type="submit"
          >
            Confirm changes
          </button>
          <button
            className="bg-transparent text-black rounded-full my-4 flex items-center gap-1"
            onClick={(e) => {
              e.preventDefault();
              if (
                confirm("Are you sure you want to go back and discard changes?")
              ) {
                navigate(-1);
              }
            }}
          >
            <BiArrowBack /> Go back
          </button>
        </div>
      </form>
    </Container>
  ) : (
    <ErrorPage />
  );
};

export default ArticleConfig;
