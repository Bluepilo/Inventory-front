import { useEffect, useState } from "react";
import { displayError } from "../../../utils/errors";
import smsService from "../../../redux/features/sms/smsService";
import { useAppSelector } from "../../../redux/hooks";
import TitleCover from "../../../components/TitleCover";
import { Table, TableComponent } from "../../../styles/table.styles";
import SkeletonTable from "../../../components/Loaders/SkeletonTable";
import { formatCurrency } from "../../../utils/currency";
import SuccessIcon from "../../../assets/icons/success.svg";
import PendingIcon from "../../../assets/icons/pending.svg";
import FailedIcon from "../../../assets/icons/failed.svg";
import { OptionProp } from "../../../components/Filters/BasicInputs";
import Filters from "../../../components/Filters";
import Paginate from "../../../components/Paginate";
import dateFormat from "dateformat";
import { SummaryCard } from "../../../styles/dashboard.styles";
import { UseDebounce } from "../../../utils/hooks";
import PermissionDenied from "../../../components/PermissionDenied";

const SmsTransactions = () => {
	const { token, details } = useAppSelector((state) => state.auth);

	const [load, setLoad] = useState(false);
	const [list, setList] = useState<any>({});
	const [startDate, setStartDate] = useState(
		new Date(new Date().getFullYear(), new Date().getMonth(), 1)
	);
	const [endDate, setEndDate] = useState(
		new Date(new Date().setDate(new Date().getDate() + 1))
	);
	const [channelTypes, setChannelTypes] = useState<OptionProp[]>([
		{ label: "Manual", value: "Manual" },
		{ label: "Bonus Manual", value: "Bonus-Manual" },
		{ label: "Paystack (Completed)", value: "Paystack-Complete" },
		{ label: "Paystack (Pending)", value: "Paystack-Pending" },
		{ label: "SMS", value: "sms" },
	]);
	const [channelTypeId, setChannelTypeId] = useState<OptionProp | null>(null);
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(20);
	const [search, setSearch] = useState("");
	const [report, setReport] = useState<any>({});
	const [dateType, setDateType] = useState({
		label: "This Month",
		value: "month",
	});

	const debouncedSearch = UseDebounce(search);

	useEffect(() => {
		getReport();
		loadAllTransactions();
	}, [endDate, channelTypeId, limit, page, debouncedSearch]);

	const loadAllTransactions = async () => {
		try {
			setLoad(true);
			let res = await smsService.allTransactions(
				token,
				details.id,
				startDate.toISOString(),
				endDate.toISOString(),
				channelTypeId?.value || "",
				limit,
				page,
				search
			);
			setLoad(false);
			setList(res);
		} catch (err) {
			setLoad(false);
			displayError(err, true);
		}
	};

	const clearFilters = () => {
		setStartDate(
			new Date(new Date().getFullYear(), new Date().getMonth(), 1)
		);
		setEndDate(new Date(new Date().setDate(new Date().getDate() + 1)));
		setChannelTypeId(null);
		setDateType({ label: "This Month", value: "month" });
	};

	const getReport = async () => {
		try {
			let res = await smsService.getTransactionReport(
				token,
				details.id,
				startDate.toISOString(),
				endDate.toISOString()
			);
			setReport(res);
		} catch (err) {
			console.log(err);
		}
	};

	const verifyHandler = async (data: any) => {
		if (window.confirm("Are you sure you want to proceed?")) {
			try {
				setLoad(true);
				await smsService.verifyTransaction(token, details.id, {
					reference: data.reference,
				});
				setLoad(false);
			} catch (err) {
				setLoad(false);
				displayError(err, true);
			}
		}
	};

	return details?.role?.permissions?.find(
		(f) => f.method === "bluepiloSmsTransactionList"
	) ? (
		<div>
			<TitleCover title={"SMS Transactions"} />
			<Filters
				isSearchable={true}
				searchVal={search}
				placeholder="Search Organization"
				changeSearchVal={setSearch}
				startDate={startDate}
				changeStartDate={setStartDate}
				endDate={endDate}
				changeEndDate={setEndDate}
				clearValues={clearFilters}
				others={channelTypeId}
				changeOthers={setChannelTypeId}
				othersLabel="Channel"
				othersList={channelTypes}
				dateType={dateType}
				changeDateType={setDateType}
			/>
			<div className="row align-items-center mt-4">
				<div className="col-lg-6 mb-3">
					<SummaryCard>
						<div>
							<h6>Total Credit:</h6>
							<h6>
								{typeof report?.totalCredit === "number"
									? `₦${formatCurrency(report?.totalCredit)}`
									: "--"}
							</h6>
						</div>

						<div>
							<h6>Total Debit:</h6>
							<h6>
								{typeof report?.totalDebit === "number"
									? `₦${formatCurrency(report?.totalDebit)}`
									: "--"}
							</h6>
						</div>
					</SummaryCard>
				</div>
			</div>
			<div>
				<TableComponent>
					<div className="table-responsive">
						<Table className="table">
							<thead>
								<tr>
									<th>Organization</th>
									<th>Reference</th>
									<th className="price">Amount</th>
									<th>Type</th>
									<th>Status</th>
									<th>Channel</th>
									<th>Date|Time</th>
								</tr>
							</thead>
							<tbody>
								{!load &&
									list?.list?.map((li: any) => (
										<tr key={li._id}>
											<td className="link">
												<a
													href={`/admin/organizations/${li.orgId}`}
													target="_blank"
												>
													{li.orgName}
												</a>
											</td>
											<td>{li.reference}</td>
											<td
												className="price"
												style={{
													color:
														li.type === "debit"
															? "red"
															: "black",
												}}
											>
												₦{formatCurrency(li.amount)}
											</td>
											<td>{li.type}</td>
											<td className="status link">
												<img
													src={
														li.status ===
														"completed"
															? SuccessIcon
															: li.status ===
															  "pending"
															? PendingIcon
															: FailedIcon
													}
												/>
												{li.status === "pending" && (
													<a
														href="#"
														className="ms-2"
														onClick={(e) => {
															e.preventDefault();
															verifyHandler(li);
														}}
													>
														Verify
													</a>
												)}
											</td>
											<td>
												{li.channel?.startsWith(
													"Paystack"
												)
													? "Paystack"
													: li.channel}
											</td>
											<td>
												{dateFormat(
													li.createdAt,
													"mmm dd, yyyy | h:MM TT"
												)}
											</td>
										</tr>
									))}
							</tbody>
						</Table>
					</div>
					{load && <SkeletonTable />}
				</TableComponent>
				{!load && list?.meta?.total ? (
					<Paginate
						changeLimit={(l) => setLimit(l)}
						limit={limit}
						count={list.meta.total}
						pageNumber={page}
						onPrev={(n) => setPage(n)}
						onNext={(n) => setPage(n)}
					/>
				) : (
					<></>
				)}
			</div>
		</div>
	) : (
		<PermissionDenied />
	);
};

export default SmsTransactions;
