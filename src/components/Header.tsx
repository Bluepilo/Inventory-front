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
import { useNavigate } from "react-router-dom";
import SwitchBusiness from "./Header/SwitchBusiness";

const Header = ({ openMenu }: { openMenu: () => void }) => {
	const navigate = useNavigate();

	const { details } = useAppSelector((state) => state.auth);
	const { notify, theme } = useAppSelector((state) => state.basic);

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

	const showFreeTrial = () => {
		if (
			details.organization?.subscriptionPlan?.name === "Free" &&
			details.organization.isTrialOn
		) {
			return true;
		} else {
			return false;
		}
	};

	return (
		<HeaderStyle>
			<HeaderDetail color={theme}>
				<SwitchBusiness />
				{details.businessId && showCount() && (
					<Progress
						onClick={() => navigate("/dashboard/home/onboarding")}
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
						{showFreeTrial() ? (
							<p>You are on Free Trial</p>
						) : (
							<p>
								Currently on{" "}
								{details?.organization?.subscriptionPlan?.name}
							</p>
						)}
						{haveRole(details.roleId).isBusinessAdmin &&
							!showFreeTrial() &&
							details?.organization?.subscriptionPlan?.id < 5 && (
								<button
									onClick={() =>
										navigate(
											"/dashboard/subscription/upgrade"
										)
									}
									className="upgrade"
								>
									Upgrade
								</button>
							)}

						<button
							onClick={() => navigate("/dashboard/resources")}
							className="support hide"
						>
							<img src={MessageIcon} alt="Support" />
						</button>
						<button
							className="bell"
							onClick={() => setOpenNoti(true)}
						>
							<FaBell />
							<span>{notify?.unreadNotifications}</span>
						</button>
					</>
				)}
				<button className="profile" onClick={() => setOpenDrop(true)}>
					{details.image ? (
						<img src={details.image} />
					) : (
						<FaRegUser />
					)}
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
