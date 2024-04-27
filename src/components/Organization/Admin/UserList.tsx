import { Table } from "../../../styles/table.styles";

const UserList = ({ list }: { list: any }) => {
	return (
		<div>
			<h6 style={{ color: "#0241ff", fontWeight: "500" }}>Users</h6>
			{Array.isArray(list) && (
				<div className="table-responsive">
					<Table className="table">
						<thead>
							<tr>
								<th>Name</th>
								<th>Email</th>
								<th>Phone</th>
								<th>Status</th>
							</tr>
						</thead>
						<tbody>
							{list.map((li: any) => (
								<tr key={li.id}>
									<td>{li.fullName}</td>
									<td>{li.email}</td>
									<td>{li.phoneNo}</td>
									<td>
										{li.isActive ? "Active" : "Inactive"}
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				</div>
			)}
		</div>
	);
};

export default UserList;
