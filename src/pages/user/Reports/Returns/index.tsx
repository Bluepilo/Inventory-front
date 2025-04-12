import { useEffect, useState } from "react";
import TitleCover from "../../../../components/TitleCover";
import Filters from "../../../../components/Filters";
import { OptionProp } from "../../../../components/Filters/BasicInputs";
import { Link, useNavigate } from "react-router-dom";
import { IoCartSharp } from "react-icons/io5";
import { Table, TableComponent } from "../../../../styles/table.styles";
import SkeletonTable from "../../../../components/Loaders/SkeletonTable";
import productService from "../../../../redux/features/product/product-service";
import { useAppSelector } from "../../../../redux/hooks";
import dateFormat from "dateformat";
import { formatCurrency } from "../../../../utils/currency";
import SuccessIcon from "../../../../assets/icons/success.svg";
import PendingIcon from "../../../../assets/icons/pending.svg";
import RestockedIcon from "../../../../assets/icons/restocked.svg";
import Paginate from "../../../../components/Paginate";
import { haveRole } from "../../../../utils/role";

const Returns = () => {
	const navigate = useNavigate();

	const { details, currency } = useAppSelector((state) => state.auth);

	const [lists, setLists] = useState<any>({});

	const [shopId, setShopId] = useState<OptionProp | null>(null);
	const [staffId, setStaffId] = useState<OptionProp | null>(null);
	const [startDate, setStartDate] = useState(
		new Date(new Date().getFullYear(), new Date().getMonth(), 1)
	);
	const [endDate, setEndDate] = useState(
		new Date(new Date().setDate(new Date().getDate() + 1))
	);
	const [productId, setProductId] = useState<OptionProp | null>(null);
	const [productList, setProductList] = useState<OptionProp[]>([]);
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(20);
	const [load, setLoad] = useState(false);
	const [dateType, setDateType] = useState({
		label: "This Month",
		value: "month",
	});

	const clearFilters = () => {
		setProductId(null);
		setStaffId(null);
		setShopId(null);
		setStartDate(
			new Date(new Date().getFullYear(), new Date().getMonth(), 1)
		);
		setEndDate(new Date(new Date().setDate(new Date().getDate() + 1)));
		setDateType({ label: "This Month", value: "month" });
	};

	let filters = `?limit=${limit}&page=${page}&startDate=${startDate}&endDate=${endDate}&userId=${
		staffId?.value || ""
	}&shopId=${shopId?.value || ""}&productId=${productId?.value || ""}`;

	useEffect(() => {
		window.scrollTo(0, 0);
		getReports();
	}, [filters]);

	useEffect(() => {
		getProducts();
	}, []);

	const getReports = async () => {
		try {
			setLoad(true);
			let res = await productService.getProductReturns(filters);
			setLoad(false);
			setLists(res);
		} catch (err) {
			setLoad(false);
		}
	};

	const getProducts = async () => {
		try {
			let res = await productService.allProducts("?all=true");
			let arr = res?.rows.map((a: any) => {
				return { ...a, label: a.summary, value: a.id };
			});
			setProductList(arr || []);
		} catch (err) {}
	};

	return (
		<div>
			<TitleCover
				title="Product Returns"
				dataCount={lists?.count}
				button={
					haveRole(details.businessRoleId).isBusinessActioners
						? "Log Return"
						: ""
				}
				buttonIcon={<IoCartSharp />}
				buttonClick={() => navigate("new")}
			/>
			<Filters
				shopId={shopId}
				changeShopId={setShopId}
				startDate={startDate}
				changeStartDate={setStartDate}
				endDate={endDate}
				changeEndDate={setEndDate}
				clearValues={clearFilters}
				staffId={staffId}
				changeStaffId={setStaffId}
				others={productId}
				changeOthers={setProductId}
				othersLabel="Product"
				othersList={productList}
				dateType={dateType}
				changeDateType={setDateType}
			/>
			<div className="mt-4">
				<TableComponent>
					<div className="table-responsive">
						<Table className="table">
							<thead>
								<tr>
									<th>Date</th>
									<th>Product</th>
									<th>Customer</th>
									<th>Customer Type</th>
									<th>Staff</th>
									<th>Shop</th>
									<th>Units</th>
									<th className="price">Price</th>
									<th>Status</th>
									<th></th>
								</tr>
							</thead>
							{!load && (
								<tbody>
									{lists?.rows?.map((l: any) => (
										<tr key={l.id}>
											<td>
												{dateFormat(
													l.createdAt,
													"mmm dd, yyyy"
												)}
											</td>
											<td>{l.product?.summary}</td>

											<td>
												{l.subdealerId
													? l.subdealer?.fullName
													: l.supplierId
													? l.supplier?.fullName
													: l.customer?.fullName}
											</td>
											<td>
												{l.subdealerId
													? "Subdealer"
													: l.supplierId
													? "Supplier"
													: "Walk-In"}
											</td>
											<td>{l.createdByUser?.fullName}</td>
											<td>{l.shop?.name}</td>
											<td>{l.quantity}</td>
											<td className="price">
												{currency}{" "}
												{formatCurrency(l.totalValue)}
											</td>
											<td className="status">
												<img
													src={
														l.status.toLowerCase() ===
														"resolved"
															? SuccessIcon
															: l.status.toLowerCase() ===
															  "pending"
															? PendingIcon
															: RestockedIcon
													}
												/>
												<span>{l.status}</span>
											</td>
											<td className="link">
												<Link to={`${l.id}`}>
													Details
												</Link>
											</td>
										</tr>
									))}
								</tbody>
							)}
						</Table>
					</div>
					{load && <SkeletonTable />}
				</TableComponent>
				{!load && lists?.count ? (
					<Paginate
						changeLimit={(l) => setLimit(Number(l))}
						limit={lists.limit}
						count={lists.count}
						pageNumber={page}
						onPrev={(n) => setPage(n)}
						onNext={(n) => setPage(n)}
					/>
				) : (
					<></>
				)}
			</div>
		</div>
	);
};

export default Returns;
