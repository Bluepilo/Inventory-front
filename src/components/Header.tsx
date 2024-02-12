import { useState } from "react";

import {
	HeaderDetail,
	HeaderInfo,
	HeaderStyle,
	Progress,
} from "../styles/header.styles";
import FlashIcon from "../assets/icons/flash.svg";
import MessageIcon from "../assets/icons/message.svg";
import { FaBell, FaRegUser } from "react-icons/fa";
import { MdMenu } from "react-icons/md";
import HeaderDropDown from "./Header/HeaderDropDown";
import NotificationDropDown from "./Header/NotificationDropDown";
import { useAppSelector } from "../redux/hooks";
import { haveRole } from "../utils/role";

const Header = ({ openMenu }: { openMenu: () => void }) => {
	const { details } = useAppSelector((state) => state.auth);

	const [openDrop, setOpenDrop] = useState(false);
	const [openNoti, setOpenNoti] = useState(false);

	const calcPercent = () => {
		let shop =
			details?.business?.onboardingSteps?.shop === "completed" ? 20 : 0;
		let supplier =
			details?.business?.onboardingSteps?.supplier === "completed"
				? 20
				: 0;
		let product =
			details?.business?.onboardingSteps?.product === "completed"
				? 20
				: 0;
		let purchase =
			details?.business?.onboardingSteps?.purchase === "completed"
				? 20
				: 0;

		let sales =
			details?.business?.onboardingSteps?.sales === "completed" ? 20 : 0;

		return shop + supplier + product + purchase + sales;
	};

	const showCount = () => {
		if (haveRole(details.roleId).isAppAdmin || calcPercent() == 100) {
			return false;
		} else {
			return true;
		}
	};

	return (
		<HeaderStyle>
			<HeaderDetail>
				<div className="business">
					<h6>
						{details.businessId
							? details?.business?.name
							: "Bluepilo"}
					</h6>
				</div>
				{details.businessId && showCount() && (
					<Progress
						color={
							calcPercent() >= 60
								? "#505BDA"
								: calcPercent() >= 40
								? "#FF9800"
								: "#F44336"
						}
					>
						<img src={FlashIcon} />
						<span>{calcPercent()}% Setup</span>
					</Progress>
				)}
			</HeaderDetail>
			<HeaderInfo>
				{details.businessId && (
					<>
						{details?.business?.isTrialOn ? (
							<p>You are on Free Trial</p>
						) : (
							<p>
								Currently on{" "}
								{details?.business?.subscriptionPlan?.name}
							</p>
						)}
						{haveRole(details.roleId).isBusinessAdmin &&
							!details?.business?.isTrialOn &&
							details?.business?.subscriptionPlan?.id < 4 && (
								<button className="upgrade">Upgrade</button>
							)}

						<button className="support hide">
							<img src={MessageIcon} alt="Support" />
						</button>
						<button
							className="bell"
							onClick={() => setOpenNoti(true)}
						>
							<FaBell />
							<span>273</span>
						</button>
					</>
				)}
				<button className="profile" onClick={() => setOpenDrop(true)}>
					<FaRegUser />
				</button>
				<button className="support menu" onClick={openMenu}>
					<MdMenu />
				</button>
			</HeaderInfo>
			{openDrop && <HeaderDropDown setOpenDrop={setOpenDrop} />}
			{openNoti && <NotificationDropDown setOpenNoti={setOpenNoti} />}
		</HeaderStyle>
	);
};

export default Header;
