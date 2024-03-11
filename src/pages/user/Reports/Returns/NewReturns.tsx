import { useEffect, useState } from "react";
import TitleCover from "../../../../components/TitleCover";
import { SwitchDiv } from "../../../../styles/basic.styles";
import { Form, FormBody } from "../../../../styles/form.styles";
import {
	DropDownSelect,
	OptionProp,
} from "../../../../components/Filters/BasicInputs";
import CurrencyInput from "react-currency-input-field";
import customerService from "../../../../redux/features/customer/customer-services";
import { useAppSelector } from "../../../../redux/hooks";
import productService from "../../../../redux/features/product/product-service";
import { MainButton } from "../../../../styles/links.styles";
import { displayError } from "../../../../utils/errors";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import LoadModal from "../../../../components/Loaders/LoadModal";

const NewReturns = () => {
	const navigate = useNavigate();

	const { token, details } = useAppSelector((state) => state.auth);
	const { shops } = useAppSelector((state) => state.basic);

	const [user, setUser] = useState("walk-in");

	const [customerId, setCustomerId] = useState<OptionProp | null>(null);
	const [shopId, setShopId] = useState<OptionProp | null>(null);
	const [productId, setProductId] = useState<OptionProp | null>(null);
	const [reasonId, setReasonId] = useState<OptionProp | null>(null);
	const [value, setValue] = useState(0);
	const [quantity, setQuantity] = useState("");
	const [ref, setRef] = useState("");
	const [load, setLoad] = useState(false);

	const [walkins, setWalkins] = useState<OptionProp[]>([]);
	const [subdealers, setSubdealers] = useState<OptionProp[]>([]);
	const [suppliers, setSuppliers] = useState<OptionProp[]>([]);
	const [shopList, setShopList] = useState<OptionProp[]>([]);
	const [productList, setProductList] = useState<OptionProp[]>([]);
	const [prodPrice, setProdPrice] = useState(0);

	useEffect(() => {
		window.scrollTo(0, 0);
		getWalkIns();
		getSubdealers();
		getSuppliers();
		filterShops();
	}, []);

	useEffect(() => {
		if (shopId?.value) {
			getProducts();
		}
	}, [shopId]);

	useEffect(() => {
		if (productId?.value) {
			let find: any = productList?.find(
				(p: any) => p.value == productId?.value
			);
			setProdPrice(find?.price || 0);
			setValue(find?.price || 0);
		}
	}, [productId]);

	useEffect(() => {
		if (quantity) {
			setValue(Number(quantity) * prodPrice);
		}
	}, [quantity]);

	const getWalkIns = async () => {
		try {
			let res = await customerService.getWalkIns(
				token,
				`?page=1&limit=100`
			);
			let arr = res?.rows.map((a: any) => {
				return { label: a.fullName, value: a.id };
			});
			setWalkins(arr || []);
		} catch (err) {}
	};

	const getSubdealers = async () => {
		try {
			let res = await customerService.getSubdealers(
				token,
				`?page=1&limit=100`
			);
			let arr = res?.rows.map((a: any) => {
				return { label: a.fullName, value: a.id };
			});
			setSubdealers(arr || []);
		} catch (err) {}
	};

	const getSuppliers = async () => {
		try {
			let res = await customerService.getSuppliers(
				token,
				`?page=1&limit=100`
			);
			let arr = res?.rows.map((a: any) => {
				return { label: a.fullName, value: a.id };
			});
			setSuppliers(arr || []);
		} catch (err) {}
	};

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
	};

	const getProducts = async () => {
		try {
			let res = await productService.getProductsInShop(
				token,
				shopId?.value
			);
			let arr = res?.rows.map((a: any) => {
				return { ...a, label: a.summary, value: a.id };
			});
			setProductList(arr || []);
		} catch (err) {}
	};

	const submitHandler = async (e: any) => {
		e.preventDefault();
		if (shopId?.value && productId?.value && quantity && reasonId?.value) {
			try {
				let data = {
					shopId: shopId.value,
					productId: productId.value,
					quantity,
					reason: reasonId.value,
					totalValue: value,
					customerId: user === "walk-in" ? customerId?.value : "",
					supplierId: user === "supplier" ? customerId?.value : "",
					subdealerId: user === "subdealer" ? customerId?.value : "",
					salesRef: user !== "supplier" ? ref : "",
					puchaseRef: user === "supplier" ? ref : "",
				};
				setLoad(true);
				let res = await productService.returnProduct(token, data);
				if (res) {
					toast.success("Return has been logged.");
					navigate("/dashboard/reports/returns");
				}
			} catch (err) {
				setLoad(false);
				displayError(err, true);
			}
		} else {
			alert("Some fields are missing to submit your request.");
		}
	};

	return (
		<div>
			<TitleCover title="Log Return" />
			<SwitchDiv>
				<div
					className={user === "walk-in" ? "active" : ""}
					onClick={() => setUser("walk-in")}
				>
					Walk-In
				</div>
				<div
					className={user === "subdealer" ? "active" : ""}
					onClick={() => setUser("subdealer")}
				>
					Subdelaer
				</div>
				<div
					className={user === "supplier" ? "active" : ""}
					onClick={() => setUser("supplier")}
				>
					Supplier
				</div>
			</SwitchDiv>
			<div className="row mt-5">
				<div className="col-lg-6">
					<FormBody>
						<Form onSubmit={submitHandler}>
							<div className="mb-4">
								<label style={{ textTransform: "capitalize" }}>
									Select {user}
								</label>
								<DropDownSelect
									value={customerId}
									options={
										user === "walk-in"
											? walkins
											: user === "subdealer"
											? subdealers
											: suppliers
									}
									changeSelected={setCustomerId}
								/>
							</div>
							<div className="mb-4">
								<label>Select Shop</label>
								<DropDownSelect
									value={shopId}
									options={shopList}
									changeSelected={setShopId}
								/>
							</div>
							<div className="mb-4">
								<label>Select Product</label>
								<DropDownSelect
									value={productId}
									options={productList}
									changeSelected={setProductId}
								/>
							</div>
							<div className="row">
								<div className="col-sm-6">
									<label>Quantity</label>
									<input
										type="number"
										value={quantity}
										onChange={(e) =>
											setQuantity(e.target.value)
										}
										required
									/>
								</div>
								<div className="col-sm-6">
									<label>Total Value</label>
									<CurrencyInput
										id="input-example"
										name="input-name"
										decimalsLimit={2}
										onValueChange={(values) => {
											setValue(Number(values));
										}}
										prefix={"₦ "}
										value={value}
										disabled={load}
									/>
								</div>
							</div>
							<div className="row">
								<div className="col-sm-6">
									<label>
										{user === "supplier"
											? "Purchase"
											: "Sales"}{" "}
										Reference
									</label>
									<input
										value={ref}
										onChange={(e) => setRef(e.target.value)}
										type="text"
									/>
								</div>
								<div className="col-sm-6">
									<label>Select Reason</label>
									<DropDownSelect
										value={reasonId}
										options={[
											{
												label: "Swap Out",
												value: "Swap Out",
											},
											{
												label: "Damaged",
												value: "Damage",
											},
											{
												label: "Repair",
												value: "Repair",
											},
											{
												label: "Quality Issues",
												value: "Quality Issues",
											},
											{
												label: "Others",
												value: "Others",
											},
										]}
										changeSelected={setReasonId}
									/>
								</div>
							</div>
							<div className="text-center mt-3">
								<MainButton type="submit">
									<span>Log Return</span>
								</MainButton>
							</div>
						</Form>
					</FormBody>
				</div>
			</div>
			{load && <LoadModal open={true} />}
		</div>
	);
};

export default NewReturns;
