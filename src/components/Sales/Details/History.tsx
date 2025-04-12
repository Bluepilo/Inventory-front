import { useAppSelector } from "../../../redux/hooks";
import { DetailCard } from "../../../styles/sale.styles";
import { Table } from "../../../styles/table.styles";
import { formatCurrency } from "../../../utils/currency";
import dateFormat from "dateformat";

const History = ({ saleDetails }: { saleDetails: any }) => {
	const { currency } = useAppSelector((state) => state.auth);

	return (
		<DetailCard>
			<h6>Transaction History</h6>
			<div className="table-responsive">
				{Array.isArray(saleDetails.transactions) && (
					<Table className="table mt-3">
						<thead>
							<tr>
								<th>Amount</th>
								<th>Type</th>
								<th>Date Made</th>
								<th>Made By</th>
							</tr>
						</thead>
						<tbody>
							{saleDetails.transactions.map(
								(s: any, i: number) => (
									<tr key={i}>
										<td>
											{currency}{" "}
											{formatCurrency(s.amountPaid)}
										</td>
										<td>{s.transactionType?.name}</td>
										<td>
											{dateFormat(
												s.createdAt,
												"mmm dd, yyyy | h:MM TT"
											)}
										</td>
										<td>{s.user?.fullName}</td>
									</tr>
								)
							)}
						</tbody>
					</Table>
				)}
			</div>
		</DetailCard>
	);
};

export default History;
