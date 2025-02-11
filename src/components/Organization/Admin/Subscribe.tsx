import { useEffect, useState } from "react";
import { useAppSelector } from "../../../redux/hooks";
import { Form } from "../../../styles/form.styles";
import CurrencyInput from "react-currency-input-field";
import Loading from "../../Loaders/Loading";
import { WideButton } from "../../../styles/links.styles";
import { toast } from "react-toastify";
import { displayError } from "../../../utils/errors";
import adminService from "../../../redux/features/admin/admin-service";

const Subscribe = ({
	balance,
	onClose,
	id,
}: {
	balance: string;
	onClose: () => void;
	id: any;
}) => {
	const { token } = useAppSelector((state) => state.auth);

	const [subTypes, setSubTypes] = useState<any>([]);
	const [subscriptionType, setSubscriptionType] = useState("");
	const [amount, setAmount] = useState(0);
	const [duration, setDuration] = useState("yearly");
	const [load, setLoad] = useState(false);

	useEffect(() => {
		getPlans();
	}, []);

	useEffect(() => {
		if (subscriptionType) {
			let find = subTypes?.find((p: any) => p.id == subscriptionType);
			setAmount(
				duration === "yearly"
					? Number(find.annualPrice)
					: Number(find.monthlyPrice)
			);
		}
	}, [duration, subscriptionType]);

	const getPlans = async () => {
		try {
			let res = await adminService.getPlans(token);
			setSubTypes(res || []);
		} catch (err) {}
	};

	const submitHandler = async (e: any) => {
		if (subscriptionType) {
			try {
				setLoad(true);
				await adminService.subscribeOrg(token, id, {
					subscriptionPlanId: subscriptionType,
					isMonthly: duration === "yearly" ? false : true,
					autoRenew: false,
				});
				setLoad(false);
				toast.success("Subscription Successful");
				onClose();
			} catch (err) {
				setLoad(false);
				displayError(err, true);
			}
		} else {
			toast.error("All fields must be fillted.");
		}
	};

	return (
		<div>
			<Form onSubmit={submitHandler}>
				<label>Subscription Type</label>
				<select
					value={subscriptionType}
					onChange={(e) => setSubscriptionType(e.target.value)}
					required
					className="height"
				>
					<option value={""}>Select Subscription</option>
					{subTypes?.map((p: any) => (
						<option value={p.id}>{p.name}</option>
					))}
				</select>
				<label>Duration</label>
				<select
					value={duration}
					onChange={(e) => setDuration(e.target.value)}
					required
					className="height"
				>
					<option value={"yearly"}>Yearly</option>
					<option value={"monthly"}>Monthly</option>
				</select>
				<label>Amount</label>
				<CurrencyInput
					id="input-example"
					name="input-name"
					decimalsLimit={2}
					disabled={true}
					prefix={`₦ `}
					value={amount}
					required
					className="height"
				/>
				{amount > Number(balance) && (
					<div className="error-check mb-3">
						Insufficient Wallet Balance
					</div>
				)}
				{load ? (
					<Loading />
				) : (
					<WideButton
						type="submit"
						disabled={amount > Number(balance) ? true : false}
					>
						<span>Subcribe</span>
					</WideButton>
				)}
			</Form>
		</div>
	);
};

export default Subscribe;
