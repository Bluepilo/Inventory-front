import React, { useState } from "react";
import { Table } from "../../styles/table.styles";
import dateFormat from "dateformat";
import { formatCurrency } from "../../utils/currency";
import SuccessIcon from "../../assets/icons/success.svg";
import PendingIcon from "../../assets/icons/pending.svg";
import FailedIcon from "../../assets/icons/failed.svg";
import ExpenseDetails from "./ExpenseDetails";
import ModalComponent from "../ModalComponent";

const ExpenseTable = ({ data, load }: { data: any; load: boolean }) => {
	const [openModal, setOpenModal] = useState(false);

	return (
		<>
			<Table className="table">
				<thead>
					<tr>
						<th>Date Created</th>
						<th>Type</th>
						<th>Shop</th>
						<th>Staff</th>
						<th className="price">Cost</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>
					{!load &&
						data &&
						Array.isArray(data) &&
						data.map((d) => (
							<tr key={d.id}>
								<td>
									{dateFormat(d.createdAt, "mmm dd, yyyy")}
								</td>
								<td className="link">
									<a
										href="#"
										onClick={(e) => {
											e.preventDefault();
											setOpenModal(true);
										}}
									>
										{d.category?.name || d.name}
									</a>
								</td>
								<td>{d.shop?.name}</td>
								<td>{d.createdBy?.fullName}</td>
								<td className="price bold">
									₦ {formatCurrency(d.cost)}
								</td>
								<td>
									<img
										src={
											d.status.toLowerCase() ===
											"approved"
												? SuccessIcon
												: d.status.toLowerCase() ===
												  "pending"
												? PendingIcon
												: FailedIcon
										}
									/>
								</td>
							</tr>
						))}
				</tbody>
			</Table>
			<ModalComponent open={openModal} close={() => setOpenModal(false)}>
				<ExpenseDetails />
			</ModalComponent>
		</>
	);
};

export default ExpenseTable;
