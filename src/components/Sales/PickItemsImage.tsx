import { useEffect, useRef, useState } from "react";
import BasicInputs from "../Filters/BasicInputs";
import { IoScanCircle } from "react-icons/io5";
import EachProductImage from "../Lists/EachProductImage";
import EachSelectedImage from "../Lists/EachSelectedImage";
import { TotalBox } from "../../styles/sale.styles";
import { useAppSelector } from "../../redux/hooks";
import { formatCurrency } from "../../utils/currency";
import { MainButton } from "../../styles/links.styles";
import { FaAngleDown } from "react-icons/fa6";
import CurrencyInput from "react-currency-input-field";
import ArrowIcon from "../../assets/icons/arrow.svg";
import { UseDebounce } from "../../utils/hooks";
import { BrowserMultiFormatReader } from "@zxing/browser";
import { displayError } from "../../utils/errors";

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

const PickItemsImage = ({
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
	const { currency } = useAppSelector((state) => state.auth);

	const [search, setSearch] = useState("");
	const [products, setProducts] = useState([]);
	const [pScanner, setPScanner] = useState(false);
	const codeReader = useRef<any>(new BrowserMultiFormatReader());

	const debouncedSearch = UseDebounce(search);

	useEffect(() => {
		if (debouncedSearch) {
			setProducts(
				items.filter(
					(item: any) =>
						item.name
							.toLowerCase()
							.includes(debouncedSearch.toLowerCase()) ||
						item?.barcode?.includes(debouncedSearch)
				)
			);
		} else {
			setProducts(items);
		}
	}, [debouncedSearch, items]);

	useEffect(() => {
		if (pScanner) {
			let scannedData = "";
			const handleKeyDown = (event: KeyboardEvent) => {
				if (event.key === "Enter") {
					addToCart(scannedData);
					scannedData = "";
				} else {
					scannedData += event.key;
				}
			};

			window.addEventListener("keydown", handleKeyDown);

			return () => window.removeEventListener("keydown", handleKeyDown);
		}
	}, [pScanner]);

	const startScanning = async () => {
		setPScanner(!pScanner);
		try {
			let timingOut: any;
			let controls = await codeReader.current.decodeFromVideoDevice(
				undefined,
				undefined,
				(result: any, err: any) => {
					if (result) {
						addToCart(result.getText());
						controls.stop();
						clearTimeout(timingOut);
					}
					if (err) {
						console.log(err, "ERROR");
					}
				}
			);
			timingOut = setTimeout(() => {
				controls.stop();
				// displayError("Scanner Closed", true);
			}, 10000);
		} catch (err) {
			displayError(err, true);
		}
	};

	const addToCart = (code: string) => {
		let cart = items.find((i: any) => i.barcode === code);
		let inCart = selectedProducts.find((i: any) => i.barcode === code);
		if (cart) {
			setSelectedProducts({
				...cart,
				quantity: inCart ? inCart.quantity + 1 : 1,
			});
		} else {
			displayError("Product not found", true);
		}
	};

	return (
		<div>
			<div className="row">
				<div
					className="col-lg-8"
					style={{
						borderRight:
							selectedProducts.length > 0
								? "1px solid rgba(0,0,0,0.2)"
								: "0",
					}}
				>
					<BasicInputs
						val={search}
						setVal={setSearch}
						placeholder="Search or Scan"
						icon={
							<>
								<a
									href="#"
									className="one"
									onClick={(e) => {
										e.preventDefault();
										startScanning();
									}}
								>
									<IoScanCircle size={30} />
								</a>
							</>
						}
					/>
					<div className="mt-3">
						<div className="row">
							{products?.map((item: any) => (
								<div
									className="col-lg-4 col-6 mb-3"
									key={item.id}
								>
									<EachProductImage
										product={item}
										onSelect={(arg) =>
											setSelectedProducts(arg)
										}
									/>
								</div>
							))}
						</div>
					</div>
				</div>

				{selectedProducts.length > 0 && (
					<div className="col-lg-4">
						<div>
							<div className="item-title mb-4">
								<p>Items</p>
								<span>{selectedProducts.length}</span>
							</div>
							<div>
								{selectedProducts.map((s: any) => (
									<EachSelectedImage
										key={s.value}
										s={s}
										changeQty={(item: number) =>
											setSelectedProducts(item)
										}
										remove={remove}
									/>
								))}
							</div>
						</div>

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
										onClick={() =>
											changeDiscount(!discountPercent)
										}
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
													Number(values) <=
														totalAmount)
											) {
												changeDiscountValue(
													Number(values)
												);
											} else {
												changeDiscountValue(0);
											}
										}}
										prefix={`${
											discountPercent
												? "%"
												: `${currency}`
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
					</div>
				)}
			</div>
		</div>
	);
};

export default PickItemsImage;
