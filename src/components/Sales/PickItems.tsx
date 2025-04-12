import { useState } from "react";
import { DropDownSelect, OptionProp } from "../Filters/BasicInputs";
import { ItemListStyle, TotalBox } from "../../styles/sale.styles";
import EachItem from "./EachItem";
import { FaAngleDown } from "react-icons/fa6";
import { formatCurrency } from "../../utils/currency";
import CurrencyInput from "react-currency-input-field";
import { MainButton } from "../../styles/links.styles";
import ArrowIcon from "../../assets/icons/arrow.svg";
import { useAppSelector } from "../../redux/hooks";

interface Props {
	items: any;
	load: boolean;
	onNext: () => void;
	selectedProducts: any;
	setSelectedProducts: (arg: any) => void;
	discountValue: number;
	changeDiscountValue: (arg: any) => void;
	discountPercent: boolean;
	changeDiscount: (arg: any) => void;
	discountApplied: number;
	totalAmount: number;
	remove: (arg: number) => void;
}

const PickItems = ({
	items,
	load,
	onNext,
	selectedProducts,
	setSelectedProducts,
	discountPercent,
	discountValue,
	changeDiscount,
	changeDiscountValue,
	discountApplied,
	totalAmount,
	remove,
}: Props) => {
	const [val, setVal] = useState<OptionProp | null>(null);

	const { currency } = useAppSelector((state) => state.auth);

	return Array.isArray(items) ? (
		<div>
			{selectedProducts?.length > 0 && (
				<>
					<div className="item-title">
						<p>Items</p>
						<span>{selectedProducts.length}</span>
					</div>
					<ItemListStyle className="table-responsive">
						<div className="head">
							<div className="name">Product</div>
							<div className="qty">Quantity</div>
							<div className="input">Unit Price</div>
							<div className="price">Total</div>
							<div className="cancel"></div>
						</div>
						<div className="body">
							{selectedProducts.map((s: any) => (
								<EachItem
									key={s.value}
									s={s}
									changeQty={(item: number) =>
										setSelectedProducts(item)
									}
									remove={remove}
								/>
							))}
						</div>
					</ItemListStyle>
				</>
			)}
			<DropDownSelect
				options={items}
				changeSelected={(arg) => {
					setVal(arg);
					setSelectedProducts(arg);
				}}
				value={val}
				label="Search Item, Price or Brand"
				loading={load}
			/>
			{selectedProducts?.length > 0 && (
				<TotalBox>
					<div className="summary">
						<p>Total Picked Items:</p>
						<p>
							{currency} {formatCurrency(totalAmount)}
						</p>
					</div>
					<div className="input">
						<label>Discount:</label>
						<div>
							<button
								className="percent"
								onClick={() => changeDiscount(!discountPercent)}
							>
								{discountPercent ? "%" : `${currency}`}{" "}
								<FaAngleDown />
							</button>
							<CurrencyInput
								id="input-example"
								name="input-name"
								decimalsLimit={2}
								onValueChange={(values) => {
									if (
										(discountPercent &&
											Number(values) <= 100) ||
										(!discountPercent &&
											Number(values) <= totalAmount)
									) {
										changeDiscountValue(Number(values));
									} else {
										changeDiscountValue(0);
									}
								}}
								prefix={`${
									discountPercent ? "%" : `${currency}`
								} `}
								value={discountValue}
							/>
						</div>
					</div>
					<div className="input">
						<label>Discount Applied:</label>
						<div>
							<input
								type="text"
								className="expand"
								value={`${currency} ${formatCurrency(
									discountApplied
								)}`}
								disabled
							/>
						</div>
					</div>
					<div className="submit">
						<MainButton right="true" onClick={onNext}>
							<span>Proceed</span>
							<img src={ArrowIcon} />
						</MainButton>
					</div>
				</TotalBox>
			)}
		</div>
	) : (
		<></>
	);
};

export default PickItems;
