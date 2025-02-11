import { useEffect, useState } from "react";
import Loading from "../../../components/Loaders/Loading";
import { Form, FormBody } from "../../../styles/form.styles";
import { FormCheck } from "react-bootstrap";
import { MainButton } from "../../../styles/links.styles";
import { displayError, displaySuccess } from "../../../utils/errors";
import LoadModal from "../../../components/Loaders/LoadModal";
import adminService from "../../../redux/features/admin/admin-service";
import { useAppSelector } from "../../../redux/hooks";

const AppSettings = ({
	setting,
	reload,
}: {
	setting: any;
	reload: () => void;
}) => {
	const { token, details } = useAppSelector((state) => state.auth);

	const [businessAccountLimit, setBusinessAccountLimit] = useState("");
	const [passwordResetExpiryHours, setPasswordResetExpiryHours] =
		useState("");
	const [enablePushNotification, setEnablePushNotification] = useState(false);
	const [trialDays, setTrialDays] = useState("");
	const [rewardRatePercentage, setRewardRatePercentage] = useState("");
	const [load, setLoad] = useState(false);

	useEffect(() => {
		if (setting.values) {
			setBusinessAccountLimit(setting.values.businessAccountLimit);
			setPasswordResetExpiryHours(
				setting.values.passwordResetExpiryHours
			);
			setTrialDays(setting.values.trialDays);
			setEnablePushNotification(setting.values.enablePushNotification);
			setRewardRatePercentage(setting.values.rewardRatePercentage);
		}
	}, [setting]);

	const updateHandler = async (key: string) => {
		if (window.confirm("Are you sure you want to update this?")) {
			try {
				setLoad(true);
				await adminService.updateAppSettings(token, {
					key,
					value:
						key === "rewardRatePercentage"
							? Number(rewardRatePercentage)
							: key === "trialDays"
							? Number(trialDays)
							: key === "businessAccountLimit"
							? Number(businessAccountLimit)
							: key === "passwordResetExpiryHours"
							? Number(passwordResetExpiryHours)
							: key === "enablePushNotification"
							? enablePushNotification
							: 0,
				});
				setLoad(false);
				displaySuccess("Settings Updated");
				reload();
			} catch (err) {
				displayError(err, true);
			}
		}
	};

	return setting?.values ? (
		<div className="mt-3">
			<FormBody>
				<h6>Update Settings</h6>
				<p>
					You can change each value and click on the Update button to
					proceed.
				</p>
				<Form className="mt-4" onSubmit={(e) => e.preventDefault()}>
					<div className="row align-items-center">
						<div className="col-lg-6 mb-3">
							<label>Business Account Limit</label>
							<input
								value={businessAccountLimit}
								onChange={(e) =>
									setBusinessAccountLimit(e.target.value)
								}
								className="height"
								type="number"
							/>
							{details?.role?.permissions.find(
								(f) => f.method === "updateAppSettings"
							) && (
								<MainButton
									sm="true"
									onClick={() =>
										updateHandler("businessAccountLimit")
									}
								>
									<span>Update Limit</span>
								</MainButton>
							)}
						</div>
						<div className="col-lg-6 mb-3">
							<label>Password Expiry Hours</label>
							<input
								value={passwordResetExpiryHours}
								onChange={(e) =>
									setPasswordResetExpiryHours(e.target.value)
								}
								className="height"
								type="number"
							/>
							{details?.role?.permissions.find(
								(f) => f.method === "updateAppSettings"
							) && (
								<MainButton
									sm="true"
									onClick={() =>
										updateHandler(
											"passwordResetExpiryHours"
										)
									}
								>
									<span>Update Hours</span>
								</MainButton>
							)}
						</div>
						<div className="col-lg-6 mb-3">
							<label>Trial Days</label>
							<input
								value={trialDays}
								onChange={(e) => setTrialDays(e.target.value)}
								className="height"
								type="number"
							/>
							{details?.role?.permissions.find(
								(f) => f.method === "updateAppSettings"
							) && (
								<MainButton
									sm="true"
									onClick={() => updateHandler("trialDays")}
								>
									<span>Update Trial</span>
								</MainButton>
							)}
						</div>
						<div className="col-lg-6 mb-3">
							<label>Reward Rate (%)</label>
							<input
								value={rewardRatePercentage}
								onChange={(e) =>
									setRewardRatePercentage(e.target.value)
								}
								className="height"
								type="number"
							/>
							{details?.role?.permissions.find(
								(f) => f.method === "updateAppSettings"
							) && (
								<MainButton
									sm="true"
									onClick={() =>
										updateHandler("rewardRatePercentage")
									}
								>
									<span>Update Reward</span>
								</MainButton>
							)}
						</div>
						<div className="col-lg-6">
							<FormCheck
								type="switch"
								id="custom-switch"
								label="Enable Push Notification"
								checked={enablePushNotification}
								onChange={(e) =>
									setEnablePushNotification(e.target.checked)
								}
							/>
							{details?.role?.permissions.find(
								(f) => f.method === "updateAppSettings"
							) && (
								<MainButton
									sm="true"
									className="mt-3"
									onClick={() =>
										updateHandler("enablePushNotification")
									}
								>
									<span>Update Notification</span>
								</MainButton>
							)}
						</div>
					</div>
				</Form>
			</FormBody>
			<LoadModal open={load} />
		</div>
	) : (
		<div className="mt-5">
			<Loading />
		</div>
	);
};

export default AppSettings;
