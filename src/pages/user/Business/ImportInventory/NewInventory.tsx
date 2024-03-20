import React from "react";
import TitleCover from "../../../../components/TitleCover";
import PurchaseSteps from "../../../../components/Purchase/PurchaseSteps";

const NewInventory = () => {
	return (
		<div>
			<TitleCover title={"Import Inventory"} />
			<PurchaseSteps onboarding={true} />
		</div>
	);
};

export default NewInventory;
