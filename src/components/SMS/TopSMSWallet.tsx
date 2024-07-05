import { useState } from "react";
import smsService from "../../redux/features/sms/smsService";
import CurrencyInput from "react-currency-input-field";
import { useAppSelector } from "../../redux/hooks";
import { Form } from "../../styles/form.styles";
import Loading from "../Loaders/Loading";
import { WideButton } from "../../styles/links.styles";
import { displaySuccess } from "../../utils/errors";

const TopSMSWallet = ({
	onSubmit,
	type,
	user,
}: {
	onSubmit: () => void;
	type: string;
	user: any;
}) => {
	const { token, details } = useAppSelector((state) => state.auth);

	const [amount, setAmount] = useState(0);
	const [load, setLoad] = useState(false);

	const topCentralWallet = async (e: any) => {
		e.preventDefault();
		if (amount > 0) {
			try {
				setLoad(true);
				if (type === "central") {
					await smsService.topCentralWallet(token, details.id, {
						amount,
					});
				} else {
					if (user.isAdmin) {
						await smsService.topAdminWallet(token, details.id, {
							amount,
							id: user.orgId,
						});
					} else {
						await smsService.topSmsWallets(token, details.id, {
							amount,
							id: type === "user" ? user.orgId : null,
							all: type === "user" ? false : true,
							name: type === "user" ? user.orgName : null,
						});
					}
				}
				setLoad(false);
				onSubmit();
				displaySuccess("Wallet has been topped!");
			} catch (err) {
				setLoad(false);
			}
		} else {
			alert("Provide an amount greater than 0.");
		}
	};

	return (
		<Form onSubmit={topCentralWallet}>
			<label>Amount</label>
			<CurrencyInput
				id="input-example"
				name="input-name"
				decimalsLimit={2}
				prefix={`₦ `}
				value={amount}
				onValueChange={(values) => {
					setAmount(Number(values));
				}}
				required
				className="height"
			/>
			{load ? (
				<Loading />
			) : (
				<WideButton type="submit">
					<span>Top Up</span>
				</WideButton>
			)}
		</Form>
	);
};

export default TopSMSWallet;
