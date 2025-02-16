import React, { useEffect, useState } from "react";
import TitleCover from "../../../components/TitleCover";
import Filters from "../../../components/Filters";
import basicService from "../../../redux/features/basic/basic-service";
import dateFormat from "dateformat";
import SkeletonTable from "../../../components/Loaders/SkeletonTable";
import { LogStyles } from "../../../styles/basic.styles";
import { LuDot } from "react-icons/lu";
import Paginate from "../../../components/Paginate";

const ActivityLogs = () => {
	const [load, setLoad] = useState(false);
	const [startDate, setStartDate] = useState(
		new Date(new Date().getFullYear(), new Date().getMonth(), 1)
	);
	const [endDate, setEndDate] = useState(
		new Date(new Date().setDate(new Date().getDate() + 1))
	);
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const [lists, setLists] = useState<any>({});

	const clearFilters = () => {
		setStartDate(
			new Date(new Date().getFullYear(), new Date().getMonth(), 1)
		);
		setEndDate(new Date(new Date().setDate(new Date().getDate() + 1)));
	};

	let filters = `?page=${page}&limit=${limit}&startDate=${startDate}&endDate=${endDate}`;

	useEffect(() => {
		getLogs();
	}, [filters]);

	const getLogs = async () => {
		try {
			setLoad(true);
			let res = await basicService.getLogs(filters);
			setLoad(false);
			setLists(res);
		} catch (err) {
			setLoad(false);
		}
	};

	return (
		<div>
			<TitleCover title="Activity Logs" dataCount={lists?.count} />
			<div>
				<Filters
					startDate={startDate}
					changeStartDate={setStartDate}
					endDate={endDate}
					changeEndDate={setEndDate}
					clearValues={clearFilters}
				/>
				<div className="mt-4">
					{load ? (
						<SkeletonTable />
					) : (
						<>
							<LogStyles>
								{lists?.rows?.map((l: any) => (
									<div className="content" key={l.id}>
										<div className="first">
											<h6>
												{l.user?.fullName}{" "}
												<LuDot size={25} />{" "}
												<span
													style={{
														textTransform:
															"capitalize",
													}}
												>
													{l.activity}
												</span>
											</h6>
											<p>
												{l.deviceType} | {l.platform}
											</p>
										</div>
										<div className="second">
											<h6>
												{dateFormat(
													l.createdAt,
													"mmm dd, yyyy | h:MM TT"
												)}
											</h6>
										</div>
									</div>
								))}
							</LogStyles>
							{lists?.count ? (
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
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default ActivityLogs;
