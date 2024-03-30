import React, { useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import customerService from "../../redux/features/customer/customer-services";
import { toast } from "react-toastify";
import { formatCurrency } from "../../utils/currency";
import { displayError } from "../../utils/errors";
import { DropDownSelect, OptionProp } from "../Filters/BasicInputs";
import { Form } from "../../styles/form.styles";
import CurrencyInput from "react-currency-input-field";
import Loading from "../Loaders/Loading";
import { ButtonSubmit } from "../../styles/links.styles";

const WithdrawWallet = ({
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
	const [password, setPassword] = useState("");
	const [inputPassword, setInputPassword] = useState(false);

	const currency =
		details.business?.currency?.symbol || details.business.currencyCode;

	const passwordHandler = (e: any) => {
		e.preventDefault();
		setInputPassword(true);
	};

	const submitHandler = async (e: any) => {
		e.preventDefault();
		try {
			setLoad(true);
			await customerService.withdrawWallet(token, userType, id, {
				amount,
				comment,
				paymentMethodId: selectedMethod?.value,
				shopId: details.shopId || selectedShop?.value,
				password,
			});
			setLoad(false);
			toast.success(
				`₦${formatCurrency(amount)} has been withdrawn from wallet.`
			);
			close();
		} catch (err) {
			setLoad(false);
			displayError(err, true);
		}
	};

	return !inputPassword ? (
		<Form onSubmit={passwordHandler}>
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
				<div className="col-lg-6">
					<label>Shop:</label>
					<DropDownSelect
						options={shops}
						value={selectedShop}
						changeSelected={setSelectedShop}
					/>
				</div>
				<div className="col-lg-6">
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
						<ButtonSubmit type="submit">Proceed</ButtonSubmit>
					)}
				</div>
			</div>
		</Form>
	) : (
		<Form onSubmit={submitHandler}>
			<p>
				You are about to withdraw ₦{formatCurrency(amount)}{" "}
				<a
					className="ms-3"
					href="#"
					onClick={(e) => {
						e.preventDefault();
						setInputPassword(false);
					}}
				>
					Cancel
				</a>
			</p>

			<div>
				<label>Password:</label>
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					disabled={load}
					required
					className="height"
				/>
			</div>
			<div className="col-lg-12 mt-3">
				{load ? (
					<Loading />
				) : (
					<ButtonSubmit type="submit">Withdraw</ButtonSubmit>
				)}
			</div>
		</Form>
	);
};

export default WithdrawWallet;
