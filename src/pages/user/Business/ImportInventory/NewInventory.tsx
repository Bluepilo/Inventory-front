import React, { useState } from "react";
import TitleCover from "../../../../components/TitleCover";
import PurchaseSteps from "../../../../components/Purchase/PurchaseSteps";
import LayoutSwitching from "../../../../components/LayoutSwitching";

const NewInventory = () => {
	const [pictureMode, setPictureMode] = useState(false);

	return (
		<div>
			<TitleCover
				title={"Import Inventory"}
				switching={
					<LayoutSwitching
						pictureMode={pictureMode}
						setPictureMode={setPictureMode}
					/>
				}
			/>
			<PurchaseSteps
				onboarding={true}
				pictureMode={pictureMode}
				setPictureMode={setPictureMode}
			/>
		</div>
	);
};

export default NewInventory;
