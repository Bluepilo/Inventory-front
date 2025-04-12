import { useState } from "react";
import subscriptionService from "../../redux/features/subscription/subscriptionService";
import { useAppSelector } from "../../redux/hooks";
import { displayError, displaySuccess } from "../../utils/errors";
import { CheckBox, Form } from "../../styles/form.styles";
import CurrencyInput from "react-currency-input-field";
import Loading from "../Loaders/Loading";
import { WideButton } from "../../styles/links.styles";
import { toast } from "react-toastify";

const MakePayment = ({
	close,
	pageType,
	complete,
}: {
	close: () => void;
	pageType: string;
	complete: () => void;
}) => {
	const { currency } = useAppSelector((state) => state.auth);

	const [load, setLoad] = useState(false);
	const [amount, setAmount] = useState<number | string>("");
	const [useDefault, setUseDefault] = useState(false);

	const paymentHandler = async (e: any) => {
		e.preventDefault();
		if (Number(amount) >= 100) {
			let req = {
				amount,
				callbackUrl: `${window.location.origin}/payment-confirmation`,
			};
			try {
				setLoad(true);
				if (useDefault) {
					await subscriptionService.useDefaultCard(Number(amount));
					close();
					complete();
					displaySuccess("Wallet has been credited!");
				} else {
					let res = await subscriptionService.addCard(req);
					close();
					if (res.authorization_url) {
						window.location.replace(res.authorization_url);
					} else {
						alert(
							`There's an error redirecting you to make payment. Please try again later.`
						);
					}
				}
				setLoad(false);
			} catch (err) {
				setLoad(false);
				displayError(err, true);
			}
		} else {
			toast.error("You need to load a minimum of NGN100");
		}
	};

	return (
		<>
			<h5 className="mb-3">
				{pageType === "card" ? "Add a Card" : "Load Wallet"}
			</h5>
			{pageType === "card" && (
				<p>
					Please Note: Any amount you enter will be added to your
					wallet and your card will be saved.
				</p>
			)}
			<Form onSubmit={paymentHandler}>
				<label>Amount</label>
				<CurrencyInput
					id="input-example"
					name="input-name"
					decimalsLimit={2}
					onValueChange={(values) => {
						values ? setAmount(Number(values)) : setAmount("");
					}}
					prefix={`${currency}`}
					value={amount}
					required
					className="height"
				/>
				{pageType !== "card" && (
					<CheckBox>
						<input
							type="checkbox"
							checked={useDefault}
							onChange={(e) => setUseDefault(e.target.checked)}
						/>
						<span>Use Default Card</span>
					</CheckBox>
				)}
				{load ? (
					<Loading />
				) : (
					<WideButton type="submit">
						<span>Continue</span>
					</WideButton>
				)}
			</Form>
		</>
	);
};

export default MakePayment;
