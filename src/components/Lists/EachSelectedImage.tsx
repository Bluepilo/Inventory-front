import React from "react";
import { SelectedProductImg } from "../../styles/catalogue.styles";
import DefaultImg from "../../assets/images/image.png";
import { FiTrash } from "react-icons/fi";
import { formatCurrency } from "../../utils/currency";
import { useAppSelector } from "../../redux/hooks";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { FlexBetween } from "../../styles/basic.styles";

interface Props {
	s: any;
	changeQty: any;
	remove: (arg: number) => void;
}

const EachSelectedImage = ({ s, changeQty, remove }: Props) => {
	const { currency } = useAppSelector((state) => state.auth);

	return (
		<SelectedProductImg>
			<div className="img">
				<img src={s.image || s?.brand?.image || DefaultImg} />
			</div>
			<div className="div">
				<FlexBetween className="mb-2">
					<p>{s.name}</p>
					<button className="trash" onClick={() => remove(s.value)}>
						<FiTrash />
					</button>
				</FlexBetween>
				<FlexBetween>
					<p>
						{currency} {formatCurrency(s.price)}
					</p>
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
							onClick={() =>
								changeQty({
									...s,
									quantity: s.quantity + 1,
								})
							}
						>
							<FaPlus />
						</button>
					</div>
				</FlexBetween>
			</div>
		</SelectedProductImg>
	);
};

export default EachSelectedImage;
