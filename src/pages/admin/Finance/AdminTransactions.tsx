import { useEffect, useState } from "react";
import TitleCover from "../../../components/TitleCover";
import adminService from "../../../redux/features/admin/admin-service";
import { useAppSelector } from "../../../redux/hooks";
import { Table, TableComponent } from "../../../styles/table.styles";
import dateFormat from "dateformat";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../../utils/currency";
import SkeletonTable from "../../../components/Loaders/SkeletonTable";
import Paginate from "../../../components/Paginate";
import { FilterStyles } from "../../../styles/filters.styles";
import {
	BasicSelect,
	DateSelect,
	OptionProp,
} from "../../../components/Filters/BasicInputs";
import Filters from "../../../components/Filters";
import { SummaryCard } from "../../../styles/dashboard.styles";

const AdminTransactions = () => {
	const { token } = useAppSelector((state) => state.auth);

	const [load, setLoad] = useState(false);
	const [list, setList] = useState<any>({});
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(20);
	const [startDate, setStartDate] = useState(
		new Date(new Date().getFullYear(), new Date().getMonth(), 1)
	);
	const [endDate, setEndDate] = useState(
		new Date(new Date().setDate(new Date().getDate() + 1))
	);
	const [status, setStatus] = useState<OptionProp | null>(null);
	const [subType, setSubType] = useState<OptionProp | null>(null);

	let filters = `?page=${page}&limit=${limit}&transactionType=${
		subType?.value || ""
	}&status=${status?.value || ""}&startDate=${startDate}&endDate=${endDate}`;

	useEffect(() => {
		window.scrollTo(0, 0);
		listTransactions();
	}, [filters]);

	const listTransactions = async () => {
		try {
			setLoad(true);
			let res = await adminService.listTransactions(filters, token);
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
		setSubType(null);
	};

	return (
		<div>
			<TitleCover title="Transactions" dataCount={list?.count} />
			<Filters
				startDate={startDate}
				changeStartDate={setStartDate}
				endDate={endDate}
				changeEndDate={setEndDate}
				others={subType}
				changeOthers={setSubType}
				othersLabel="Subscription Type"
				othersList={[
					{ label: "topup", value: "topup" },
					{
						label: "subscription",
						value: "subscription",
					},
				]}
				clearValues={clearFilters}
			/>
			<div className="row align-items-center mt-4">
				<div className="col-lg-6 mb-3">
					<SummaryCard>
						<div>
							<h6>Total Credit:</h6>
							<h6>
								{formatCurrency(
									list?.rows
										?.filter((f: any) => f.mode === "in")
										.reduce(
											(a: any, b: any) =>
												a + Number(b.amountPaid),
											0
										)
								)}
							</h6>
						</div>

						<div>
							<h6>Total Debit:</h6>
							<h6>
								{formatCurrency(
									list?.rows
										?.filter((f: any) => f.mode === "out")
										.reduce(
											(a: any, b: any) =>
												a + Number(b.amountPaid),
											0
										)
								)}
							</h6>
						</div>
					</SummaryCard>
				</div>
			</div>
			<div className="mt-3">
				<TableComponent>
					<div className="table-responsive">
						<Table className="table">
							<thead>
								<tr>
									<th>Payment Date</th>
									<th>Organization</th>
									<th>Transaction Type</th>
									<th>Credit</th>
									<th>Debit</th>
									<th>Balance</th>
								</tr>
							</thead>
							<tbody>
								{!load &&
									list?.rows?.map((tr: any) => (
										<tr key={tr.id}>
											<td>
												{dateFormat(
													tr.updatedAt,
													"mmm dd, yyyy"
												)}
											</td>
											<td className="link">
												{tr.organization ? (
													<Link
														to={`/admin/organizations/${tr.organization?.id}`}
													>
														{tr.organization?.name}
													</Link>
												) : (
													<span>Deleted Account</span>
												)}
											</td>
											<td>
												{tr.transactionType === "topup"
													? tr.channel === "admin"
														? "Manual Topup"
														: "Online Topup"
													: tr.transactionType}
											</td>
											<td>
												{tr.mode === "in"
													? `${formatCurrency(
															tr.amountPaid
													  )}`
													: "--"}
											</td>
											<td>
												{tr.mode === "out"
													? `${formatCurrency(
															tr.amountPaid
													  )}`
													: "--"}
											</td>
											<td>
												{formatCurrency(tr.amountPaid)}
											</td>
										</tr>
									))}
							</tbody>
						</Table>
					</div>
					{load && <SkeletonTable />}
				</TableComponent>
				{!load && list?.count ? (
					<Paginate
						changeLimit={(l) => setLimit(l)}
						limit={limit}
						count={list.count}
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

export default AdminTransactions;
