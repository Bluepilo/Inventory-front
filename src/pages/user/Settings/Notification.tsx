import React, { useEffect, useState } from "react";
import { FormBody } from "../../../styles/form.styles";
import { FormCheck } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { displayError } from "../../../utils/errors";
import basicService from "../../../redux/features/basic/basic-service";
import { toast } from "react-toastify";
import { getSettings } from "../../../redux/features/basic/basic-slice";
import LoadModal from "../../../components/Loaders/LoadModal";

const Notification = () => {
	const dispatch = useAppDispatch();

	const { token, details } = useAppSelector((state) => state.auth);
	const { settings } = useAppSelector((state) => state.basic);

	const [load, setLoad] = useState(false);

	const changeChecked = async (val: boolean, type: string) => {
		let value = val ? type : "";
		let payload = {
			salesNotification: value,
			purchaseNotification: value,
			transferNotification: value,
			paymentNotification: value,
			adjustmentNotification: value,
			returnNotification: value,
			businessId: details.businessId,
		};
		try {
			setLoad(true);
			await basicService.setNotification(token, payload);
			setLoad(false);
			toast.success("Notification Settings Updated.");
			dispatch(getSettings());
		} catch (err) {
			setLoad(false);
			displayError(err, true);
		}
	};

	return (
		<div>
			<FormBody>
				<div className="row">
					<div className="col-md-4">
						<FormCheck
							type="switch"
							id="email-switch"
							checked={
								settings?.salesNotification === "Email"
									? true
									: false
							}
							onChange={(e) =>
								changeChecked(e.target.checked, "Email")
							}
							label="Email Notification"
						/>
					</div>
					<div className="col-md-4">
						<FormCheck
							type="switch"
							id="push-switch"
							checked={
								settings?.salesNotification === "Push"
									? true
									: false
							}
							onChange={(e) =>
								changeChecked(e.target.checked, "Push")
							}
							label="Push Notification"
						/>
					</div>
					<div className="col-md-4">
						<FormCheck
							type="switch"
							id="email-push-switch"
							checked={
								settings?.salesNotification === "Email & Push"
									? true
									: false
							}
							onChange={(e) =>
								changeChecked(e.target.checked, "Email & Push")
							}
							label="Email & Push Notification"
						/>
					</div>
				</div>
			</FormBody>
			{load && <LoadModal open={true} />}
		</div>
	);
};

export default Notification;
