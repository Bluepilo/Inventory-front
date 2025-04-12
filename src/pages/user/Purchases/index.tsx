import { useState, useEffect } from "react";
import NewPage from "../../../components/NewPage";
import CoverImg from "../../../assets/defaults/purchase.png";
import { useAppSelector } from "../../../redux/hooks";
import { Link, useNavigate } from "react-router-dom";
import TitleCover from "../../../components/TitleCover";
import { IoCartSharp } from "react-icons/io5";
import Filters from "../../../components/Filters";
import { OptionProp } from "../../../components/Filters/BasicInputs";
import { UseDebounce } from "../../../utils/hooks";
import purchaseService from "../../../redux/features/purchase/purchase-service";
import { formatCurrency } from "../../../utils/currency";
import { CheckBoxPrint, SummaryCard } from "../../../styles/dashboard.styles";
import { Table, TableComponent } from "../../../styles/table.styles";
import dateFormat from "dateformat";
import SuccessIcon from "../../../assets/icons/success.svg";
import FailedIcon from "../../../assets/icons/failed.svg";
import PendingIcon from "../../../assets/icons/pending.svg";
import SkeletonTable from "../../../components/Loaders/SkeletonTable";
import Paginate from "../../../components/Paginate";
import { haveRole } from "../../../utils/role";
import customerService from "../../../redux/features/customer/customer-services";
import { displayError } from "../../../utils/errors";

const Purchases = () => {
	const navigate = useNavigate();

	const { details, currency } = useAppSelector((state) => state.auth);

	const [lists, setLists] = useState<any>({});
	const [incompleteLists, setIncompleteLists] = useState<any>({});
	const [startDate, setStartDate] = useState(
		new Date(new Date().getFullYear(), new Date().getMonth(), 1)
	);
	const [endDate, setEndDate] = useState(
		new Date(new Date().setDate(new Date().getDate() + 1))
	);
	const [shopId, setShopId] = useState<OptionProp | null>(null);
	const [staffId, setStaffId] = useState<OptionProp | null>(null);
	const [supplierId, setSupplierId] = useState<OptionProp | null>(null);
	const [search, setSearch] = useState("");
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(20);
	const [withdrawn, setWithdrawn] = useState(false);
	const [summary, setSummary] = useState<any>({});
	const [load, setLoad] = useState(false);
	const [incomplete, setIncomplete] = useState(false);
	const [dateType, setDateType] = useState({
		label: "This Month",
		value: "month",
	});
	const [allSuppliers, setAllSuppliers] = useState([]);

	const debouncedSearch = UseDebounce(search);

	let filters = `?page=${page}&limit=${limit}&shopId=${
		shopId?.value || ""
	}&userId=${
		staffId?.value || ""
	}&startDate=${startDate}&endDate=${endDate}&includeWithdrawn=${
		withdrawn ? "1" : "0"
	}&onboarding=0&supplierId=${
		supplierId?.value || ""
	}&search=${debouncedSearch}`;

	useEffect(() => {
		window.scrollTo(0, 0);
		getPurchases();
		getSummary();
	}, [filters]);

	useEffect(() => {
		listSuppliers();
	}, []);

	const listSuppliers = async () => {
		try {
			setLoad(true);
			let res = await customerService.getSuppliers(`?limit=150`);
			setLoad(false);
			if (res?.rows) {
				setAllSuppliers(
					res.rows.map((r: any) => {
						return { label: r.fullName, value: r.id };
					})
				);
			}
		} catch (err) {
			setLoad(false);
		}
	};

	const clearFilters = () => {
		setStartDate(
			new Date(new Date().getFullYear(), new Date().getMonth(), 1)
		);
		setEndDate(new Date(new Date().setDate(new Date().getDate() + 1)));
		setStaffId(null);
		setShopId(null);
		setDateType({ label: "This Month", value: "month" });
		setSupplierId(null);
	};

	const getPurchases = async () => {
		try {
			setLoad(true);
			let res = await purchaseService.getPurchase(filters);
			setLoad(false);
			setLists(res);
			let filter = res.rows?.filter(
				(f: any) => f.totalSupplied < f.totalNoItems
			);
			setIncompleteLists({ ...res, rows: filter });
		} catch (err) {
			setLoad(false);
			displayError(err, false);
		}
	};

	const getSummary = async () => {
		try {
			let res = await purchaseService.getPurchaseSummary(filters);
			setSummary(res);
		} catch (err) {}
	};

	const searchPurchase = async () => {
		try {
			setLoad(true);
			let res = await purchaseService.searchPurchase(
				debouncedSearch,
				filters
			);
			setLoad(false);

			setLists(res);
			let filter = res.rows?.filter(
				(f: any) => f.totalSupplied < f.totalNoItems
			);
			setIncompleteLists({ ...res, rows: filter });
		} catch (err) {
			setLoad(false);
		}
	};

	const arrToShow = () => {
		if (incomplete) {
			return incompleteLists;
		} else {
			return lists;
		}
	};

	return details.business.onboardingSteps?.purchase === "completed" ||
		details.currentBusinessAccess.makePurchase ? (
		<div>
			<TitleCover
				title="Purchase Records"
				dataCount={lists?.count}
				button={
					haveRole(details.businessRoleId).isBusinessAdminActioners ||
					details.currentBusinessAccess.makePurchase
						? "Make Purchase"
						: ""
				}
				buttonIcon={<IoCartSharp />}
				buttonClick={() => navigate("new")}
			/>
			<div>
				<Filters
					startDate={startDate}
					changeStartDate={setStartDate}
					endDate={endDate}
					changeEndDate={setEndDate}
					shopId={shopId}
					staffId={staffId}
					changeShopId={setShopId}
					changeStaffId={setStaffId}
					isSearchable={true}
					searchVal={search}
					changeSearchVal={setSearch}
					clearValues={clearFilters}
					dateType={dateType}
					changeDateType={setDateType}
					others={supplierId}
					othersList={allSuppliers}
					changeOthers={setSupplierId}
					othersLabel="Supplier"
				/>
				<div className="row align-items-center mt-4">
					<div className="col-lg-7 mb-3">
						<SummaryCard>
							<div>
								<h6>Total Purchases: </h6>
								<h6>
									{summary?.totalPrice
										? `${currency} ${formatCurrency(
												summary.totalPrice
										  )}`
										: "--"}
								</h6>
							</div>
							<div>
								<h6>Total Amount Paid: </h6>
								<h6>
									{summary?.totalAmountPaid
										? `${currency} ${formatCurrency(
												summary.totalAmountPaid
										  )}`
										: "--"}
								</h6>
							</div>
						</SummaryCard>
					</div>
					<div className="col-lg-5 mb-3">
						<CheckBoxPrint>
							<div>
								<div className="checks">
									<input
										type="checkbox"
										checked={withdrawn}
										onChange={(e) =>
											setWithdrawn(e.target.checked)
										}
										name="withdrawn"
									/>
									<label htmlFor="withdrawn">
										Withdrawn Purchases
									</label>
								</div>
								<div className="checks">
									<input
										type="checkbox"
										checked={incomplete}
										onChange={(e) =>
											setIncomplete(e.target.checked)
										}
										name="withdrawn"
									/>
									<label htmlFor="withdrawn">
										Incomplete Supplies
									</label>
								</div>
							</div>
						</CheckBoxPrint>
					</div>
				</div>
				<div className="mt-4">
					<TableComponent>
						<div className="table-responsive">
							<Table className="table">
								<thead>
									<tr>
										<th>Date</th>
										<th>Supplier</th>
										<th className="price">Order Number</th>
										<th>Staff</th>
										<th>Shop</th>
										<th className="price">Price</th>
										<th className="price">Paid</th>
										<th className="price">
											Supplied/Purchased
										</th>
										<th>Status</th>
									</tr>
								</thead>

								{!load && (
									<tbody>
										{arrToShow()?.rows?.map((l: any) => (
											<tr key={l.id}>
												<td>
													{dateFormat(
														l.createdAt,
														"mmm dd, yyyy"
													)}
												</td>
												<td className="link">
													<Link
														to={`/dashboard/suppliers/${l.supplier?.id}`}
													>
														{l.supplier?.name?.slice(
															0,
															15
														)}
														{l.supplier?.name
															?.length > 15 &&
															"..."}
													</Link>
												</td>
												<td className="price link">
													<Link to={`${l.id}`}>
														{l.uniqueRef}
													</Link>
												</td>
												<td>
													{l?.user?.fullName.slice(
														0,
														15
													) || ""}{" "}
													{l?.user?.fullName?.length >
														15 && "..."}
												</td>
												<td>
													{l?.shop?.name.slice(0, 15)}{" "}
													{l?.shop?.name?.length >
														15 && "..."}
												</td>
												<td className="price bold">
													{currency}{" "}
													{formatCurrency(
														l.totalPrice
													)}
												</td>
												<td className="price bold">
													{currency}{" "}
													{formatCurrency(
														l.totalAmountPaid
													)}
												</td>
												<td className="price">
													{l.totalSupplied} /{" "}
													{l.totalNoItems}
												</td>
												<td className="status">
													<img
														src={
															l.status.toLowerCase() ===
															"success"
																? SuccessIcon
																: l.status.toLowerCase() ===
																  "pending"
																? PendingIcon
																: FailedIcon
														}
													/>
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
							changeLimit={(l) => setLimit(l)}
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
		</div>
	) : (
		<NewPage
			title={"Purchase"}
			img={CoverImg}
			cover="Record Purchases & Track Supplies"
			desc={`Place and manage purchase orders for new inventory. \n Track pending and completed purchases with advance supply tracker \n Supplier integration for efficient order processing.`}
			btnTitle={"Record Purchase"}
			linkTo={() => navigate("new")}
		/>
	);
};

export default Purchases;
