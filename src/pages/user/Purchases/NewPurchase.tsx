import TitleCover from "../../../components/TitleCover";
import PurchaseSteps from "../../../components/Purchase/PurchaseSteps";
import { haveRole } from "../../../utils/role";
import { useAppSelector } from "../../../redux/hooks";
import LayoutSwitching from "../../../components/LayoutSwitching";
import { useState } from "react";

const NewPurchase = () => {
	const { details } = useAppSelector((state) => state.auth);

	const [pictureMode, setPictureMode] = useState(false);

	return haveRole(details.businessRoleId).isBusinessAdmin ||
		details.currentBusinessAccess.makePurchase ? (
		<div>
			<TitleCover
				title={"Record a Purchase"}
				switching={
					<LayoutSwitching
						pictureMode={pictureMode}
						setPictureMode={setPictureMode}
					/>
				}
			/>
			<PurchaseSteps
				onboarding={false}
				pictureMode={pictureMode}
				setPictureMode={setPictureMode}
			/>
		</div>
	) : (
		<></>
	);
};

export default NewPurchase;
