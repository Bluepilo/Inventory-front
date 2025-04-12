import React, { useState } from "react";
import { Form } from "../../styles/form.styles";
import smsService from "../../redux/features/sms/smsService";
import { useAppSelector } from "../../redux/hooks";
import { displaySuccess } from "../../utils/errors";
import CurrencyInput from "react-currency-input-field";
import Loading from "../Loaders/Loading";
import { WideButton } from "../../styles/links.styles";

const SpandCpEdit = ({
	editSp,
	onSubmit,
	val,
}: {
	editSp: boolean;
	val: number;
	onSubmit: () => void;
}) => {
	const { details } = useAppSelector((state) => state.auth);

	const [load, setLoad] = useState(false);
	const [amount, setAmount] = useState(val);

	const editSettings = async (e: any) => {
		e.preventDefault();
		if (amount > 0) {
			try {
				setLoad(true);
				let payload = editSp
					? { spPerPage: amount }
					: { cpPerPage: amount };
				await smsService.editSettings(details.id, payload);

				setLoad(false);
				onSubmit();
				displaySuccess("Updated!");
			} catch (err) {
				setLoad(false);
			}
		} else {
			alert("Provide an amount greater than 0.");
		}
	};

	return (
		<Form onSubmit={editSettings}>
			<label>Value</label>
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
					<span>Update</span>
				</WideButton>
			)}
		</Form>
	);
};

export default SpandCpEdit;
