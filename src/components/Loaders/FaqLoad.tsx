import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const FaqLoad = () => {
	return <Skeleton height={50} count={5} style={{ marginBottom: "15px" }} />;
};

export default FaqLoad;
