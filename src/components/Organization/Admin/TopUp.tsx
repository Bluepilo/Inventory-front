import { useState } from "react";
import { Form } from "../../../styles/form.styles";
import CurrencyInput from "react-currency-input-field";
import Loading from "../../Loaders/Loading";
import { WideButton } from "../../../styles/links.styles";
import { toast } from "react-toastify";
import { displayError } from "../../../utils/errors";
import adminService from "../../../redux/features/admin/admin-service";
import { useAppSelector } from "../../../redux/hooks";
import { formatCurrency } from "../../../utils/currency";

const TopUp = ({ id, onClose }: { id: string; onClose: () => void }) => {
	const { token } = useAppSelector((state) => state.auth);

	const [load, setLoad] = useState(false);
	const [amount, setAmount] = useState(0);

	const paymentHandler = async (e: any) => {
		e.preventDefault();
		if (amount > 0) {
			try {
				setLoad(true);
				await adminService.topWallet(token, id, { amount });
				setLoad(false);
				toast.success(
					`You've topped up the wallet with ${formatCurrency(amount)}`
				);
				onClose();
			} catch (err) {
				setLoad(false);
				displayError(err, true);
			}
		} else {
			toast.error("Amount should be greater than 0");
		}
	};

	return (
		<>
			<p className="mb-3">Load Organization Wallet</p>
			<Form onSubmit={paymentHandler}>
				<label>Amount</label>
				<CurrencyInput
					id="input-example"
					name="input-name"
					decimalsLimit={2}
					onValueChange={(values) => {
						setAmount(Number(values));
					}}
					prefix={`₦ `}
					value={amount}
					required
					className="height"
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

export default TopUp;
