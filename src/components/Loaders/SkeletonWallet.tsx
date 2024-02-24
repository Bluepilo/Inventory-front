import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonWallet = () => {
	return (
		<div className="mt-4">
			<div className="mb-4">
				<Skeleton height={40} />
			</div>
			<div>
				<Skeleton height={250} />
			</div>
		</div>
	);
};

export default SkeletonWallet;
