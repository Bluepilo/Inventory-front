import { useEffect, useState } from "react";
import TitleCover from "../../../components/TitleCover";
import { SaleSelectDiv, SalesDiv } from "../../../styles/sale.styles";
import {
	OptionProp,
	SaleSelect,
} from "../../../components/Filters/BasicInputs";
import { SaleSelectStyle } from "../../../styles/filters.styles";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import PickItems from "../../../components/Sales/PickItems";
import productService from "../../../redux/features/product/product-service";
import { formatCurrency } from "../../../utils/currency";
import CustomerSelect from "../../../components/Sales/CustomerSelect";
import LoadModal from "../../../components/Loaders/LoadModal";
import { displayError } from "../../../utils/errors";
import salesService from "../../../redux/features/sales/sales-service";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { updateOnboardingSteps } from "../../../redux/features/basic/basic-slice";

const NewSale = () => {
	const navigate = useNavigate();

	const dispatch = useAppDispatch();

	const cloneState = useLocation()?.state?.cloneState;

	const { details, currency } = useAppSelector((state) => state.auth);
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
		window.scrollTo(0, 0);
		filterShops();
	}, []);

	useEffect(() => {
		if (cloneState?.id) {
			if (cloneState?.subdealerId) {
				setIsWalkIn(false);
			}
			let products = JSON.parse(cloneState.productPurchasedPayload);
			setSelectedProducts(products);
			setSelectedShop({
				label: cloneState.shop?.name,
				value: cloneState.shop?.id,
			});
		}
	}, [cloneState]);

	useEffect(() => {
		if (selectedShop?.value) {
			getProducts();
		}
	}, [selectedShop, isWalkIn]);

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
			if (!cloneState) {
				setSelectedProducts([]);
			}
			setProductLoad(true);
			let res = await productService.getProductsInShop(
				details?.shopId || selectedShop?.value
			);
			let arr = res?.rows?.filter(
				(a: any) => (!a.isService && a.totalStock !== 0) || a.isService
			);
			if (Array.isArray(arr)) {
				let resVal = arr.map((a: any) => {
					return {
						value: a.id,
						label: `${a.summary} - ${currency}${formatCurrency(
							isWalkIn ? a.price : a.costPrice
						)} ${a.isService ? "" : `(${a.totalStock})`}`,
						name: a.summary,
						price: Number(isWalkIn ? a.price : a.costPrice),
						quantity: 1,
						total: Number(isWalkIn ? a.price : a.costPrice),
						id: a.id,
						sku: a.sku,
						isService: a.isService,
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
			let res = await salesService.makeSale(data);
			setLoad(false);
			saveTrialPick();
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

	const saveTrialPick = () => {
		if (details.business.onboardingSteps?.sales !== "completed") {
			dispatch(
				updateOnboardingSteps({
					steps: {
						...details?.business?.onboardingSteps,
						sales: "completed",
					},
				})
			);
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
								label="Selling from"
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
					<></>
				)}
			</SalesDiv>
			{load && <LoadModal open={true} />}
		</div>
	);
};

export default NewSale;
