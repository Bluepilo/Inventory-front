import { formatCurrency } from "../../utils/currency";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import CurrencyInput from "react-currency-input-field";
import { useState } from "react";

interface Props {
	s: any;
	changeQty: any;
	remove: (arg: number) => void;
}

const EachItem = ({ s, changeQty, remove }: Props) => {
	const [amount, setAmount] = useState<number>(s.price);

	return (
		<div className="info info-sm">
			<div className="name">{s.name}</div>
			<div className="qty">
				<button
					onClick={() => {
						if (s.quantity > 1) {
							changeQty({
								...s,
								quantity: s.quantity - 1,
							});
						}
					}}
				>
					<FaMinus />
				</button>
				<input
					type="number"
					value={s.quantity}
					onChange={(e) => {
						changeQty({
							...s,
							quantity: e.target.value,
						});
					}}
				/>
				<button
					onClick={() => {
						if (s.quantity < s.totalStock) {
							changeQty({
								...s,
								quantity: s.quantity + 1,
							});
						} else {
							alert(`You can't exceed total stock available.`);
						}
					}}
				>
					<FaPlus />
				</button>
			</div>
			<div className="cancel">
				<button onClick={() => remove(s.value)}>
					<FaTimes />
				</button>
			</div>
		</div>
	);
};

export default EachItem;
