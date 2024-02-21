import React, { useEffect, useState } from "react";
import TitleCover from "../../../components/TitleCover";
import { SaleSelectDiv, SalesDiv } from "../../../styles/sale.styles";
import {
	OptionProp,
	SaleSelect,
} from "../../../components/Filters/BasicInputs";
import { SaleSelectStyle } from "../../../styles/filters.styles";
import { useAppSelector } from "../../../redux/hooks";
import PickItems from "../../../components/Sales/PickItems";
import productService from "../../../redux/features/product/product-service";
import { formatCurrency } from "../../../utils/currency";
import CustomerSelect from "../../../components/Sales/CustomerSelect";
import LoadModal from "../../../components/Loaders/LoadModal";
import { displayError } from "../../../utils/errors";
import salesService from "../../../redux/features/sales/sales-service";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const NewSale = () => {
	const navigate = useNavigate();

	const { details, token } = useAppSelector((state) => state.auth);
	const { shops } = useAppSelector((state) => state.basic);

	const [isWalkIn, setIsWalkIn] = useState(true);
	const [selectedShop, setSelectedShop] = useState<OptionProp | null>(null);
	const [shopList, setShopList] = useState<OptionProp[]>([]);
	const [step, setStep] = useState(1);

	const [productLoad, setProductLoad] = useState(false);
	const [productList, setProductList] = useState<any>([]);

	const [selectedProducts, setSelectedProducts] = useState<any>([]);
	const [discountValue, setDiscountValue] = useState(0);
	const [discountPercent, setDiscountPercent] = useState(true);
	const [totalPrice, setTotalPrice] = useState(0);
	const [discountApplied, setDiscountApplied] = useState(0);

	const [load, setLoad] = useState(false);

	useEffect(() => {
		filterShops();
	}, []);

	useEffect(() => {
		if (selectedShop?.value) {
			getProducts();
		}
	}, [selectedShop]);

	useEffect(() => {
		if (selectedProducts.length > 0) {
			getTotalAmountDue();
		}
	}, [selectedProducts]);

	useEffect(() => {
		if (discountPercent) {
			let p = (Number(discountValue) / 100) * totalPrice;
			setDiscountApplied(p);
		} else {
			console.log("test2");
			setDiscountApplied(Number(discountValue));
		}
	}, [discountValue, totalPrice, discountPercent]);

	const filterShops = () => {
		if (shops?.length > 0) {
			let filter = shops.filter((s) => s.isActive);
			setShopList(filter);
			if (filter.length > 0) {
				setSelectedShop(filter[0]);
			}
		}
	};

	const getProducts = async () => {
		try {
			setProductList([]);
			setSelectedProducts([]);
			setProductLoad(true);
			let res = await productService.getProductsInShop(
				token,
				selectedShop?.value
			);
			let arr = res?.rows;
			if (Array.isArray(arr)) {
				let resVal = arr.map((a: any) => {
					return {
						value: a.id,
						label: `${a.summary} - ₦${formatCurrency(a.price)}`,
						name: a.summary,
						price: Number(isWalkIn ? a.price : a.costPrice),
						quantity: 1,
						total: Number(a.price),
						id: a.id,
						sku: a.sku,
					};
				});
				setProductList(resVal);
				setProductLoad(false);
			}
		} catch (err) {
			setProductLoad(false);
		}
	};

	const addItems = (item: any) => {
		if (item?.value) {
			let find = selectedProducts.find((p: any) => p.value == item.value);
			if (!find) {
				let valArr = [...selectedProducts, item];
				setSelectedProducts(valArr);
			} else {
				setSelectedProducts(
					selectedProducts.map((p: any) => {
						if (p.value === item.value) {
							return {
								...p,
								quantity: item.quantity,
								price: item.amount || item.price,
								total:
									item.quantity * (item.amount || item.price),
							};
						} else {
							return p;
						}
					})
				);
			}
		}
	};

	const removeItem = (id: number) => {
		let filter = selectedProducts.filter((p: any) => p.value != id);
		setSelectedProducts(filter);
	};

	const getTotalAmountDue = () => {
		let calcTotal = selectedProducts.reduce(
			(a: any, b: any) => a + b.total,
			0
		);
		setTotalPrice(calcTotal);
	};

	const paymentHandler = async (vals: any) => {
		const data = {
			...vals,
			shopId: details.shopId || selectedShop?.value,
			products: selectedProducts,
			status: "success",
			discount: discountApplied,
			amountExpected: totalPrice - discountApplied,
		};
		try {
			setLoad(true);
			let res = await salesService.makeSale(token, data);
			setLoad(false);
			toast.success("Your Transaction was Successful!");
			if (res) {
				navigate(`/dashboard/sales/${res?.uniqueRef}`);
			} else {
				navigate("/dashboard/sales");
			}
		} catch (err) {
			displayError(err, true);
			setLoad(false);
		}
	};

	return (
		<div>
			<TitleCover
				title={`Sell to ${
					isWalkIn ? "a Walk-in Customer" : "a Subdealer"
				}`}
			/>
			{step === 1 && (
				<div>
					<SaleSelectDiv>
						<div className="info">
							<p>
								Not a {isWalkIn ? "Walk-in" : "Subdealer"}?{" "}
								<button onClick={() => setIsWalkIn(!isWalkIn)}>
									Switch
								</button>{" "}
								to {isWalkIn ? "Subdealer" : "Walk-in"}
							</p>
						</div>
						{details.shopId ? (
							<SaleSelectStyle>
								<p>Selling from</p>
								<div className="shop">{details.shop?.name}</div>
							</SaleSelectStyle>
						) : (
							<SaleSelect
								options={shopList}
								changeSelected={(arg) => setSelectedShop(arg)}
								value={selectedShop}
							/>
						)}
					</SaleSelectDiv>
				</div>
			)}
			<SalesDiv>
				{step === 1 ? (
					<PickItems
						load={productLoad}
						items={productList}
						onNext={() => setStep(2)}
						selectedProducts={selectedProducts}
						setSelectedProducts={addItems}
						remove={removeItem}
						discountValue={discountValue}
						discountPercent={discountPercent}
						changeDiscount={() =>
							setDiscountPercent(!discountPercent)
						}
						changeDiscountValue={(text: any) =>
							setDiscountValue(text)
						}
						discountApplied={discountApplied}
						totalAmount={totalPrice}
					/>
				) : step === 2 ? (
					<CustomerSelect
						type={isWalkIn ? "walkin" : "subdealer"}
						onPrev={() => setStep(1)}
						totalAmount={totalPrice}
						discountApplied={discountApplied}
						complete={(vals: any) => paymentHandler(vals)}
					/>
				) : (
					<>
						<button onClick={() => setStep(1)}>Test</button>
					</>
				)}
			</SalesDiv>
			{load && <LoadModal open={true} />}
		</div>
	);
};

export default NewSale;
