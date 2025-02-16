import { useEffect, useState } from "react";
import TitleCover from "../../../components/TitleCover";
import { DetailCard } from "../../../styles/sale.styles";
import { Table } from "../../../styles/table.styles";
import adminService from "../../../redux/features/admin/admin-service";
import { useAppSelector } from "../../../redux/hooks";
import SkeletonTable from "../../../components/Loaders/SkeletonTable";
import PermissionDenied from "../../../components/PermissionDenied";

const Subscription = () => {
	const [load, setLoad] = useState(false);
	const [results, setResults] = useState<any>([]);

	const { details } = useAppSelector((state) => state.auth);

	useEffect(() => {
		getResult();
	}, []);

	const getResult = async () => {
		try {
			setLoad(true);
			let res = await adminService.subTracker();
			setLoad(false);
			setResults(res);
		} catch (err) {
			setLoad(false);
		}
	};
	return details?.role?.permissions?.find(
		(f) => f.method === "subscriptionStatistics"
	) ? (
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
								{!load && (
									<>
										<tbody>
											{results?.subscriptions?.map(
												(r: any) => (
													<tr key={r.id}>
														<td>{r.name}</td>
														<td>{r.count}</td>
													</tr>
												)
											)}
										</tbody>
										<tfoot>
											<tr>
												<th>On Active Trial</th>
												<th>{results.activeTrial}</th>
											</tr>
										</tfoot>
									</>
								)}
							</Table>
							{load && <SkeletonTable />}
						</div>
					</DetailCard>
				</div>
			</div>
		</div>
	) : (
		<PermissionDenied />
	);
};

export default Subscription;
