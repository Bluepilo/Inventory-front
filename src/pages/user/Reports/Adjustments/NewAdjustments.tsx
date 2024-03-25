import React, { useEffect, useState } from "react";
import TitleCover from "../../../../components/TitleCover";
import { Form, FormBody } from "../../../../styles/form.styles";
import {
	DropDownSelect,
	OptionProp,
} from "../../../../components/Filters/BasicInputs";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../../redux/hooks";
import productService from "../../../../redux/features/product/product-service";
import { MainButton } from "../../../../styles/links.styles";
import { toast } from "react-toastify";
import { displayError } from "../../../../utils/errors";
import LoadModal from "../../../../components/Loaders/LoadModal";
import ModalComponent from "../../../../components/ModalComponent";
import { Flex, FlexCenter } from "../../../../styles/basic.styles";

const NewAdjustments = () => {
	const navigate = useNavigate();

	const { token, details } = useAppSelector((state) => state.auth);
	const { shops } = useAppSelector((state) => state.basic);

	const [shopId, setShopId] = useState<OptionProp | null>(null);
	const [shopList, setShopList] = useState<OptionProp[]>([]);
	const [productId, setProductId] = useState<OptionProp | null>(null);
	const [productList, setProductList] = useState<OptionProp[]>([]);
	const [quantity, setQuantity] = useState("");
	const [reasonId, setReasonId] = useState<OptionProp | null>(null);
	const [comment, setComment] = useState("");
	const [openPassword, setOpenPassword] = useState(false);
	const [password, setPassword] = useState("");
	const [load, setLoad] = useState(false);
	const [type, setType] = useState("");

	useEffect(() => {
		window.scrollTo(0, 0);
		filterShops();
	}, []);

	useEffect(() => {
		if (shopId?.value) {
			getProducts();
		}
	}, [shopId]);

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
			setOpenPassword(true);
		} else {
			alert("Some fields are missing to submit your request.");
		}
	};

	const adjustHandler = async () => {
		setOpenPassword(false);

		try {
			setLoad(true);
			let data = {
				password,
				productId,
				quantity,
				reason: reasonId,
				shopId,
				type,
				comment,
			};
			let res = await productService.adjustStock(token, data);
			setLoad(false);
			if (res) {
				toast.success("Stock Adjusted");
				navigate("/dashboard/reports/adjustments");
			}
		} catch (err) {
			setLoad(false);
			displayError(err, true);
		}
	};

	return (
		<div>
			<TitleCover title="Adjust Stock" />
			<div className="row mt-5">
				<div className="col-lg-6">
					<FormBody>
						<Form onSubmit={submitHandler}>
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
										className="height"
									/>
								</div>
								<div className="col-sm-6">
									<label>Select Reason</label>
									<DropDownSelect
										value={reasonId}
										options={[
											{
												label: "Reconciliation",
												value: "Reconciliation",
											},
											{
												label: "Damaged",
												value: "Damage",
											},
											{
												label: "Gift",
												value: "Gift",
											},
											{
												label: "Quality Issues",
												value: "Quality Issues",
											},
											{
												label: "Stolen",
												value: "Stolen",
											},
											{
												label: "Public Relation",
												value: "Public Relation",
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
							<div>
								<label>Additional Notes</label>
								<textarea
									value={comment}
									onChange={(e) => setComment(e.target.value)}
								/>
							</div>
							<div className="text-center mt-3">
								<FlexCenter>
									<MainButton
										type="submit"
										className="me-3"
										bg="#F44336"
										onClick={() => setType("remove")}
									>
										<span>Remove From Stock</span>
									</MainButton>
									<MainButton
										type="submit"
										className="ms-3"
										onClick={() => setType("add")}
									>
										<span>Add To Stock</span>
									</MainButton>
								</FlexCenter>
							</div>
						</Form>
					</FormBody>
				</div>
			</div>
			<ModalComponent
				open={openPassword}
				close={() => setOpenPassword(false)}
				title={type === "add" ? "Add to Stock" : "Remove from Stock"}
			>
				<Form onSubmit={adjustHandler}>
					<label>Enter Password</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						className="height"
					/>
					<div className="text-center">
						<MainButton type="submit">
							<span>Submit</span>
						</MainButton>
					</div>
				</Form>
			</ModalComponent>
			{load && <LoadModal open={true} />}
		</div>
	);
};

export default NewAdjustments;
