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
		{ label: "Card", value: "card" },
		{ label: "Bank Transfer", value: "bank_transfer" },
		{ label: "USSD", value: "ussd" },
		{ label: "QR", value: "qr" },
		{ label: "Bank", value: "bank" },
	]);
	const [channelTypeId, setChannelTypeId] = useState<OptionProp | null>(null);
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(20);

	useEffect(() => {
		loadAllTransactions();
	}, [endDate, channelTypeId, limit, page]);

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
		setChannelTypeId(null);
	};

	return (
		<div>
			<TitleCover title={"SMS Transactions"} />
			<Filters
				startDate={startDate}
				changeStartDate={setStartDate}
				endDate={endDate}
				changeEndDate={setEndDate}
				clearValues={clearFilters}
				others={channelTypeId}
				changeOthers={setChannelTypeId}
				othersLabel="Channel"
				othersList={channelTypes}
			/>
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
											<td className="price">
												₦{formatCurrency(li.amount)}
											</td>
											<td>{li.type}</td>
											<td className="status">
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
											</td>
											<td>{li.channel}</td>
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
	);
};

export default SmsTransactions;
