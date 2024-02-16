import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonTable = () => {
	return <Skeleton height={20} count={5} />;
};

export default SkeletonTable;
