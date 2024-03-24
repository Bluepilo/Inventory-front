import { useEffect, useState } from "react";
import subscriptionService from "../../redux/features/subscription/subscriptionService";
import { useAppSelector } from "../../redux/hooks";
import { Table } from "../../styles/table.styles";
import dateFormat from "dateformat";
import SkeletonTable from "../Loaders/SkeletonTable";
import Paginate from "../Paginate";

const SubHistory = () => {
	const { token } = useAppSelector((state) => state.auth);

	const [loadSub, setLoadSub] = useState(false);
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const [subList, setSubList] = useState<any>({});

	let filters = `?page=${page}&limit=${limit}`;

	useEffect(() => {
		window.scrollTo(0, 0);
		getSubs();
	}, [filters]);

	const getSubs = async () => {
		try {
			setLoadSub(true);
			let res = await subscriptionService.getSubHistory(token, filters);
			setLoadSub(false);
			setSubList(res);
		} catch (err) {
			setLoadSub(false);
		}
	};

	return (
		<>
			<div className="table-responsive">
				<Table className="table">
					<thead>
						<tr>
							<th>Subscription</th>
							<th>Duration</th>
							<th>Start Date</th>
							<th>End Date</th>
						</tr>
					</thead>
					<tbody>
						{subList?.rows?.map((tr: any) => (
							<tr key={tr.id}>
								<td>{tr.subscriptionPlan?.name}</td>
								<td>{tr.isMonthly ? "Monthly" : "Yearly"}</td>
								<td>
									{dateFormat(tr.startDate, "mmm dd, yyyy")}
								</td>
								<td>
									{dateFormat(tr.endDate, "mmm dd, yyyy")}
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			</div>
			{!subList?.rows && <SkeletonTable />}
			{!loadSub && subList?.count ? (
				<Paginate
					changeLimit={(l) => setLimit(l)}
					limit={subList.limit}
					count={subList.count}
					pageNumber={page}
					onPrev={(n) => setPage(n)}
					onNext={(n) => setPage(n)}
				/>
			) : (
				<></>
			)}
		</>
	);
};

export default SubHistory;
