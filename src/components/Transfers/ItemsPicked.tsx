import { Table } from "../../styles/table.styles";
import { formatCurrency } from "../../utils/currency";
import { useAppSelector } from "../../redux/hooks";

const ItemsPicked = ({ transferDetails }: { transferDetails: any }) => {
	let products = transferDetails.products;

	const { currency } = useAppSelector((state) => state.auth);

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
									<td>{p.summary}</td>
									<td>{p.productTransfer?.quantity}</td>
									<td>
										₦{" "}
										{formatCurrency(
											Number(p.price) *
												p.productTransfer?.quantity || 1
										)}
									</td>
								</tr>
							))}
						</tbody>
						<tfoot>
							<tr>
								<th>Total</th>
								<th>
									{products.reduce(
										(a, b) =>
											a + b.productTransfer?.quantity ||
											1,
										0
									)}
								</th>
								<th>
									{currency}{" "}
									{formatCurrency(
										products.reduce(
											(a, b) =>
												a +
													Number(b.price) *
														b.productTransfer
															?.quantity || 1,
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
