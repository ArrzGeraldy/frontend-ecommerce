import Spinner from "./shared/Spinner";

const Loader = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Spinner className="w-12 h-12" />
    </div>
  );
};

export default Loader;
