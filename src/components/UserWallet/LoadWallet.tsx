import React, { useState } from "react";
import CurrencyInput from "react-currency-input-field";
import { Form } from "../../styles/form.styles";
import { DropDownSelect, OptionProp } from "../Filters/BasicInputs";
import { useAppSelector } from "../../redux/hooks";
import { ButtonSubmit } from "../../styles/links.styles";
import { displayError } from "../../utils/errors";
import Loading from "../Loaders/Loading";
import customerService from "../../redux/features/customer/customer-services";
import { toast } from "react-toastify";
import { formatCurrency } from "../../utils/currency";

const LoadWallet = ({
	id,
	userType,
	close,
}: {
	id: any;
	userType: string;
	close: () => void;
}) => {
	const { token, details } = useAppSelector((state) => state.auth);
	const { methods, shops } = useAppSelector((state) => state.basic);

	const [load, setLoad] = useState(false);
	const [amount, setAmount] = useState(0);
	const [selectedMethod, setSelectedMethod] = useState<OptionProp | null>(
		null
	);
	const [selectedShop, setSelectedShop] = useState<OptionProp | null>(null);
	const [comment, setComment] = useState("");

	const currency =
		details.business?.currency?.symbol || details.business.currencyCode;

	const submitHandler = async (e: any) => {
		e.preventDefault();
		try {
			setLoad(true);
			await customerService.loadWallet(token, userType, id, {
				amount,
				comment,
				paymentMethodId: selectedMethod?.value,
				shopId: details.shopId || selectedShop?.value,
			});
			setLoad(false);
			toast.success(
				`Wallet has been loaded with ₦ ${formatCurrency(amount)}`
			);
			close();
		} catch (err) {
			setLoad(false);
			displayError(err, true);
		}
	};

	return (
		<Form onSubmit={submitHandler}>
			<div className="row">
				<div className="col-lg-6">
					<label>Amount:</label>
					<CurrencyInput
						id="input-example"
						name="input-name"
						decimalsLimit={2}
						onValueChange={(values) => {
							setAmount(Number(values));
						}}
						prefix={`${currency} `}
						value={amount}
						disabled={load}
						className="height"
					/>
				</div>
				<div className="col-lg-6">
					<label>Payment Method:</label>
					<DropDownSelect
						options={methods}
						value={selectedMethod}
						changeSelected={setSelectedMethod}
					/>
				</div>
				{!details?.shopId && (
					<div className="col-lg-6">
						<label>Shop:</label>
						<DropDownSelect
							options={shops?.filter((s) => s.isActive)}
							value={selectedShop}
							changeSelected={setSelectedShop}
						/>
					</div>
				)}
				<div className={`col-lg-${details.shopId ? "12" : "6"}`}>
					<label>Comment:</label>
					<input
						type="text"
						value={comment}
						onChange={(e) => setComment(e.target.value)}
						disabled={load}
						className="height"
					/>
				</div>
				<div className="col-lg-12 mt-3">
					{load ? (
						<Loading />
					) : (
						<ButtonSubmit type="submit">Load Wallet</ButtonSubmit>
					)}
				</div>
			</div>
		</Form>
	);
};

export default LoadWallet;
