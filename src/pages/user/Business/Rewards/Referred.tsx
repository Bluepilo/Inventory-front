import { useEffect, useState } from "react";
import TitleCover from "../../../../components/TitleCover";
import { displayError } from "../../../../utils/errors";
import rewardService from "../../../../redux/features/rewards/reward-service";
import { useAppSelector } from "../../../../redux/hooks";
import { Table, TableComponent } from "../../../../styles/table.styles";
import dateFormat from "dateformat";
import SkeletonTable from "../../../../components/Loaders/SkeletonTable";
import Paginate from "../../../../components/Paginate";

const Referred = () => {
	const { token } = useAppSelector((state) => state.auth);

	const [list, setList] = useState<any>({});
	const [load, setLoad] = useState(false);
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(20);

	let filters = `?page=${page}&limit=${limit}`;

	useEffect(() => {
		window.scrollTo(0, 0);
		referredList();
	}, [filters]);

	const referredList = async () => {
		try {
			setLoad(true);
			let res = await rewardService.referredList(token, filters);
			setLoad(false);
			setList(res);
		} catch (err) {
			setLoad(false);
			displayError(err, true);
		}
	};

	return (
		<div>
			<TitleCover title="Organizations Referred" />
			<div className="mt-4">
				<TableComponent>
					<div className="table-responsive">
						<Table className="table">
							<thead>
								<tr>
									<th>S/N</th>
									<th>Organization</th>
									<th>Date Referred</th>
								</tr>
							</thead>

							{!load && (
								<tbody>
									{list?.rows?.map((l: any, i: number) => (
										<tr key={l.id}>
											<td>{i + 1}</td>
											<td>{l.name}</td>
											<td>
												{dateFormat(
													l.createdAt,
													"mmm dd, yyyy"
												)}
											</td>
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

export default Referred;
