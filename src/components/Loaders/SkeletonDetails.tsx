import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonDetails = () => {
	return (
		<div className="row">
			<div className="col-md-6 mb-4">
				<Skeleton height={250} />
			</div>
			<div className="col-md-6 mb-4">
				<Skeleton height={250} />
			</div>
			<div className="col-md-6 mb-4">
				<Skeleton height={250} />
			</div>
			<div className="col-md-6 mb-4">
				<Skeleton height={250} />
			</div>
		</div>
	);
};

export default SkeletonDetails;
