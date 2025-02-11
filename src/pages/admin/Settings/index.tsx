import TitleCover from "../../../components/TitleCover";
import { useAppSelector } from "../../../redux/hooks";
import { SwitchDiv } from "../../../styles/basic.styles";
import { useEffect, useState } from "react";
import adminService from "../../../redux/features/admin/admin-service";
import ProfileInfo from "./ProfileInfo";
import AppSettings from "./AppSettings";

const Settings = () => {
	const [activePage, setActivePage] = useState("profile");
	const [appSettings, setAppSettings] = useState<any>({});

	const { details, token } = useAppSelector((state) => state.auth);

	useEffect(() => {
		if (
			details?.role?.permissions.find(
				(f) => f.method === "getAppSettings"
			)
		) {
			loadSettings();
		}
	}, []);

	const loadSettings = async () => {
		try {
			let res = await adminService.appSettings(token);
			setAppSettings(res?.length > 0 ? res[0] : {});
		} catch (err) {}
	};

	return (
		<div>
			<TitleCover title={`Settings`} />
			<SwitchDiv>
				<div
					className={activePage === "profile" ? "active" : ""}
					onClick={() => setActivePage("profile")}
				>
					Profile Information
				</div>
				{details?.role?.permissions.find(
					(f) => f.method === "getAppSettings"
				) && (
					<div
						className={activePage === "app" ? "active" : ""}
						onClick={() => setActivePage("app")}
					>
						App Settings
					</div>
				)}
			</SwitchDiv>
			<div className="row mt-3">
				<div className="col-lg-8">
					{activePage === "profile" ? (
						<ProfileInfo details={details} />
					) : activePage === "app" ? (
						<AppSettings
							setting={appSettings}
							reload={loadSettings}
						/>
					) : (
						<></>
					)}
				</div>
			</div>
		</div>
	);
};

export default Settings;
