import { Table } from "../../../styles/table.styles";
import { formatCurrency } from "../../../utils/currency";
import dateFormat from "dateformat";

const SubHistory = ({ history }: { history: any }) => {
	return (
		<div>
			<h6 style={{ color: "#0241ff", fontWeight: "500" }}>
				Subscription History
			</h6>
			{Array.isArray(history?.rows) && history.rows?.length > 0 ? (
				<div className="table-responsive">
					<Table className="table">
						<thead>
							<tr>
								<th>Plan</th>
								<th>Amount</th>
								<th>Duration</th>
								<th>Start Date</th>
								<th>End Date</th>
							</tr>
						</thead>
						<tbody>
							{history?.rows?.map((li: any) => (
								<tr key={li.id}>
									<td>{li.subscriptionPlan?.name}</td>
									<td>
										<span>
											{formatCurrency(li.amountPaid)}
										</span>{" "}
									</td>
									<td>
										{li.isMonthly ? "Monthly" : "Yearly"}
									</td>
									<td>
										{dateFormat(
											li.startDate,
											"mmm dd, yyyy"
										)}
									</td>
									<td>
										{dateFormat(li.endDate, "mmm dd, yyyy")}
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				</div>
			) : (
				<>
					<p>No Subscription history</p>
				</>
			)}
		</div>
	);
};

export default SubHistory;
