import { IoCartSharp } from "react-icons/io5";
import TitleCover from "../../../components/TitleCover";
import Filters from "../../../components/Filters";
import { useEffect, useState } from "react";
import { CheckBoxPrint, SummaryCard } from "../../../styles/dashboard.styles";
import { TableComponent } from "../../../styles/table.styles";
import SkeletonTable from "../../../components/Loaders/SkeletonTable";
import { useAppSelector } from "../../../redux/hooks";
import salesService from "../../../redux/features/sales/sales-service";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../../utils/currency";

import Paginate from "../../../components/Paginate";
import { UseDebounce } from "../../../utils/hooks";
import { OptionProp } from "../../../components/Filters/BasicInputs";
import { haveRole } from "../../../utils/role";
import NewPage from "../../../components/NewPage";
import CoverImg from "../../../assets/defaults/sales.png";
import TableBySales from "../../../components/Sales/TableBySales";
import TableByProduct from "../../../components/Sales/TableByProduct";
import { SwitchDiv } from "../../../styles/basic.styles";

const Sales = () => {
	const navigate = useNavigate();

	const { token, details, currency } = useAppSelector((state) => state.auth);

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
	const [filterBySales, setFilterBySales] = useState(true);

	const [load, setLoad] = useState(false);
	const [lists, setList] = useState<any>({});
	const [dateType, setDateType] = useState({
		label: "This Month",
		value: "month",
	});

	const debouncedSearch = UseDebounce(search);

	let filters = `?page=${page}&limit=${limit}&shopId=${
		shopId?.value || ""
	}&userId=${staffId?.value || ""}&customerCategory=${
		customerType?.value || ""
	}&startDate=${startDate}&endDate=${endDate}&includeWithdrawn=${
		withdrawn ? "1" : "0"
	}&mode=${filterBySales ? "sales" : "product"}`;

	useEffect(() => {
		window.scrollTo(0, 0);
		if (debouncedSearch) {
			searchSales();
		} else {
			getSales();
		}
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
		setDateType({ label: "This Month", value: "month" });
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
			<SwitchDiv>
				<div
					className={filterBySales ? "active" : ""}
					onClick={() => {
						setFilterBySales(true);
					}}
				>
					Filter By Sales
				</div>
				<div
					className={!filterBySales ? "active" : ""}
					onClick={() => {
						setFilterBySales(false);
					}}
				>
					Filter By Products
				</div>
			</SwitchDiv>
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
					dateType={dateType}
					changeDateType={setDateType}
				/>
				<div className="row align-items-center mt-4">
					<div className="col-lg-7 mb-3">
						<SummaryCard>
							<div>
								<h6>Total Sales: </h6>
								<h6>
									{lists?.summary?.totalAmountExpected
										? `${currency} ${formatCurrency(
												lists?.summary
													.totalAmountExpected
										  )}`
										: "--"}
								</h6>
							</div>
							{haveRole(details.businessRoleId)
								.isBusinessAdmin && (
								<div>
									<h6>Total Sales Margin:</h6>
									<h6>
										{lists?.summary?.totalEstimatedProfit
											? `${currency} ${formatCurrency(
													lists?.summary
														.totalEstimatedProfit
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
						</CheckBoxPrint>
					</div>
				</div>
				<div className="mt-4">
					<TableComponent>
						<div className="table-responsive">
							{filterBySales ? (
								<TableBySales load={load} lists={lists} />
							) : (
								<TableByProduct load={load} lists={lists} />
							)}
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
