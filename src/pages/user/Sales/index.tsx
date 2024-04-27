import { IoCartSharp } from "react-icons/io5";
import TitleCover from "../../../components/TitleCover";
import Filters from "../../../components/Filters";
import { useEffect, useState } from "react";
import { CheckBoxPrint, SummaryCard } from "../../../styles/dashboard.styles";
import { MainButton } from "../../../styles/links.styles";
import PrintLogo from "../../../assets/icons/print.svg";
import { Table, TableComponent } from "../../../styles/table.styles";
import SkeletonTable from "../../../components/Loaders/SkeletonTable";
import { useAppSelector } from "../../../redux/hooks";
import salesService from "../../../redux/features/sales/sales-service";
import dateFormat from "dateformat";
import { Link, useNavigate } from "react-router-dom";
import { formatCurrency } from "../../../utils/currency";

import SuccessIcon from "../../../assets/icons/success.svg";
import FailedIcon from "../../../assets/icons/failed.svg";
import PendingIcon from "../../../assets/icons/pending.svg";
import Paginate from "../../../components/Paginate";
import { UseDebounce } from "../../../utils/hooks";
import { OptionProp } from "../../../components/Filters/BasicInputs";
import { haveRole } from "../../../utils/role";
import NewPage from "../../../components/NewPage";
import CoverImg from "../../../assets/defaults/sales.png";

const Sales = () => {
	const navigate = useNavigate();

	const { token, details } = useAppSelector((state) => state.auth);

	const [startDate, setStartDate] = useState(
		new Date(new Date().getFullYear(), new Date().getMonth(), 1)
	);
	const [endDate, setEndDate] = useState(
		new Date(new Date().setDate(new Date().getDate() + 1))
	);
	const [shopId, setShopId] = useState<OptionProp | null>(null);
	const [staffId, setStaffId] = useState<OptionProp | null>(null);
	const [customerType, setCustomerType] = useState<OptionProp | null>(null);
	const [search, setSearch] = useState("");
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(20);
	const [withdrawn, setWithdrawn] = useState(false);

	const [load, setLoad] = useState(false);
	const [lists, setList] = useState<any>({});
	const [summary, setSummary] = useState<any>({});

	const debouncedSearch = UseDebounce(search);

	let filters = `?page=${page}&limit=${limit}&shopId=${
		shopId?.value || ""
	}&userId=${staffId?.value || ""}&customerCategory=${
		customerType?.value || ""
	}&startDate=${startDate}&endDate=${endDate}&includeWithdrawn=${
		withdrawn ? "1" : "0"
	}`;

	const currency =
		details.business?.currency?.symbol || details.business.currencyCode;

	useEffect(() => {
		window.scrollTo(0, 0);
		if (debouncedSearch) {
			searchSales();
		} else {
			getSales();
		}
		getSummary();
	}, [filters, debouncedSearch]);

	const getSales = async () => {
		try {
			setLoad(true);
			let res = await salesService.getSales(token, filters);
			setLoad(false);
			setList(res);
		} catch (err) {
			setLoad(false);
		}
	};

	const getSummary = async () => {
		try {
			let res = await salesService.getSalesSummary(token, filters);
			setSummary(res);
		} catch (err) {}
	};

	const searchSales = async () => {
		try {
			setLoad(true);
			let res = await salesService.searchSales(
				token,
				debouncedSearch,
				filters
			);
			setLoad(false);
			setList(res);
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
		setCustomerType(null);
		setShopId(null);
	};

	return details.business.onboardingSteps?.sales === "completed" ? (
		<div>
			<TitleCover
				title="Sales Records"
				dataCount={lists?.count}
				button={
					haveRole(details.businessRoleId).isBusinessActioners
						? "Make Sales"
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
					customerType={customerType}
					staffId={staffId}
					changeShopId={setShopId}
					changeStaffId={setStaffId}
					changeCustomerType={setCustomerType}
					isSearchable={true}
					searchVal={search}
					changeSearchVal={setSearch}
					clearValues={clearFilters}
				/>
				<div className="row align-items-center mt-4">
					<div className="col-lg-7 mb-3">
						<SummaryCard>
							<div>
								<h6>Total Sales: </h6>
								<h6>
									{summary?.totalAmountExpected
										? `${currency} ${formatCurrency(
												summary.totalAmountExpected
										  )}`
										: "--"}
								</h6>
							</div>
							{haveRole(details.businessRoleId)
								.isBusinessAdmin && (
								<div>
									<h6>Total Sales Margin:</h6>
									<h6>
										{summary?.totalEstimatedProfit
											? `${currency} ${formatCurrency(
													summary.totalEstimatedProfit
											  )}`
											: "--"}
									</h6>
								</div>
							)}
						</SummaryCard>
					</div>
					<div className="col-lg-5 mb-3">
						<CheckBoxPrint>
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
									Show Withdrawn Sales
								</label>
							</div>
							<MainButton>
								<img src={PrintLogo} />
								<span>Print</span>
							</MainButton>
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
										<th>Customer</th>
										<th className="price">
											Invoice Number
										</th>
										<th>Staff</th>
										<th>Shop</th>
										<th className="price">Price</th>
										{haveRole(details.businessRoleId)
											.isBusinessAdmin && <th>Margin</th>}
										<th>Status</th>
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
												<td className="link">
													<Link
														to={`/dashboard/customers/${
															l.customerId
																? `walk-in/${l.customerId}`
																: `subdealer/${l.subdealerId}`
														}`}
													>
														{l.customerName.slice(
															0,
															15
														)}
														{l.customerName.length >
															15 && "..."}
													</Link>
												</td>
												<td className="price link">
													<Link to={`${l.uniqueRef}`}>
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
														l.amountExpected
													)}
												</td>
												{haveRole(
													details.businessRoleId
												).isBusinessAdmin && (
													<td
														style={{
															color:
																l.estimatedProfit <
																0
																	? "red"
																	: "inherit",
														}}
													>
														{currency}{" "}
														{formatCurrency(
															l.estimatedProfit
														)}
													</td>
												)}
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
			title={"Sales"}
			img={CoverImg}
			cover="Create Sales and Invoice"
			desc={
				"Create sales orders, track your sales margin, Generate invoices and receipts for all transactions. Flexible invoicing solution you could send to customers via Email, whatsapp or simply print to Thermal paper and A4 paper."
			}
			btnTitle={"Make Sales"}
			linkTo={() => navigate("/dashboard/sales/new")}
		/>
	);
};

export default Sales;
