import TitleCover from "../../../components/TitleCover";
import { DetailCard } from "../../../styles/sale.styles";
import { Table } from "../../../styles/table.styles";

const Subscription = () => {
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
									<tr>
										<td>Free Forever</td>
										<td>--</td>
									</tr>
									<tr>
										<td>Starter</td>
										<td>--</td>
									</tr>
									<tr>
										<td>Basic</td>
										<td>--</td>
									</tr>
									<tr>
										<td>Standard</td>
										<td>--</td>
									</tr>
									<tr>
										<td>Premium</td>
										<td>--</td>
									</tr>
								</tbody>
							</Table>
						</div>
					</DetailCard>
				</div>
			</div>
		</div>
	);
};

export default Subscription;
