import React, { useEffect, useState } from "react";
import { FormBody } from "../../../styles/form.styles";
import { FormCheck } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { displayError } from "../../../utils/errors";
import basicService from "../../../redux/features/basic/basic-service";
import { toast } from "react-toastify";
import { getSettings } from "../../../redux/features/basic/basic-slice";
import LoadModal from "../../../components/Loaders/LoadModal";
import { AccountBox } from "../../../styles/profile.styles";
import { Flex } from "../../../styles/basic.styles";
import { MainButton } from "../../../styles/links.styles";

const Notification = () => {
	const dispatch = useAppDispatch();

	const { token, details } = useAppSelector((state) => state.auth);
	const { settings } = useAppSelector((state) => state.basic);

	const [load, setLoad] = useState(false);
	const [stockVal, setStockVal] = useState("");

	useEffect(() => {
		if (settings?.stockAlert) {
			setStockVal(settings.stockAlert);
		}
	}, [settings]);

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

	const changeStockAlert = async () => {
		if (stockVal) {
			let payload = {
				stockAlert: Number(stockVal),
				businessId: details.businessId,
			};
			try {
				setLoad(true);
				await basicService.setNotification(token, payload);
				setLoad(false);
				toast.success("Stock Alert Frequency Updated.");
				dispatch(getSettings());
			} catch (err) {
				setLoad(false);
				displayError(err, true);
			}
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
			<AccountBox className="mt-3">
				<h6>Set-up Stock Alert</h6>
				<p>
					How frequent (in days) do you want to receive stock alert?
				</p>
				<Flex className="mt-4">
					<div className="input me-4 mb-2">
						<input
							onChange={(e) => setStockVal(e.target.value)}
							value={stockVal}
							disabled={load}
							type="number"
						/>
					</div>

					<MainButton
						disabled={load}
						onClick={changeStockAlert}
						className="mb-2"
					>
						<span>Set</span>
					</MainButton>
				</Flex>
			</AccountBox>
			{load && <LoadModal open={true} />}
		</div>
	);
};

export default Notification;
