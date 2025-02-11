import { Table } from "../../../styles/table.styles";

const BusinessList = ({ list }: { list: any }) => {
	return (
		<div>
			<h6 style={{ color: "#0241ff", fontWeight: "500" }}>Businesses</h6>
			{Array.isArray(list) && (
				<div className="table-responsive">
					<Table className="table">
						<thead>
							<tr>
								<th>Name</th>
								<th>Email</th>
								<th>Phone</th>
								<th>Status</th>
								<th>Currency</th>
								<th>Address</th>
							</tr>
						</thead>
						<tbody>
							{list.map((li: any) => (
								<tr key={li.id}>
									<td>{li.name}</td>
									<td>{li.email}</td>
									<td>{li.phone}</td>
									<td>
										{li.isActive ? "Active" : "Inactive"}
									</td>
									<td>{li.currency?.name}</td>
									<td>{li.address}</td>
								</tr>
							))}
						</tbody>
					</Table>
				</div>
			)}
		</div>
	);
};

export default BusinessList;
