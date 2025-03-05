import { useEffect, useState } from "react";
import { Form } from "../../styles/form.styles";
import CurrencyInput from "react-currency-input-field";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { WideButton } from "../../styles/links.styles";
import { formatCurrency } from "../../utils/currency";
import { displayError } from "../../utils/errors";
import subscriptionService from "../../redux/features/subscription/subscriptionService";
import { toast } from "react-toastify";
import { userProfile } from "../../redux/features/auth/auth-slice";
import Loading from "../Loaders/Loading";

const Subscribe = ({
	plan,
	plans,
	close,
}: {
	plan: any;
	plans: any;
	close: () => void;
}) => {
	const dispatch = useAppDispatch();

	const { details, currency } = useAppSelector((state) => state.auth);

	const [duration, setDuration] = useState("yearly");
	const [subscriptionType, setSubscriptionType] = useState(plan.id);
	const [amount, setAmount] = useState(0);
	const [finalAmount, setFinalAmount] = useState<any>({});
	const [renew, setRenew] = useState("yes");
	const [load, setLoad] = useState(false);

	const balance = Number(details?.organization?.wallet?.balance);

	useEffect(() => {
		if (subscriptionType) {
			let find = plans.find((p: any) => p.id == subscriptionType);
			setAmount(
				duration === "yearly"
					? Number(find.annualPrice)
					: Number(find.monthlyPrice)
			);
		}
	}, [duration, subscriptionType]);

	useEffect(() => {
		if (amount > 0) {
			getDiscount();
		}
	}, [amount]);

	const getDiscount = async () => {
		try {
			let res = await subscriptionService.getApplicableDiscount(amount);
			setFinalAmount(res);
		} catch (err) {}
	};

	const submitHandler = (e: any) => {
		e.preventDefault();
		if (amount > balance) {
			paymentHandler();
		} else {
			subscribeHandler();
		}
	};

	const paymentHandler = async () => {
		let req = {
			amount:
				getRealAmount() > balance
					? getRealAmount() - balance
					: getRealAmount(),
			callbackUrl: `${window.location.origin}/payment-confirmation`,
			subscriptionPlanId: subscriptionType,
			monthly: duration === "monthly" ? true : false,
			autoRenew: renew === "yes" ? true : false,
		};
		try {
			setLoad(true);
			let res = await subscriptionService.makePayment(req);
			setLoad(false);
			close();
			if (res.authorization_url) {
				window.location.replace(res.authorization_url);
			} else {
				alert(
					`There's an error redirecting you to make payment. Please try again later.`
				);
			}
		} catch (err) {
			setLoad(false);
			displayError(err, true);
		}
	};

	const subscribeHandler = async () => {
		let req = {
			subscriptionPlanId: subscriptionType,
			monthly: duration === "monthly" ? true : false,
			autoRenew: renew,
		};
		try {
			setLoad(true);
			await subscriptionService.makeSubscription(req);
			setLoad(false);
			toast.success("Your subscription is successful");
			close();
			dispatch(userProfile());
		} catch (err) {
			setLoad(false);
			displayError(err, true);
		}
	};

	const getRealAmount = () => {
		if (finalAmount.totalPayable && amount > finalAmount.totalPayable) {
			return finalAmount.totalPayable;
		} else {
			return amount;
		}
	};

	return (
		<div>
			<h5 className="mb-3">Review Order</h5>
			<Form onSubmit={submitHandler}>
				<label>Subscription Type</label>
				<select
					value={subscriptionType}
					onChange={(e) => setSubscriptionType(e.target.value)}
					required
					className="height"
				>
					<option value={""}></option>
					{plans?.map((p: any) => (
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
					prefix={`${currency}`}
					value={amount}
					required
					className="height"
				/>
				{finalAmount?.totalPayable &&
					amount > finalAmount.totalPayable && (
						<>
							<label>
								Amount to Pay ({finalAmount?.discounts[0]?.name}
								)
							</label>
							<CurrencyInput
								id="input-example"
								name="input-name"
								decimalsLimit={2}
								disabled={true}
								prefix={`${currency}`}
								value={finalAmount.totalPayable}
								required
								className="height"
							/>
						</>
					)}
				<label>Wallet Balance</label>
				<CurrencyInput
					id="input-example"
					name="input-name"
					decimalsLimit={2}
					style={{
						borderColor:
							getRealAmount() >
							Number(details?.organization?.wallet?.balance)
								? "red"
								: " #d9dbeb",
					}}
					disabled={true}
					prefix={`${currency} `}
					value={details?.organization?.wallet?.balance || 0}
					required
					className="height"
				/>
				{getRealAmount() >
					Number(details?.organization?.wallet?.balance) && (
					<div className="error-check mb-3">
						Insufficient Wallet Balance
					</div>
				)}
				<label>Auto Renew</label>
				<select
					value={renew}
					onChange={(e) => setRenew(e.target.value)}
					required
					className="height"
				>
					<option value={"yes"}>Yes</option>
					<option value={"no"}>No</option>
				</select>
				{load ? (
					<Loading />
				) : (
					<WideButton type="submit">
						<span>
							{getRealAmount() >
							Number(details?.organization?.wallet?.balance)
								? `Pay ₦ ${formatCurrency(
										getRealAmount() -
											Number(
												details?.organization?.wallet
													?.balance
											)
								  )}`
								: `Subscribe ₦ ${formatCurrency(
										getRealAmount()
								  )}`}
						</span>
					</WideButton>
				)}
			</Form>
		</div>
	);
};

export default Subscribe;
