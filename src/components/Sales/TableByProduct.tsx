import React from "react";
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
					<th>Type</th>
					<th>Product</th>
					<th className="price">Price</th>
					<th className="text-center">Stock Before / Stock After</th>
					<th>Staff</th>
					<th>Shop</th>
				</tr>
			</thead>
			{!load && (
				<tbody>
					{lists?.rows?.map((l: any) => (
						<tr key={l.id}>
							<td>{dateFormat(l.createdAt, "mmm dd, yyyy")}</td>
							<td>{l?.logType?.name}</td>
							<td>{l?.product?.summary}</td>
							<td className="price bold">
								{currency} {formatCurrency(l.price)}
							</td>
							<td className="text-center">
								{l.stockBefore}
								{" / "}
								{l.stockAfter}
							</td>
							<td>
								{l?.user?.fullName.slice(0, 15) || ""}{" "}
								{l?.user?.fullName?.length > 15 && "..."}
							</td>
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
