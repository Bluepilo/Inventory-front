import TitleCover from "../../../components/TitleCover";
import PurchaseSteps from "../../../components/Purchase/PurchaseSteps";

const NewPurchase = () => {
	return (
		<div>
			<TitleCover title={"Record a Purchase"} />
			<PurchaseSteps onboarding={false} />
		</div>
	);
};

export default NewPurchase;
