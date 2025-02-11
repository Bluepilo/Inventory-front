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

	const { details, token, currency } = useAppSelector((state) => state.auth);

	const [duration, setDuration] = useState("yearly");
	const [subscriptionType, setSubscriptionType] = useState(plan.id);
	const [amount, setAmount] = useState(0);
	const [renew, setRenew] = useState(false);
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
			amount: amount > balance ? amount - balance : amount,
			callbackUrl: `${window.location.origin}/payment-confirmation`,
			subscriptionPlanId: subscriptionType,
			monthly: duration === "monthly" ? true : false,
			autoRenew: renew,
		};
		try {
			setLoad(true);
			let res = await subscriptionService.makePayment(token, req);
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
			await subscriptionService.makeSubscription(token, req);
			setLoad(false);
			toast.success("Your subscription is successful");
			close();
			dispatch(userProfile(details.id));
		} catch (err) {
			setLoad(false);
			displayError(err, true);
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
				<label>Wallet Balance</label>
				<CurrencyInput
					id="input-example"
					name="input-name"
					decimalsLimit={2}
					style={{
						borderColor:
							amount >
							Number(details?.organization?.wallet?.balance)
								? "red"
								: " #d9dbeb",
					}}
					disabled={true}
					prefix={`${currency} `}
					onValueChange={(values) => {
						setAmount(Number(values));
					}}
					value={details?.organization?.wallet?.balance || 0}
					required
					className="height"
				/>

				{amount > Number(details?.organization?.wallet?.balance) && (
					<div className="error-check mb-3">
						Insufficient Wallet Balance
					</div>
				)}
				{load ? (
					<Loading />
				) : (
					<WideButton type="submit">
						<span>
							{amount >
							Number(details?.organization?.wallet?.balance)
								? `Pay ₦ ${formatCurrency(
										amount -
											Number(
												details?.organization?.wallet
													?.balance
											)
								  )}`
								: `Subscribe ₦ ${formatCurrency(amount)}`}
						</span>
					</WideButton>
				)}
			</Form>
		</div>
	);
};

export default Subscribe;
