import { useAppSelector } from "../../../redux/hooks";
import { Table } from "../../../styles/table.styles";
import { formatCurrency } from "../../../utils/currency";

const ItemsPicked = ({ saleDetails }: { saleDetails: any }) => {
	const { currency } = useAppSelector((state) => state.auth);

	let products = JSON.parse(saleDetails.productPurchasedPayload);

	return (
		<div className="mb-4">
			<h6 style={{ color: "#0241ff", fontWeight: "500" }}>
				Items Picked
			</h6>
			{Array.isArray(products) && (
				<div className="table-responsive">
					<Table className="table">
						<tbody>
							{products.map((p, i) => (
								<tr key={p.id || i}>
									<td>{p.summary || p.name}</td>
									<td>{p.quantity}</td>
									<td>
										{currency}{" "}
										{formatCurrency(p.price * p.quantity)}
									</td>
								</tr>
							))}
						</tbody>
						<tfoot>
							<tr>
								<th>Total</th>
								<th>
									{products.reduce(
										(a, b) => a + b.quantity,
										0
									)}
								</th>
								<th>
									{currency}{" "}
									{formatCurrency(
										products.reduce(
											(a, b) =>
												a +
												Number(b.price * b.quantity),
											0
										)
									)}
								</th>
							</tr>
						</tfoot>
					</Table>
				</div>
			)}
		</div>
	);
};

export default ItemsPicked;
