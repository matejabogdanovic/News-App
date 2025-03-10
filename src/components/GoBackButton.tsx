import { MouseEventHandler } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const GoBackButton = ({
  onClick,
}: {
  onClick?: MouseEventHandler<HTMLButtonElement>;
}) => {
  const navigate = useNavigate();
  return (
    <button
      className="bg-transparent text-black my-8 flex items-center gap-1 hover:underline"
      onClick={
        onClick
          ? onClick
          : (e) => {
              e.preventDefault();

              navigate(-1);
            }
      }
    >
      <BiArrowBack /> Go back
    </button>
  );
};

export default GoBackButton;
