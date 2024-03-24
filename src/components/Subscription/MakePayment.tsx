import React, { useState } from "react";
import subscriptionService from "../../redux/features/subscription/subscriptionService";
import { useAppSelector } from "../../redux/hooks";
import { displayError } from "../../utils/errors";
import { Form } from "../../styles/form.styles";
import CurrencyInput from "react-currency-input-field";
import Loading from "../Loaders/Loading";
import { WideButton } from "../../styles/links.styles";
import { toast } from "react-toastify";

const MakePayment = ({ close }: { close: () => void }) => {
	const { token } = useAppSelector((state) => state.auth);

	const [load, setLoad] = useState(false);
	const [amount, setAmount] = useState(0);

	const paymentHandler = async (e: any) => {
		e.preventDefault();
		if (amount > 100) {
			let req = {
				amount,
				calbackUrl: `${window.location.origin}/payment-confirmation`,
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
		} else {
			toast.error("You need to load a minimum of 100");
		}
	};

	return (
		<>
			<h5 className="mb-3">Load Wallet</h5>
			<Form onSubmit={paymentHandler}>
				<label>Amount</label>
				<CurrencyInput
					id="input-example"
					name="input-name"
					decimalsLimit={2}
					onValueChange={(values) => {
						setAmount(Number(values));
					}}
					prefix={"₦ "}
					value={amount}
					required
				/>
				{load ? (
					<Loading />
				) : (
					<WideButton type="submit">
						<span>Make Payment</span>
					</WideButton>
				)}
			</Form>
		</>
	);
};

export default MakePayment;
