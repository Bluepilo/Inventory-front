import { useState } from "react";
import { Table } from "../../../styles/table.styles";
import dateFormat from "dateformat";

const UserList = ({ list }: { list: any }) => {
	const [lists, setLists] = useState(list);

	const [sortConfig, setSortConfig] = useState({
		keys: ["fullName", "email", "phoneNo", "lastLoginAt"],
		direction: "asc",
	});

	const handleSort = (key: string) => {
		let direction = "asc";

		if (sortConfig.keys.includes(key) && sortConfig.direction === "asc") {
			direction = "desc";
		}

		const sortedArray = lists.sort((a: any, b: any) => {
			let comparison = 0;

			if (key === "balance") {
				const balanceA = parseFloat(a.balance) || 0;
				const balanceB = parseFloat(b.balance) || 0;
				comparison = balanceA - balanceB;
			} else {
				const valueA = String(a[key] || "");
				const valueB = String(b[key] || "");
				comparison = valueA.localeCompare(valueB, "en", {
					sensitivity: "base",
				});
			}

			return direction === "asc" ? comparison : -comparison;
		});

		setSortConfig({ keys: [key], direction });
		setLists(sortedArray);
	};

	return (
		<div>
			<h6 style={{ color: "#0241ff", fontWeight: "500" }}>Users</h6>
			{Array.isArray(list) && (
				<div className="table-responsive">
					<Table className="table">
						<thead>
							<tr>
								<th
									className="point"
									onClick={() => handleSort("fullName")}
								>
									Name
									{sortConfig.keys.includes("fullName") && (
										<span>
											{sortConfig.direction === "asc"
												? "▲"
												: "▼"}
										</span>
									)}
								</th>
								<th
									className="point"
									onClick={() => handleSort("email")}
								>
									Email
									{sortConfig.keys.includes("email") && (
										<span>
											{sortConfig.direction === "asc"
												? "▲"
												: "▼"}
										</span>
									)}
								</th>
								<th
									className="point"
									onClick={() => handleSort("phoneNo")}
								>
									Phone
									{sortConfig.keys.includes("phoneNo") && (
										<span>
											{sortConfig.direction === "asc"
												? "▲"
												: "▼"}
										</span>
									)}
								</th>
								<th>Status</th>
								<th
									className="point"
									onClick={() => handleSort("lastLoginAt")}
								>
									Last Login
									{sortConfig.keys.includes(
										"lastLoginAt"
									) && (
										<span>
											{sortConfig.direction === "asc"
												? "▲"
												: "▼"}
										</span>
									)}
								</th>
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
									<td>
										{dateFormat(
											li.lastLoginAt,
											"mmm dd, yyyy | h:MM TT"
										)}
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
