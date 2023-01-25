import { ClipLoader } from "react-spinners";

interface LoaderProps {
  loading: boolean;
}

const Loader: React.FC<LoaderProps> = ({ loading }) => {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gray-200 opacity-50 w-screen h-screen flex items-center justify-center z-20 dark:bg-gray-800">
      <ClipLoader
        loading={loading}
        color="#d946ef"
        size={50}
        aria-label="Loading Spinner"
      />
    </div>
  );
};

export default Loader;
