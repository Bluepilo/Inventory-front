import { useAppSelector } from "../../redux/hooks";
import dateFormat from "dateformat";
import { formatCurrency } from "../../utils/currency";
import "../../styles/reciept.css";

const ThermalSale = ({ result }: { result: any }) => {
	const { details } = useAppSelector((state) => state.auth);

	const currency =
		details.business?.currency?.symbol || details.business.currencyCode;

	return result?.id ? (
		<div className="row justify-content-center">
			<div className="col-lg-6 mt-3">
				<div className="thermal shadow-sm">
					<div className="img">
						<img
							src={details.business.image}
							alt="Business"
							style={{ height: "80px", width: "80px" }}
						/>
						<strong>{details?.business?.name || "Bluepilo"}</strong>
					</div>
					<div className="info">
						<div className="row">
							<div className="col-3 mb-2">
								<b>Ref:</b>
							</div>
							<div className="col-9 mb-2">
								<span>{result.uniqueRef}</span>
							</div>
							<div className="col-3 mb-2">
								<b>Shop:</b>
							</div>
							<div className="col-9 mb-2">
								<span>{result.shop?.name}</span>
							</div>
							<div className="col-3 mb-2">
								<b>Date:</b>
							</div>
							<div className="col-9 mb-2">
								<span>
									{dateFormat(
										result.createdAt,
										"mmm dd, yyyy | h:MM TT"
									)}
								</span>
							</div>
							<div className="col-3 mb-2">
								<b>Billed To:</b>
							</div>
							<div className="col-9 mb-2">
								<span>{result.customerName}</span>
							</div>
						</div>
					</div>
					{Array.isArray(
						JSON.parse(result.productPurchasedPayload)
					) && (
						<div className="table-print">
							<table className="table">
								<thead>
									<tr>
										<th>Item</th>
										<th className="center">Qty</th>
										<th className="price">Price</th>
									</tr>
								</thead>
								<tbody>
									{JSON.parse(
										result.productPurchasedPayload
									).map((prd: any, indx: number) => {
										return (
											<tr key={indx}>
												<td className="name">
													{prd.name}
												</td>
												<td className="qty">
													{prd.quantity}
												</td>
												<td className="price">
													{currency}{" "}
													{formatCurrency(prd.price)}
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
					)}
					<div className="total">
						<div className="row">
							<div className="col-3 mb-2">
								<b>Total Sales:</b>
							</div>
							<div className="col-9 mb-2">
								<span>
									{currency}{" "}
									{formatCurrency(
										Number(result.amountExpected) +
											Number(result.discount)
									)}
								</span>
							</div>
							<div className="col-3 mb-2">
								<b>Discount:</b>
							</div>
							<div className="col-9 mb-2">
								<span>
									{currency} {formatCurrency(result.discount)}
								</span>
							</div>
							<div className="col-3 mb-2">
								<b>Sub Total:</b>
							</div>
							<div className="col-9 mb-2">
								<span>
									{currency}{" "}
									{formatCurrency(result.amountExpected)}
								</span>
							</div>

							<div className="col-3 mb-2">
								<b>Amount Paid:</b>
							</div>
							<div className="col-9 mb-2">
								<span>
									{currency}{" "}
									{formatCurrency(result.actualAmountPaid)}
								</span>
							</div>
							<div className="col-3 mb-2">
								<b>Balance:</b>
							</div>
							<div className="col-9 mb-2">
								<span>
									{currency}{" "}
									{result.transactions?.length > 0
										? formatCurrency(
												result.transactions[0]
													.balanceAfter
										  )
										: "--"}
								</span>
							</div>
						</div>
					</div>
					<div className="text-center mt-3">
						<p>Sales by {result.user?.fullName}</p>
						<p>Thanks for your patronage</p>
					</div>
				</div>
			</div>
		</div>
	) : (
		<></>
	);
};

export default ThermalSale;
