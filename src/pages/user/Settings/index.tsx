import React, { useEffect, useState } from "react";
import TitleCover from "../../../components/TitleCover";
import { SwitchDiv } from "../../../styles/basic.styles";
import ProfileInfo from "./ProfileInfo";
import Account from "./Account";
import Security from "./Security";
import Notification from "./Notification";
import { haveRole } from "../../../utils/role";
import { useAppSelector } from "../../../redux/hooks";

const Settings = () => {
	const [activePage, setActivePage] = useState("profile");

	const { details } = useAppSelector((state) => state.auth);

	return (
		<div>
			<TitleCover title={`Settings`} />
			<SwitchDiv style={{ width: "100%" }}>
				<div
					className={activePage === "profile" ? "active" : ""}
					onClick={() => setActivePage("profile")}
				>
					Profile Information
				</div>
				{haveRole(details.businessRoleId).isBusinessAdmin && (
					<div
						className={activePage === "account" ? "active" : ""}
						onClick={() => setActivePage("account")}
					>
						Account Settings
					</div>
				)}
				<div
					className={activePage === "security" ? "active" : ""}
					onClick={() => setActivePage("security")}
				>
					Security
				</div>
				{haveRole(details.businessRoleId).isBusinessAdmin && (
					<div
						className={
							activePage === "notification" ? "active" : ""
						}
						onClick={() => setActivePage("notification")}
					>
						Notification
					</div>
				)}
			</SwitchDiv>
			<div className="mt-4">
				{activePage === "profile" ? (
					<ProfileInfo />
				) : activePage === "account" ? (
					<Account />
				) : activePage === "security" ? (
					<Security />
				) : activePage === "notification" ? (
					<Notification />
				) : (
					<></>
				)}
			</div>
		</div>
	);
};

export default Settings;
