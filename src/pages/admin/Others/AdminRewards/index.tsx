import { useEffect, useState } from "react";
import { displayError } from "../../../../utils/errors";
import rewardService from "../../../../redux/features/rewards/reward-service";
import { useAppSelector } from "../../../../redux/hooks";
import TitleCover from "../../../../components/TitleCover";
import { TableComponent } from "../../../../styles/table.styles";
import SkeletonTable from "../../../../components/Loaders/SkeletonTable";
import Paginate from "../../../../components/Paginate";
import Filters from "../../../../components/Filters";
import { SwitchDiv } from "../../../../styles/basic.styles";
import Earned from "./Earned";
import Claimed from "./Claimed";
import ModalComponent from "../../../../components/ModalComponent";
import ReferralInfo from "../../../../components/Reward/ReferralInfo";
import { SummaryCard } from "../../../../styles/dashboard.styles";
import { formatCurrency } from "../../../../utils/currency";

const AdminRewards = () => {
	const { token, details } = useAppSelector((state) => state.auth);

	const [rewardType, setRewardType] = useState("earn");
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
	const [openModal, setOpenModal] = useState(false);
	const [referral, setReferral] = useState<any>({});

	let filters = `?startDate=${startDate}&endDate=${endDate}&type=${rewardType}`;

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

	const clearFilters = () => {
		setStartDate(
			new Date(new Date().getFullYear(), new Date().getMonth(), 1)
		);
		setEndDate(new Date(new Date().setDate(new Date().getDate() + 1)));
		setDateType({ label: "This Month", value: "month" });
	};

	return (
		<div>
			<TitleCover title="All Rewards" />
			<SwitchDiv>
				<div
					className={rewardType === "earn" ? "active" : ""}
					onClick={() => setRewardType("earn")}
				>
					Earned
				</div>
				<div
					className={rewardType === "claim" ? "active" : ""}
					onClick={() => setRewardType("claim")}
				>
					Claimed
				</div>
			</SwitchDiv>
			<Filters
				dateType={dateType}
				changeDateType={setDateType}
				startDate={startDate}
				changeStartDate={setStartDate}
				endDate={endDate}
				changeEndDate={setEndDate}
				clearValues={clearFilters}
			/>
			<div className="row align-items-center mt-4">
				<div className="col-lg-6 mb-3">
					<SummaryCard>
						<div>
							<h6>Success</h6>
							<h6>
								{list?.report?.find(
									(f: any) => f.status === "success"
								)?.count || "0"}
							</h6>
						</div>

						<div>
							<h6>Pending:</h6>
							<h6>
								{list?.report?.find(
									(f: any) => f.status === "pending"
								)?.count || "0"}
							</h6>
						</div>
					</SummaryCard>
				</div>
			</div>
			<div className="mt-4">
				<TableComponent>
					{rewardType === "earn" ? (
						<Earned
							load={load}
							list={list}
							setReferral={(arg) => {
								setReferral(arg);
								setOpenModal(true);
							}}
						/>
					) : rewardType === "claim" ? (
						<Claimed
							load={load}
							list={list}
							reloadList={() => getRewards()}
							setLoad={setLoad}
							setReferral={(arg) => {
								setReferral(arg);
								setOpenModal(true);
							}}
						/>
					) : (
						<></>
					)}
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
			<ModalComponent
				open={openModal}
				close={() => setOpenModal(false)}
				title={`${referral?.firstName || "Details"}`}
			>
				<ReferralInfo detail={referral} />
			</ModalComponent>
		</div>
	);
};

export default AdminRewards;
