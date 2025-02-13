import { Table } from "../../styles/table.styles";
import { haveRole } from "../../utils/role";
import { useAppSelector } from "../../redux/hooks";
import dateFormat from "dateformat";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/currency";
import SuccessIcon from "../../assets/icons/success.svg";
import PendingIcon from "../../assets/icons/pending.svg";
import FailedIcon from "../../assets/icons/failed.svg";

const TableBySales = ({ load, lists }: { load: boolean; lists: any }) => {
	const { details, currency } = useAppSelector((state) => state.auth);

	return (
		<Table className="table">
			<thead>
				<tr>
					<th>Date</th>
					<th>Customer</th>
					<th className="price">Invoice Number</th>
					<th>Staff</th>
					<th>Shop</th>
					<th className="price">Price</th>
					{haveRole(details.businessRoleId).isBusinessAdmin && (
						<th>Margin</th>
					)}
					<th>Status</th>
				</tr>
			</thead>
			{!load && (
				<tbody>
					{lists?.rows?.map((l: any) => (
						<tr key={l.id}>
							<td>{dateFormat(l.createdAt, "mmm dd, yyyy")}</td>
							<td className="link">
								<Link
									to={`/dashboard/customers/${
										l.customerId
											? `walk-in/${l.customerId}`
											: `subdealer/${l.subdealerId}`
									}`}
								>
									{l?.customerName?.slice(0, 15)}
									{l?.customerName?.length > 15 && "..."}
								</Link>
							</td>
							<td className="price link">
								<Link to={`${l.uniqueRef}`}>{l.uniqueRef}</Link>
							</td>
							<td>
								{l?.user?.fullName.slice(0, 15) || ""}{" "}
								{l?.user?.fullName?.length > 15 && "..."}
							</td>
							<td>
								{l?.shop?.name.slice(0, 15)}{" "}
								{l?.shop?.name?.length > 15 && "..."}
							</td>
							<td className="price bold">
								{currency} {formatCurrency(l.amountExpected)}
							</td>
							{haveRole(details.businessRoleId)
								.isBusinessAdmin && (
								<td
									style={{
										color:
											l.estimatedProfit < 0
												? "red"
												: "inherit",
									}}
								>
									{currency}{" "}
									{formatCurrency(l.estimatedProfit)}
								</td>
							)}
							<td className="status">
								<img
									src={
										l.status.toLowerCase() === "success"
											? SuccessIcon
											: l.status.toLowerCase() ===
											  "awaiting withdrawal"
											? PendingIcon
											: FailedIcon
									}
								/>
							</td>
						</tr>
					))}
				</tbody>
			)}
		</Table>
	);
};

export default TableBySales;
