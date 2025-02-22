import TitleCover from "../../../../components/TitleCover";
import PurchaseSteps from "../../../../components/Purchase/PurchaseSteps";
import LayoutSwitching from "../../../../components/LayoutSwitching";

const NewInventory = () => {
	return (
		<div>
			<TitleCover
				title={"Import Inventory"}
				switching={<LayoutSwitching />}
			/>
			<PurchaseSteps onboarding={true} />
		</div>
	);
};

export default NewInventory;
