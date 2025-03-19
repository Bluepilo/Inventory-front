import { Table, TableComponent } from "../../styles/table.styles";
import { useAppSelector } from "../../redux/hooks";
import { formatCurrency } from "../../utils/currency";
import DropDownProduct from "./DropDownProduct";
import { useNavigate } from "react-router-dom";
import SkeletonTable from "../Loaders/SkeletonTable";
import RoleGuard from "../RoleGuard";

const ProductTable = ({
	updateIds,
	load,
	list,
	ids,
	deleteHandler,
}: {
	updateIds: (e: boolean, a: string) => void;
	load: boolean;
	list: any;
	ids: any;
	deleteHandler: (arg: any, arg2: any) => void;
}) => {
	const { currency, details } = useAppSelector((state) => state.auth);

	const navigate = useNavigate();

	const ifAllowed = (method: string) => {
		if (details.role.isAdmin) {
			return details.role.permissions?.find((f) => f.method === method)
				? true
				: false;
		} else {
			return true;
		}
	};

	return (
		<TableComponent>
			<div className="table-responsive">
				<Table className="table">
					<thead>
						<tr>
							<th>
								<input
									type="checkbox"
									onChange={(e) =>
										updateIds(e.target.checked, "all")
									}
								/>
							</th>
							<th>Item</th>
							<th>Type</th>
							<th>Units</th>
							<th className="price">Cost Price</th>
							<th className="price">Selling Price</th>
							<RoleGuard access="isBusinessActioners">
								<th></th>
							</RoleGuard>
						</tr>
					</thead>
					{!load && (
						<tbody>
							{list?.rows?.map((l: any) => (
								<tr key={l.id}>
									<td>
										<input
											type="checkbox"
											checked={
												ids.find(
													(id: any) => id == l.id
												)
													? true
													: false
											}
											onChange={(e) =>
												updateIds(
													e.target.checked,
													l.id
												)
											}
										/>
									</td>
									<td
										style={{
											color: l.isService
												? "#0241FF"
												: "#333",
										}}
									>
										{l.summary}
									</td>
									<td>{l.isService ? "Service" : "Goods"}</td>
									<td>{l.totalStock}</td>
									<td className="price">
										{currency} {formatCurrency(l.costPrice)}
									</td>
									<td className="price">
										{currency} {formatCurrency(l.price)}
									</td>
									<RoleGuard access="isBusinessActioners">
										<td>
											<DropDownProduct
												onEdit={() =>
													navigate("new", {
														state: l,
													})
												}
												onDelete={() =>
													deleteHandler(l.id, l.name)
												}
												showEdit={ifAllowed(
													"updateProduct"
												)}
												showDelete={
													ifAllowed("deleteProduct")
														? true
														: false
												}
											/>
										</td>
									</RoleGuard>
								</tr>
							))}
						</tbody>
					)}
				</Table>
			</div>
			{load && <SkeletonTable />}
		</TableComponent>
	);
};

export default ProductTable;
