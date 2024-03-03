import React, { useState } from "react";
import { Table } from "../../styles/table.styles";
import dateFormat from "dateformat";
import { formatCurrency } from "../../utils/currency";
import SuccessIcon from "../../assets/icons/success.svg";
import PendingIcon from "../../assets/icons/pending.svg";
import FailedIcon from "../../assets/icons/failed.svg";
import ExpenseDetails from "./ExpenseDetails";
import ModalComponent from "../ModalComponent";
import { displayError } from "../../utils/errors";
import { toast } from "react-toastify";
import expenseService from "../../redux/features/expense/expense-service";
import { useAppSelector } from "../../redux/hooks";
import CommentBox from "../Sales/CommentBox";

const ExpenseTable = ({
	data,
	load,
	reload,
}: {
	data: any;
	load: boolean;
	reload: () => void;
}) => {
	const { token } = useAppSelector((state) => state.auth);

	const [openModal, setOpenModal] = useState(false);
	const [details, setDetails] = useState<any>(null);
	const [openComment, setOpenComment] = useState(false);

	const actionHandler = async (comment: string) => {
		try {
			setOpenComment(false);
			await expenseService.actionOnExpense(
				token,
				details?.id,
				details?.action,
				{ comment }
			);
			reload();
			toast.success(
				details?.action === "approve"
					? "Expense has been approved"
					: "Expense was declined"
			);
		} catch (err) {
			displayError(err, true);
		}
	};

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
											setDetails(d);
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
			<ModalComponent
				open={openModal}
				close={() => setOpenModal(false)}
				title="Expense Recorded"
			>
				<ExpenseDetails
					details={details}
					closeDetails={() => {
						setOpenModal(false);
						reload();
					}}
					openComment={(action: string) => {
						setOpenModal(false);
						setDetails({ ...details, action });
						setOpenComment(true);
					}}
				/>
			</ModalComponent>
			<ModalComponent
				open={openComment}
				close={() => setOpenComment(false)}
			>
				<CommentBox
					btnName={details?.action}
					bg={details?.action === "reject" ? "#f44336" : "#0241ff"}
					submit={(arg: string) => actionHandler(arg)}
				/>
			</ModalComponent>
		</>
	);
};

export default ExpenseTable;
