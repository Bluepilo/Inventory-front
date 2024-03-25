import React, { useState } from "react";
import TitleCover from "../../../components/TitleCover";
import { SwitchDiv } from "../../../styles/basic.styles";
import ProfileInfo from "./ProfileInfo";
import Account from "./Account";
import Security from "./Security";
import Notification from "./Notification";

const Settings = () => {
	const [activePage, setActivePage] = useState("profile");

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
				<div
					className={activePage === "account" ? "active" : ""}
					onClick={() => setActivePage("account")}
				>
					Account Settings
				</div>
				<div
					className={activePage === "security" ? "active" : ""}
					onClick={() => setActivePage("security")}
				>
					Security
				</div>
				<div
					className={activePage === "notification" ? "active" : ""}
					onClick={() => setActivePage("notification")}
				>
					Notification
				</div>
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
