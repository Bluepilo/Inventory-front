import TitleCover from "../../../components/TitleCover";
import PurchaseSteps from "../../../components/Purchase/PurchaseSteps";
import { haveRole } from "../../../utils/role";
import { useAppSelector } from "../../../redux/hooks";

const NewPurchase = () => {
	const { details } = useAppSelector((state) => state.auth);

	return haveRole(details.roleId).isBusinessAdmin ? (
		<div>
			<TitleCover title={"Record a Purchase"} />
			<PurchaseSteps onboarding={false} />
		</div>
	) : (
		<></>
	);
};

export default NewPurchase;
