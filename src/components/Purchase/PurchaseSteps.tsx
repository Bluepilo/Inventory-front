import { useState, useEffect } from "react";
import { SaleSelectDiv, SalesDiv } from "../../styles/sale.styles";
import { SaleSelectStyle } from "../../styles/filters.styles";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { OptionProp, SaleSelect } from "../Filters/BasicInputs";
import { useLocation, useNavigate } from "react-router-dom";
import productService from "../../redux/features/product/product-service";
import { formatCurrency } from "../../utils/currency";
import PickItems from "../Sales/PickItems";
import SupplierSelect from "./SupplierSelect";
import purchaseService from "../../redux/features/purchase/purchase-service";
import { toast } from "react-toastify";
import { displayError } from "../../utils/errors";
import { updateOnboardingSteps } from "../../redux/features/basic/basic-slice";
import LoadModal from "../Loaders/LoadModal";
import { LayoutSwitch } from "../../styles/basic.styles";
import { RiTable3 } from "react-icons/ri";
import { BsFillImageFill } from "react-icons/bs";
import PickItemsImage from "../Sales/PickItemsImage";

const PurchaseSteps = ({ onboarding }: { onboarding: boolean }) => {
	const navigate = useNavigate();

	const dispatch = useAppDispatch();

	const cloneState = useLocation()?.state?.cloneState;

	const { details, currency } = useAppSelector((state) => state.auth);
	const { shops } = useAppSelector((state) => state.basic);

	const [step, setStep] = useState(1);
	const [selectedShop, setSelectedShop] = useState<OptionProp | null>(null);
	const [shopList, setShopList] = useState<OptionProp[]>([]);

	const [productLoad, setProductLoad] = useState(false);
	const [productList, setProductList] = useState<any>([]);
	const [selectedProducts, setSelectedProducts] = useState<any>([]);

	const [discountValue, setDiscountValue] = useState(0);
	const [discountPercent, setDiscountPercent] = useState(true);
	const [totalPrice, setTotalPrice] = useState(0);
	const [discountApplied, setDiscountApplied] = useState(0);
	const [load, setLoad] = useState(false);
	const [pictureMode, setPictureMode] = useState(false);

	useEffect(() => {
		window.scrollTo(0, 0);
		filterShops();
	}, []);

	useEffect(() => {
		if (cloneState?.id) {
			let products = cloneState.products.map((p: any) => {
				return {
					name: p.summary,
					quantity: p?.productPurchase?.quantity,
					price: p.costPrice,
					total: p?.productPurchase?.quantity * p.costPrice,
					id: p.id,
					label: `${p.summary} - ₦${formatCurrency(p.costPrice)} (${
						p.totalStock
					})`,
					sku: p.sku,
					value: p.id,
				};
			});
			setSelectedProducts(products);
			setSelectedShop({
				label: cloneState.shop?.name,
				value: cloneState.shop?.id,
			});
		}
	}, [cloneState]);

	useEffect(() => {
		if (selectedProducts.length > 0) {
			getTotalAmountDue();
		}
	}, [selectedProducts]);

	useEffect(() => {
		if (selectedShop?.value) {
			getProducts();
		}
	}, [selectedShop?.value]);

	useEffect(() => {
		if (discountPercent) {
			let p = (Number(discountValue) / 100) * totalPrice;
			setDiscountApplied(p);
		} else {
			setDiscountApplied(Number(discountValue));
		}
	}, [discountValue, totalPrice, discountPercent]);

	const filterShops = () => {
		let filter: OptionProp[];
		if (!details.shopId) {
			filter = shops.filter((s) => s.isActive);
		} else if (details.shopId && details.shop.isActive) {
			filter = shops.filter((s) => s.id != details.shopId);
		} else {
			filter = [];
		}
		setShopList(filter);
		if (filter.length > 0) {
			setSelectedShop(filter[0]);
		}
	};

	const getProducts = async () => {
		try {
			setProductList([]);
			if (!cloneState) {
				setSelectedProducts([]);
			}
			setProductLoad(true);
			let res = await productService.allProducts(
				"?all=true&type=product_only"
			);
			let arr = res?.rows;
			if (Array.isArray(arr)) {
				let resVal = arr.map((a: any) => {
					return {
						value: a.id,
						label: `${a.summary} - ${currency}${formatCurrency(
							a.costPrice
						)} (${a.totalStock})`,
						name: a.summary,
						price: Number(a.costPrice),
						quantity: 1,
						total: Number(a.costPrice),
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
		let data;
		if (onboarding) {
			data = {
				shopId: details.shopId || selectedShop?.value,
				totalPrice,
				totalAmountPaid: totalPrice - discountApplied,
				discount: discountApplied,
				isOnboarding: true,
				productBreakDown: selectedProducts,
				totalNoItems: selectedProducts.reduce(
					(prev: any, curr: any) => prev + curr.quantity,
					0
				),
				status: "success",
				comment: "Imported",
			};
		} else {
			data = {
				...vals,
				shopId: details.shopId || selectedShop?.value,
				totalPrice: totalPrice - discountApplied,
				discount: discountApplied,
				isOnboarding: false,
				productBreakDown: selectedProducts,
				totalNoItems: selectedProducts.reduce(
					(prev: any, curr: any) => prev + curr.quantity,
					0
				),
				status: "success",
			};
		}

		try {
			setLoad(true);
			let res = await purchaseService.makePurchase(data);
			setLoad(false);
			saveTrialPick();
			toast.success("Your Transaction was Successful!");
			if (res?.id) {
				navigate(`/dashboard/purchases/${res?.id}`);
			} else {
				if (onboarding) {
					navigate("/dashboard/business/import-inventory");
				} else {
					navigate("/dashboard/purchases");
				}
			}
		} catch (err) {
			displayError(err, true);
			setLoad(false);
		}
	};

	const saveTrialPick = () => {
		if (details.business.onboardingSteps?.purchase !== "completed") {
			dispatch(
				updateOnboardingSteps({
					steps: {
						...details?.business?.onboardingSteps,
						purchase: "completed",
					},
				})
			);
		}
	};

	return (
		<>
			<LayoutSwitch>
				<div>
					<button
						onClick={() => setPictureMode(false)}
						className={pictureMode ? "" : "active"}
					>
						<RiTable3 />
					</button>
					<button
						onClick={() => setPictureMode(true)}
						className={pictureMode ? "active" : ""}
					>
						<BsFillImageFill />
					</button>
				</div>
			</LayoutSwitch>
			{step === 1 && (
				<div>
					<SaleSelectDiv>
						<div className="info"></div>
						{details.shopId ? (
							<SaleSelectStyle>
								<p>Stocking</p>
								<div className="shop">{details.shop?.name}</div>
							</SaleSelectStyle>
						) : (
							<SaleSelect
								options={shopList}
								changeSelected={(arg) => setSelectedShop(arg)}
								value={selectedShop}
								label="Stocking"
							/>
						)}
					</SaleSelectDiv>
				</div>
			)}
			<SalesDiv>
				{step === 1 ? (
					pictureMode ? (
						<PickItemsImage
							load={productLoad}
							items={productList}
							onNext={() => {
								if (onboarding) {
									if (
										window.confirm(
											"Are you sure you want to proceed with the import?"
										)
									) {
										paymentHandler({});
									}
								} else {
									setStep(2);
								}
							}}
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
					) : (
						<PickItems
							load={productLoad}
							items={productList}
							onNext={() => {
								if (onboarding) {
									if (
										window.confirm(
											"Are you sure you want to proceed with the import?"
										)
									) {
										paymentHandler({});
									}
								} else {
									setStep(2);
								}
							}}
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
					)
				) : step === 2 ? (
					<SupplierSelect
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
		</>
	);
};

export default PurchaseSteps;
