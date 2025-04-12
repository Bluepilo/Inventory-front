import { useState } from "react";
import { useAppSelector } from "../../../redux/hooks";
import { displayError } from "../../../utils/errors";
import CommentBox from "../../Sales/CommentBox";
import purchaseService from "../../../redux/features/purchase/purchase-service";

const WithdrawPurchase = ({
	id,
	submit,
}: {
	id: number;
	submit: () => void;
}) => {
	const [load, setLoad] = useState(false);

	const withdrawHandler = async (comment: string) => {
		try {
			setLoad(true);
			let res = await purchaseService.withdrawPurchase(id, {
				comment,
			});
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
				btnName="Withdraw Purchase"
				disabled={load}
			/>
		</div>
	);
};

export default WithdrawPurchase;
