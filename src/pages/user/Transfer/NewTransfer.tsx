import React, { useEffect, useState } from "react";
import {
	ItemListStyle,
	SaleSelectDiv,
	SalesDiv,
} from "../../../styles/sale.styles";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
	DropDownSelect,
	OptionProp,
	SaleSelect,
} from "../../../components/Filters/BasicInputs";
import TitleCover from "../../../components/TitleCover";
import { useLocation, useNavigate } from "react-router-dom";
import productService from "../../../redux/features/product/product-service";
import { formatCurrency } from "../../../utils/currency";
import EachItem from "../../../components/Transfers/EachItem";
import { MainButton } from "../../../styles/links.styles";
import ArrowIcon from "../../../assets/icons/arrow.svg";
import ModalComponent from "../../../components/ModalComponent";
import CommentBox from "../../../components/Sales/CommentBox";
import { toast } from "react-toastify";
import { displayError } from "../../../utils/errors";
import transferService from "../../../redux/features/transfer/transfer-service";
import LoadModal from "../../../components/Loaders/LoadModal";
import { updateOnboardingSteps } from "../../../redux/features/basic/basic-slice";
import LayoutSwitching from "../../../components/LayoutSwitching";
import PickItemsImage from "../../../components/Sales/PickItemsImage";

const NewTransfer = () => {
	const navigate = useNavigate();

	const dispatch = useAppDispatch();

	const cloneState = useLocation()?.state?.cloneState;

	const { details } = useAppSelector((state) => state.auth);
	const { shops, pictureMode } = useAppSelector((state) => state.basic);

	const [shopList, setShopList] = useState<OptionProp[]>([]);
	const [fromShop, setFromShop] = useState<OptionProp | null>(null);
	const [toShop, setToShop] = useState<OptionProp | null>(null);
	const [productList, setProductList] = useState<any>([]);
	const [productLoad, setProductLoad] = useState(false);
	const [productVal, setProductVal] = useState<OptionProp | null>(null);

	const [selectedProducts, setSelectedProducts] = useState<any>([]);
	const [openComment, setOpenComment] = useState(false);
	const [load, setLoad] = useState(false);

	useEffect(() => {
		window.scrollTo(0, 0);
		filterShops();
	}, []);

	useEffect(() => {
		if (fromShop?.value || details.shopId) {
			getProducts();
		}
	}, [fromShop]);

	useEffect(() => {}, []);

	useEffect(() => {
		if (cloneState?.id) {
			let products = cloneState.products.map((a: any) => {
				return {
					value: a.id,
					label: `${a.summary} - ₦${formatCurrency(a.price)} ${
						a.isService ? "" : `(${a.totalStock})`
					}`,
					name: a.summary,
					price: a.price,
					quantity: a.productTransfer?.quantity,
					id: a.id,
					sku: a.sku,
					totalStock: a.totalStock,
				};
			});
			setSelectedProducts(products);
		}
	}, [cloneState]);

	const filterShops = () => {
		if (shops?.length > 0) {
			let filter = shops.filter((s) => s.isActive);
			setShopList(filter);
			if (details.shopId) {
				setFromShop({
					value: details.shopId,
					label: details.shop.name,
				});
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
				fromShop?.value || details.shopId
			);
			let arr = res?.rows?.filter(
				(a: any) => !a.isService && a.totalStock !== 0
			);
			if (Array.isArray(arr)) {
				let resVal = arr.map((a: any) => {
					return {
						value: a.id,
						label: `${a.summary} - ₦${formatCurrency(a.price)} ${
							a.isService ? "" : `(${a.totalStock})`
						}`,
						name: a.summary,
						price: a.price,
						quantity: 1,
						id: a.id,
						sku: a.sku,
						totalStock: a.totalStock,
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

	const transferHandler = async (comment: string) => {
		setOpenComment(false);
		if (fromShop?.value && toShop?.value) {
			if (fromShop?.value === toShop?.value) {
				toast.error(`You can't transfer from the same shop.`);
				return;
			}
			let data = {
				creatorComment: comment,
				fromShopId: fromShop?.value,
				toShopId: toShop?.value,
				productBreakDown: selectedProducts,
			};
			try {
				setLoad(true);
				let res = await transferService.createTransfer(data);
				setLoad(false);
				toast.success(`Products has been transferred.`);
				saveTrialPick();

				if (res?.id) {
					navigate(`/dashboard/transfers/${res.id}`);
				} else {
					navigate("/dashboard/transfers");
				}
			} catch (err) {
				setLoad(false);
				displayError(err, true);
			}
		} else {
			alert("Please Select shop you are transferring to.");
		}
	};

	const saveTrialPick = () => {
		if (details.business.onboardingSteps?.transfer !== "completed") {
			dispatch(
				updateOnboardingSteps({
					steps: {
						...details?.business?.onboardingSteps,
						transfer: "completed",
					},
				})
			);
		}
	};

	return (
		<div>
			<TitleCover
				title={"Make a Transfer"}
				switching={<LayoutSwitching />}
			/>
			<SaleSelectDiv>
				<div className="info"></div>
				<div className="a-flex">
					<SaleSelect
						options={shopList}
						changeSelected={(arg) => setFromShop(arg)}
						value={fromShop}
						label="From"
					/>

					<div className="mb">
						<SaleSelect
							options={shopList}
							changeSelected={(arg) => setToShop(arg)}
							value={toShop}
							label="To"
						/>
					</div>
				</div>
			</SaleSelectDiv>
			{pictureMode ? (
				<div className="mt-4">
					<PickItemsImage
						load={productLoad}
						items={productList}
						onNext={() => {
							setOpenComment(true);
						}}
						selectedProducts={selectedProducts}
						setSelectedProducts={addItems}
						remove={removeItem}
						discountValue={0}
						discountPercent={false}
						changeDiscount={() => console.log("")}
						changeDiscountValue={(text: any) => console.log("")}
						discountApplied={0}
						totalAmount={0}
						transfer={true}
					/>
				</div>
			) : (
				<SalesDiv>
					{selectedProducts?.length > 0 && (
						<>
							<div className="item-title">
								<p>Items</p>
								<span>{selectedProducts.length}</span>
							</div>
							<ItemListStyle className="table-responsive">
								<div className="head head-sm">
									<div className="name">Product</div>
									<div className="qty">Quantity</div>
									<div className="cancel"></div>
								</div>
								<div className="body">
									{selectedProducts.map((s: any) => (
										<EachItem
											key={s.value}
											s={s}
											changeQty={(item: number) =>
												addItems(item)
											}
											remove={removeItem}
										/>
									))}
								</div>
							</ItemListStyle>
						</>
					)}
					<DropDownSelect
						options={productList}
						changeSelected={(arg) => {
							setProductVal(arg);
							addItems(arg);
						}}
						label="Search Item, Price or Brand"
						loading={productLoad}
						value={productVal}
					/>
					{selectedProducts.length > 0 && (
						<div className="submit mt-5 text-center">
							<MainButton
								right="true"
								onClick={() => {
									if (selectedProducts.length > 0) {
										setOpenComment(true);
									}
								}}
							>
								<span>Transfer Products</span>
								<img src={ArrowIcon} />
							</MainButton>
						</div>
					)}
				</SalesDiv>
			)}
			<ModalComponent
				open={openComment}
				close={() => setOpenComment(false)}
			>
				<CommentBox submit={(arg: string) => transferHandler(arg)} />
			</ModalComponent>
			{load && <LoadModal open={true} />}
		</div>
	);
};

export default NewTransfer;
