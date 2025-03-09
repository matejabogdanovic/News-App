import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const GoBackButton = () => {
  const navigate = useNavigate();
  return (
    <button
      className="bg-transparent text-black my-8 flex items-center gap-1"
      onClick={(e) => {
        e.preventDefault();

        navigate(-1);
      }}
    >
      <BiArrowBack /> Go back
    </button>
  );
};

export default GoBackButton;
