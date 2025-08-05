import { Link } from "react-router-dom";

const EmptyData = () => {
  return (
    <div className="col-span-full flex flex-col justify-center text-center ">
      <div className="h-fit mt-12">
        <div className="text-xl font-semibold mb-2">Oops, nothing here!</div>
        <div>We couldn't find any matching data.</div>
      </div>
      <Link
        to={"/"}
        className="bg-primary block mt-2 w-fit self-center   text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-all"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default EmptyData;
