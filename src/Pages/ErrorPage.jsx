import { useNavigate, useLocation } from "react-router";
import error from "../assets/App-Error.png";

const ErrorPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Go back to the page user came from, or home if unknown
  const handleGoBack = () => {
    if (location.state?.from) {
      navigate(location.state.from, { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center my-5">
      <img src={error} alt="Error" />
      <p className="text-2xl md:text-6xl mt-4 font-semibold">
        Oops! Page not found!
      </p>
      <p className="text-md md:text-2xl my-4">
        The page you are looking for is not available.
      </p>
      <button
        onClick={handleGoBack}
        className="btn bg-linear-to-r from-[#632ee2] to-[#9f62f2] text-white max-w-100"
      >
        Go Back
      </button>
    </div>
  );
};

export default ErrorPage;
