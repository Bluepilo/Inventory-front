import React, { useState } from "react";
import CommentBox from "../CommentBox";
import salesService from "../../../redux/features/sales/sales-service";
import { useAppSelector } from "../../../redux/hooks";
import { displayError } from "../../../utils/errors";

const WithdrawSale = ({ id, submit }: { id: number; submit: () => void }) => {
	const { token } = useAppSelector((state) => state.auth);

	const [load, setLoad] = useState(false);

	const withdrawHandler = async (comment: string) => {
		try {
			setLoad(true);
			let res = await salesService.withdrawSale(token, id, { comment });
			setLoad(false);
			if (res) {
				submit();
			}
		} catch (err) {
			setLoad(false);
			displayError(err, true);
		}
	};

	return (
		<div>
			<CommentBox
				submit={(comment) => withdrawHandler(comment)}
				bg="#FF2725"
				btnName="Withdraw Sale"
				disabled={load}
			/>
		</div>
	);
};

export default WithdrawSale;
