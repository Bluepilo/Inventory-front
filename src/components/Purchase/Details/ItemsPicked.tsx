import { useEffect, useState } from "react";
import { Table } from "../../../styles/table.styles";
import { formatCurrency } from "../../../utils/currency";
import { MainButton } from "../../../styles/links.styles";
import { HiCheckBadge } from "react-icons/hi2";
import { IoMdRefreshCircle } from "react-icons/io";
import { useAppSelector } from "../../../redux/hooks";

const Quantites = ({ p, changeProduct }: { p: any; changeProduct: any }) => {
	const changeVal = (no: string) => {
		if (Number(no) <= p.quantity && Number(no) >= p.supplied) {
			changeProduct({
				newSupplied: Number(no),
				qtyAdded: Number(no) - p.supplied,
				id: p.id,
			});
		}
	};

	return (
		<td className="quantites">
			<button
				onClick={() => {
					if (Number(p.newTotalSupplied) < 7) {
						changeProduct({
							newSupplied: Number(p.newTotalSupplied) + 1,
							qtyAdded:
								Number(p.newTotalSupplied) + 1 - p.supplied,
							id: p.id,
						});
					}
				}}
			>
				+
			</button>
			<input
				type="number"
				value={p.newTotalSupplied}
				onChange={(e) => changeVal(e.target.value)}
			/>
			<button
				onClick={() => {
					if (Number(p.newTotalSupplied) > p.supplied) {
						changeProduct({
							newSupplied: Number(p.newTotalSupplied) - 1,
							qtyAdded:
								Number(p.newTotalSupplied) - 1 - p.supplied,
							id: p.id,
						});
					}
				}}
			>
				-
			</button>
		</td>
	);
};

const ItemsPicked = ({
	purchaseDetails,
	supplyItems,
}: {
	purchaseDetails: any;
	supplyItems: (arg: any) => void;
}) => {
	const [products, setProducts] = useState<any>([]);

	const { details } = useAppSelector((state) => state.auth);

	const currency =
		details.business?.currency?.symbol || details.business.currencyCode;

	useEffect(() => {
		let arr =
			purchaseDetails.products ||
			JSON.parse(purchaseDetails.purchaseDetails);

		let mainArr = arr?.map((prd: any) => {
			return {
				id: prd?.productPurchase?.productId || prd.id,
				quantity: prd?.productPurchase?.quantity || prd?.quantity,
				name: prd?.productPurchase?.name || prd?.name,
				supplied: +prd?.productPurchase?.supplied || 0,
				newTotalSupplied: prd?.productPurchase?.supplied || 0,
				qtyAdded: 0,
				price: prd?.productPurchase?.pricePerUnit || prd.costPrice,
			};
		});
		setProducts(mainArr);
	}, []);

	const changeProduct = (prod: any) => {
		let newProduct = products.map((p: any) => {
			if (p.id == prod.id) {
				p.qtyAdded = prod.qtyAdded;
				p.newTotalSupplied = prod.newSupplied;
			}
			return p;
		});

		setProducts(newProduct);
	};

	const markAll = () => {
		if (
			window.confirm(
				"Are you confirming that all products have been supplied?"
			)
		) {
			let newProduct = products.map((p: any) => {
				let diff = p.quantity - p.supplied;
				return {
					...p,
					newTotalSupplied: diff + p.supplied,
					qtyAdded: diff,
				};
			});
			setProducts(newProduct);
		}
	};

	return (
		<div className="mb-4">
			<h6 style={{ color: "#0241ff", fontWeight: "500" }}>
				Items Picked
			</h6>
			{Array.isArray(products) && (
				<div className="table-responsive">
					<Table className="table">
						<thead>
							<tr>
								<th>Item</th>
								<th>Ordered</th>
								<th>Price</th>
								<th>Supplied</th>
							</tr>
						</thead>
						<tbody>
							{products.map((p, i) => (
								<tr key={p.id || i}>
									<td>{p.summary || p.name}</td>
									<td>{p.quantity}</td>
									<td>
										{currency} {formatCurrency(p.price)}
									</td>
									<Quantites
										p={p}
										changeProduct={changeProduct}
									/>
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
								<th className="price">
									{products.reduce(
										(a, b) => a + Number(b.supplied),
										0
									)}
								</th>
							</tr>
						</tfoot>
					</Table>
					<Table className="table">
						<tfoot>
							<tr>
								<th>Supply Status</th>
								<td>
									{purchaseDetails.totalSupplied} out of{" "}
									{products.reduce(
										(a, b) => a + b.quantity,
										0
									)}{" "}
									ordered items
								</td>
								{purchaseDetails.totalNoItems !==
									purchaseDetails.totalSupplied && (
									<>
										<td>
											<MainButton
												onClick={markAll}
												bg="#EDEEF0"
												color="#505BDA"
												sm="true"
												right="true"
											>
												<span>Mark All Supplied</span>
												<HiCheckBadge />
											</MainButton>
										</td>
										<td>
											<MainButton
												sm="true"
												right="true"
												onClick={() =>
													supplyItems(products)
												}
											>
												<span>Update</span>
												<IoMdRefreshCircle />
											</MainButton>
										</td>
									</>
								)}
							</tr>
						</tfoot>
					</Table>
				</div>
			)}
		</div>
	);
};

export default ItemsPicked;
