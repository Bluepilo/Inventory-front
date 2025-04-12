import { useEffect, useState } from "react";
import TitleCover from "../../../components/TitleCover";
import { useAppSelector } from "../../../redux/hooks";
import NewPage from "../../../components/NewPage";
import CoverImg from "../../../assets/defaults/catalogue.png";
import { useNavigate } from "react-router-dom";
import { SaleSelectDiv } from "../../../styles/sale.styles";
import { SaleSelectStyle } from "../../../styles/filters.styles";
import {
	OptionProp,
	SaleSelect,
} from "../../../components/Filters/BasicInputs";
import productService from "../../../redux/features/product/product-service";
import { Table, TableComponent } from "../../../styles/table.styles";
import SkeletonTable from "../../../components/Loaders/SkeletonTable";
import { formatCurrency } from "../../../utils/currency";
import { MainButton } from "../../../styles/links.styles";
import { Flex } from "../../../styles/basic.styles";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { FaCircleInfo } from "react-icons/fa6";
import { displayError } from "../../../utils/errors";
import ConfirmModal from "../../../components/Modals/ConfirmModal";
import { toast } from "react-toastify";

const Services = () => {
	const { details, currency } = useAppSelector((state) => state.auth);
	const { shops } = useAppSelector((state) => state.basic);

	const navigate = useNavigate();

	const [selectedShop, setSelectedShop] = useState<OptionProp | null>(null);
	const [shopList, setShopList] = useState<OptionProp[]>([]);

	const [productLoad, setProductLoad] = useState(false);
	const [productList, setProductList] = useState<any>([]);
	const [productListShop, setProductListShop] = useState<any>([]);

	const [removed, setRemoved] = useState<any>([]);
	const [showBtn, setShowBtn] = useState(false);
	const [openConfirm, setOpenConfirm] = useState(false);

	useEffect(() => {
		window.scrollTo(0, 0);
		filterShops();
	}, []);

	useEffect(() => {
		if (selectedShop?.value) {
			getProducts();
		}
	}, [selectedShop]);

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
			setProductLoad(true);
			let res = await productService.allProducts(
				`?all=true&type=service_only`
			);
			let resShop = await productService.allProducts(
				`?all=true&type=service_only&shopId=${selectedShop?.value}`
			);
			setProductLoad(false);
			setProductList(res?.rows);
			setProductListShop(
				resShop?.rows?.map((p: any) => {
					return p.id;
				})
			);
		} catch (err) {
			setProductLoad(false);
		}
	};

	const checkIfChecked = (id: number) => {
		let find = productListShop?.find((p: any) => p == id);
		return find ? true : false;
	};

	const addOrRemove = (check: boolean, id: number) => {
		setShowBtn(true);
		if (check) {
			setProductListShop([...productListShop, id]);
			setRemoved(removed.filter((r: any) => r != id));
		} else {
			setProductListShop(productListShop.filter((p: any) => p != id));
			setRemoved([...removed, id]);
		}
	};

	const addAll = (check: boolean) => {
		setShowBtn(true);
		if (check) {
			setProductListShop(
				productList?.map((p: any) => {
					return p.id;
				})
			);
			setRemoved([]);
		} else {
			setRemoved(
				productList?.map((p: any) => {
					return p.id;
				})
			);
			setProductListShop([]);
		}
	};

	const updateHandler = async () => {
		try {
			setProductLoad(true);
			await productService.addServices(selectedShop?.value, {
				productIds: productListShop,
			});
			await productService.removeServices(selectedShop?.value, {
				productIds: removed,
			});
			toast.success("Service list has been updated successfully");
			setProductLoad(false);
		} catch (err) {
			setProductLoad(false);
			displayError(err, true);
		}
	};

	return (
		<>
			{details.business.onboardingSteps?.product === "completed" ? (
				<>
					<TitleCover title={`Manage Services`} />
					<SaleSelectDiv>
						<div />
						{details.shopId ? (
							<SaleSelectStyle>
								<p>Shop:</p>
								<div className="shop">{details.shop?.name}</div>
							</SaleSelectStyle>
						) : (
							<SaleSelect
								options={shopList}
								changeSelected={(arg) => setSelectedShop(arg)}
								value={selectedShop}
								label="Shop:"
							/>
						)}
					</SaleSelectDiv>
					<div className="mt-4">
						<Flex className="mb-3">
							{showBtn && (
								<MainButton
									className="me-4"
									onClick={() => setOpenConfirm(true)}
								>
									Update Services
								</MainButton>
							)}
							<OverlayTrigger
								delay={{ hide: 450, show: 300 }}
								overlay={(props) => (
									<Tooltip {...props}>
										Check to add Services to shop. Uncheck
										to remove them.
									</Tooltip>
								)}
								placement="right-end"
							>
								<button
									style={{
										border: 0,
										outline: 0,
										background: "none",
									}}
								>
									<FaCircleInfo size={25} color="#0241FF" />
								</button>
							</OverlayTrigger>
						</Flex>
						<TableComponent>
							<div className="table-responsive">
								<Table className="table">
									<thead>
										<tr>
											<th>Service</th>
											<th className="price">Amount</th>
											<th>
												<input
													type="checkbox"
													onChange={(e) =>
														addAll(e.target.checked)
													}
												/>
											</th>
										</tr>
									</thead>
									{!productLoad && (
										<tbody>
											{productList?.map((p: any) => (
												<tr key={p.id}>
													<td>{p.summary}</td>
													<td className="price">
														{currency}{" "}
														{formatCurrency(
															p.price
														)}
													</td>
													<td>
														<input
															type="checkbox"
															checked={checkIfChecked(
																p.id
															)}
															onChange={(e) =>
																addOrRemove(
																	e.target
																		.checked,
																	p.id
																)
															}
														/>
													</td>
												</tr>
											))}
										</tbody>
									)}
								</Table>
							</div>
							{productLoad && <SkeletonTable />}
						</TableComponent>
					</div>
					<ConfirmModal
						open={openConfirm}
						close={() => setOpenConfirm(false)}
						confirm={() => {
							setOpenConfirm(false);
							updateHandler();
						}}
					/>
				</>
			) : (
				<NewPage
					title={"Service"}
					img={CoverImg}
					cover="Service"
					desc={`Easily attach and detach your product services to business location`}
					btnTitle={"Add Service"}
					linkTo={() => navigate("/dashboard/catalogue")}
				/>
			)}
		</>
	);
};

export default Services;
