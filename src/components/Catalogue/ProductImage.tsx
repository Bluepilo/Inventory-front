import React from "react";
import EachCatalogue from "../Lists/EachCatalogue";
import SkeletonDetails from "../Loaders/SkeletonDetails";

const ProductImage = ({
	updateIds,
	load,
	list,
	ids,
	deleteHandler,
}: {
	updateIds: (e: boolean, a: string) => void;
	load: boolean;
	list: any;
	ids: any;
	deleteHandler: (arg: any, arg2: any) => void;
}) => {
	return (
		<div className="row">
			{list?.rows?.map((l: any) => (
				<div className="col-lg-3 col-md-4 col-6 mb-4" key={l.id}>
					<EachCatalogue item={l} deleteHandler={deleteHandler} />
				</div>
			))}
			{load && <SkeletonDetails />}
		</div>
	);
};

export default ProductImage;
