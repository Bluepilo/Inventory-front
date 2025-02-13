import { Table } from "../../styles/table.styles";
import dateFormat from "dateformat";
import { formatCurrency } from "../../utils/currency";
import { useAppSelector } from "../../redux/hooks";

const TableByProduct = ({ load, lists }: { load: boolean; lists: any }) => {
	const { currency } = useAppSelector((state) => state.auth);

	return (
		<Table className="table">
			<thead>
				<tr>
					<th>Date</th>
					<th>Product</th>
					<th>Unit</th>
					<th className="price">Total Amount</th>
					<th>Invoice Number</th>
					<th>Status</th>
					<th>Shop</th>
				</tr>
			</thead>
			{!load && (
				<tbody>
					{lists?.rows?.map((l: any) => (
						<tr key={l.id}>
							<td>{dateFormat(l.createdAt, "mmm dd, yyyy")}</td>
							<td>{l?.product?.summary}</td>
							<td>{l.quantity}</td>
							<td className="price bold">
								{currency} {formatCurrency(l.price)}
							</td>
							<td>{l.sale?.uniqueRef}</td>
							<td>{l?.sale?.status}</td>
							<td>
								{l?.shop?.name.slice(0, 15)}{" "}
								{l?.shop?.name?.length > 15 && "..."}
							</td>
						</tr>
					))}
				</tbody>
			)}
		</Table>
	);
};

export default TableByProduct;
