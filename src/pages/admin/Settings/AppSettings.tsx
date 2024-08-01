import { useEffect, useState } from "react";
import Loading from "../../../components/Loaders/Loading";
import { Form, FormBody } from "../../../styles/form.styles";
import { FormCheck } from "react-bootstrap";

const AppSettings = ({ setting }: { setting: any }) => {
	const [businessAccountLimit, setBusinessAccountLimit] = useState("");
	const [passwordResetExpiryHours, setPasswordResetExpiryHours] =
		useState("");
	const [enablePushNotification, setEnablePushNotification] = useState(false);
	const [trialDays, setTrialDays] = useState("");

	useEffect(() => {
		if (setting.values) {
			setBusinessAccountLimit(setting.values.businessAccountLimit);
			setPasswordResetExpiryHours(
				setting.values.passwordResetExpiryHours
			);
			setTrialDays(setting.values.trialDays);
			setEnablePushNotification(setting.values.enablePushNotification);
		}
	}, [setting]);

	return setting?.values ? (
		<div className="mt-3">
			<FormBody>
				<h6>Update Settings</h6>
				<p>
					You can change each value and click on the Update button to
					proceed.
				</p>
				<Form className="mt-4">
					<div className="row align-items-center">
						<div className="col-lg-6">
							<label>Business Account Limit</label>
							<input
								value={businessAccountLimit}
								onChange={(e) =>
									setBusinessAccountLimit(e.target.value)
								}
								className="height"
								type="number"
							/>
						</div>
						<div className="col-lg-6">
							<label>Password Expiry Hours</label>
							<input
								value={passwordResetExpiryHours}
								onChange={(e) =>
									setPasswordResetExpiryHours(e.target.value)
								}
								className="height"
								type="number"
							/>
						</div>
						<div className="col-lg-6">
							<label>Trial Days</label>
							<input
								value={trialDays}
								onChange={(e) => setTrialDays(e.target.value)}
								className="height"
								type="number"
							/>
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
						</div>
					</div>
				</Form>
			</FormBody>
		</div>
	) : (
		<div className="mt-5">
			<Loading />
		</div>
	);
};

export default AppSettings;
