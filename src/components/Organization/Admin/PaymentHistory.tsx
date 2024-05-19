import { Table } from "../../../styles/table.styles";
import { formatCurrency } from "../../../utils/currency";
import { FiArrowDownLeft, FiArrowUpRight } from "react-icons/fi";
import dateFormat from "dateformat";

const PaymentHistory = ({ history }: { history: any }) => {
	return (
		<div>
			<h6 style={{ color: "#0241ff", fontWeight: "500" }}>
				Payment History
			</h6>
			{Array.isArray(history?.payments?.rows) &&
			history.payments.rows?.length > 0 ? (
				<div className="table-responsive">
					<Table className="table">
						<thead>
							<tr>
								<th>Amount</th>
								<th>Before/After</th>
								<th>Type</th>
								<th>Date</th>
							</tr>
						</thead>
						<tbody>
							{history?.payments?.rows?.map((li: any) => (
								<tr key={li.id}>
									<td>
										<span>
											{formatCurrency(li.amountPaid)}
										</span>{" "}
										{li.mode === "in" ? (
											<FiArrowDownLeft color="green" />
										) : (
											<FiArrowUpRight color="red" />
										)}
									</td>
									<td>
										{formatCurrency(li.balanceBefore)}/
										{formatCurrency(li.balanceAfter)}
									</td>
									<td>{li.transactionType}</td>
									<td>
										{dateFormat(
											li.createdAt,
											"mmm dd, yyyy"
										)}
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				</div>
			) : (
				<>
					<p>No Payment History found.</p>
				</>
			)}
		</div>
	);
};

export default PaymentHistory;
