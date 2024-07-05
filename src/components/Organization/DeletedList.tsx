import { Table, TableComponent } from "../../styles/table.styles";
import { Link } from "react-router-dom";
import SkeletonTable from "../Loaders/SkeletonTable";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const DeletedList = ({ data, load }: { data: any; load: boolean }) => {
	return (
		<TableComponent>
			<div className="table-responsive">
				<Table className="table">
					<thead>
						<tr>
							<th>Name</th>
							<th>Email</th>
							<th>Phone</th>
							<th>Deleted By</th>
							<th>Reason</th>
						</tr>
					</thead>
					<tbody>
						{!load &&
							data?.map((org: any) => (
								<tr key={org.id}>
									<td className="link">
										<Link to={`${org.id}`}>{org.name}</Link>
									</td>
									<td>{org.email}</td>
									<td>{org.phone}</td>
									<td>{org.deletedBy}</td>
									<td>
										<OverlayTrigger
											placement="top"
											overlay={
												<Tooltip
													id={`button-${org.id}`}
												>
													{org.comment}
												</Tooltip>
											}
										>
											<span>
												{org?.comment?.substring(0, 20)}
												...
											</span>
										</OverlayTrigger>
									</td>
								</tr>
							))}
					</tbody>
				</Table>
			</div>
			{load && <SkeletonTable />}
		</TableComponent>
	);
};

export default DeletedList;
