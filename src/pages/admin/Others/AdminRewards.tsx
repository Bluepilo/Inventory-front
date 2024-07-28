import { useEffect, useState } from "react";
import { displayError } from "../../../utils/errors";
import rewardService from "../../../redux/features/rewards/reward-service";
import { useAppSelector } from "../../../redux/hooks";
import TitleCover from "../../../components/TitleCover";
import dateFormat from "dateformat";
import { Table, TableComponent } from "../../../styles/table.styles";
import { formatCurrency } from "../../../utils/currency";
import SkeletonTable from "../../../components/Loaders/SkeletonTable";
import Paginate from "../../../components/Paginate";
import Filters from "../../../components/Filters";
import { OptionProp } from "../../../components/Filters/BasicInputs";
import { Link } from "react-router-dom";

const AdminRewards = () => {
	const { token } = useAppSelector((state) => state.auth);

	const [load, setLoad] = useState(false);
	const [list, setList] = useState<any>({});
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(20);
	const [dateType, setDateType] = useState({
		label: "This Month",
		value: "month",
	});
	const [startDate, setStartDate] = useState(
		new Date(new Date().getFullYear(), new Date().getMonth(), 1)
	);
	const [endDate, setEndDate] = useState(
		new Date(new Date().setDate(new Date().getDate() + 1))
	);
	const [typeId, setTypeId] = useState<OptionProp | null>(null);

	let filters = `?startDate=${startDate}&endDate=${endDate}&type=${
		typeId?.value || ""
	}`;

	useEffect(() => {
		getRewards();
	}, [filters]);

	const getRewards = async () => {
		try {
			setLoad(true);
			let res = await rewardService.getAdminRewards(token, filters);
			setLoad(false);
			setList(res);
		} catch (err) {
			setLoad(false);
			displayError(err, true);
		}
	};

	return (
		<div>
			<TitleCover title="All Rewards" />
			<Filters
				dateType={dateType}
				changeDateType={setDateType}
				startDate={startDate}
				changeStartDate={setStartDate}
				endDate={endDate}
				changeEndDate={setEndDate}
				others={typeId}
				othersLabel="Type"
				othersList={[
					{ label: "Earn", value: "earn" },
					{ label: "Claim", value: "claim" },
				]}
				changeOthers={setTypeId}
			/>
			<div className="mt-4">
				<TableComponent>
					<div className="table-responsive">
						<Table className="table">
							<thead>
								<tr>
									<th>Date</th>
									<th>Referral Agent</th>
									<th>Organization</th>
									<th>Activity</th>
									<th>Subscription Type</th>
									<th>Rate</th>
									<th className="price">Commission</th>
									<th></th>
								</tr>
							</thead>

							{!load && (
								<tbody>
									{list?.rows?.map((l: any) => (
										<tr key={l.id}>
											<td>
												{dateFormat(
													l.createdAt,
													"mmm dd, yyyy"
												)}
											</td>
											<td>{l.user?.fullName}</td>
											<td className="link">
												<Link
													to={`/admin/organizations/${l.organization?.id}`}
												>
													{l.organization?.name}
												</Link>
											</td>
											<td>{l.activity}</td>
											<td></td>
											<td></td>
											<td className="price bold">
												₦ {formatCurrency(l.amount)}
											</td>
											<td></td>
										</tr>
									))}
								</tbody>
							)}
						</Table>
					</div>
					{load && <SkeletonTable />}
				</TableComponent>
				{!load && list?.count ? (
					<Paginate
						changeLimit={(l) => setLimit(l)}
						limit={list.limit}
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

export default AdminRewards;
