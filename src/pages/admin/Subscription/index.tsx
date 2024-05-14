import { useEffect, useState } from "react";
import TitleCover from "../../../components/TitleCover";
import { DetailCard } from "../../../styles/sale.styles";
import { Table } from "../../../styles/table.styles";
import adminService from "../../../redux/features/admin/admin-service";
import { useAppSelector } from "../../../redux/hooks";
import SkeletonTable from "../../../components/Loaders/SkeletonTable";

const Subscription = () => {
	const [load, setLoad] = useState(false);
	const [results, setResults] = useState<any>([]);

	const { token } = useAppSelector((state) => state.auth);

	useEffect(() => {
		getResult();
	}, []);

	const getResult = async () => {
		try {
			setLoad(true);
			let res = await adminService.subTracker(token);
			setLoad(false);
			setResults(res);
		} catch (err) {
			setLoad(false);
		}
	};
	return (
		<div>
			<TitleCover title={"Subscription Tracker"} />
			<div className="row mt-4">
				<div className="col-lg-6 mb-3">
					<DetailCard>
						<div className="table-responsive">
							<Table className="table">
								<thead>
									<tr>
										<th>Subscription Type</th>
										<th>Active Units</th>
									</tr>
								</thead>

								<tbody>
									{!load &&
										results?.map((r: any) => (
											<tr key={r.id}>
												<td>{r.name}</td>
												<td>{r.count}</td>
											</tr>
										))}
								</tbody>
							</Table>
							{load && <SkeletonTable />}
						</div>
					</DetailCard>
				</div>
			</div>
		</div>
	);
};

export default Subscription;
