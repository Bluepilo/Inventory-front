import { useEffect, useState } from "react";
import { displayError } from "../../../utils/errors";
import smsService from "../../../redux/features/sms/smsService";
import { useAppSelector } from "../../../redux/hooks";
import TitleCover from "../../../components/TitleCover";
import Filters from "../../../components/Filters";
import { Table, TableComponent } from "../../../styles/table.styles";
import dateFormat from "dateformat";
import { formatCurrency } from "../../../utils/currency";
import SkeletonTable from "../../../components/Loaders/SkeletonTable";
import Paginate from "../../../components/Paginate";
import { SummaryCard } from "../../../styles/dashboard.styles";
import PermissionDenied from "../../../components/PermissionDenied";

const SmsHistory = () => {
	const { token, details } = useAppSelector((state) => state.auth);

	const [load, setLoad] = useState(false);
	const [list, setList] = useState<any>({});
	const [startDate, setStartDate] = useState(
		new Date(new Date().getFullYear(), new Date().getMonth(), 1)
	);
	const [endDate, setEndDate] = useState(
		new Date(new Date().setDate(new Date().getDate() + 1))
	);
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(20);
	const [report, setReport] = useState<any>({});
	const [dateType, setDateType] = useState({
		label: "This Month",
		value: "month",
	});

	useEffect(() => {
		getReport();
		getHistory();
	}, [page, limit, endDate]);

	const getReport = async () => {
		try {
			let res = await smsService.getHistoryReport(
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

	const getHistory = async () => {
		try {
			setLoad(true);
			let res = await smsService.getHistory(
				token,
				details.id,
				startDate,
				endDate,
				limit,
				page
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
		setDateType({ label: "This Month", value: "month" });
	};

	const getLength = (arr: any, str: string) => {
		let find = arr.filter((a: any) => a.delivery_status === str);
		return find.length;
	};

	return details?.role?.permissions?.find(
		(f) => f.method === "bluepiloSmsHistory"
	) ? (
		<div>
			<TitleCover title={"SMS Logs"} />
			<Filters
				startDate={startDate}
				changeStartDate={setStartDate}
				endDate={endDate}
				changeEndDate={setEndDate}
				clearValues={clearFilters}
				dateType={dateType}
				changeDateType={setDateType}
			/>
			<div className="row align-items-center mt-4">
				<div className="col-lg-6 mb-3">
					<SummaryCard>
						<div>
							<h6>Total Unit:</h6>
							<h6>
								{typeof report?.totalUnit === "number"
									? report?.totalUnit
									: "--"}
							</h6>
						</div>

						<div>
							<h6>Total Value:</h6>
							<h6>
								{typeof report?.totalValue === "number"
									? `₦${formatCurrency(report?.totalValue)}`
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
									<th>Message ID</th>
									<th>Numbers Count</th>
									<th className="price">SMS Cost</th>
									<th className="price">SMS Charged</th>
									<th className="price">Margin</th>
									<th>Date</th>
									<th>Status</th>
								</tr>
							</thead>
							{!load && (
								<tbody>
									{list?.list?.map((l: any) => (
										<tr key={l._id}>
											<td>{l.orgName}</td>
											<td>{l.messageId}</td>
											<td>{l.phoneNumbers.length}</td>
											<td className="price">
												₦
												{formatCurrency(
													l.cpPerPage *
														l.phoneNumbers.length *
														l.pages
												)}
											</td>
											<td className="price">
												₦
												{formatCurrency(
													l.spPerPage *
														l.phoneNumbers.length *
														l.pages
												)}
											</td>
											<td className="price">
												₦
												{formatCurrency(
													l.spPerPage *
														l.phoneNumbers.length *
														l.pages -
														l.cpPerPage *
															l.phoneNumbers
																.length *
															l.pages
												)}
											</td>
											<td>
												{dateFormat(
													l.createdAt,
													"mmm dd, yyyy | h:MM TT"
												)}
											</td>
											<td>
												<span
													style={{
														paddingRight: "10px",
														color: "green",
													}}
												>
													{getLength(
														l.phoneNumbers,
														"delivrd"
													)}
												</span>
												|
												<span
													style={{
														margin: "0 10px",
														color: "red",
													}}
												>
													{getLength(
														l.phoneNumbers,
														"undeliv"
													)}
												</span>
												|
												<span
													style={{
														paddingLeft: "10px",
														color: "orange",
													}}
												>
													{getLength(
														l.phoneNumbers,
														"pending"
													)}
												</span>
											</td>
										</tr>
									))}
								</tbody>
							)}
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

export default SmsHistory;
