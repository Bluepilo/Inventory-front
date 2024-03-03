import dateFormat from "dateformat";
import { ExpenseStyle } from "../../styles/dashboard.styles";
import { formatCurrency } from "../../utils/currency";
import { FaCheckCircle } from "react-icons/fa";
import { MdCancel, MdDeleteOutline, MdMore } from "react-icons/md";
import { useState } from "react";
import { MainButton } from "../../styles/links.styles";
import { FlexBetween } from "../../styles/basic.styles";
import { displayError } from "../../utils/errors";
import expenseService from "../../redux/features/expense/expense-service";
import { useAppSelector } from "../../redux/hooks";
import { toast } from "react-toastify";
import Loading from "../Loaders/Loading";

const ExpenseDetails = ({
	details,
	closeDetails,
	openComment,
}: {
	details: any;
	closeDetails: () => void;
	openComment: (arg: string) => void;
}) => {
	const { token } = useAppSelector((state) => state.auth);

	const [load, setLoad] = useState(false);

	const deleteHandler = async () => {
		if (
			window.confirm(
				"Are you sure you want to proceed with the deletion?"
			)
		) {
			try {
				setLoad(true);
				await expenseService.deleteExpense(token, details.id);
				setLoad(false);
				toast.success("Expense has been deleted");
				closeDetails();
			} catch (err) {
				setLoad(false);
				displayError(err, true);
			}
		}
	};

	return details?.id ? (
		<ExpenseStyle>
			<div className="row">
				<span className="col-2 mb-2">Date:</span>
				<b className="col-10 mb-2">
					{dateFormat(details.createdAt, "mmm dd, yyyy | h:MM TT")}
				</b>
				<span className="col-2 mb-2">Cost:</span>
				<b className="col-10 mb-2">₦{formatCurrency(details.cost)}</b>
				<span className="col-2 mb-2">Staff:</span>
				<b className="col-10 mb-2">{details.createdBy?.fullName}</b>
				<span className="col-2 mb-2">Shop:</span>
				<b className="col-10 mb-2">{details.shop?.name}</b>
				<span className="col-2 mb-2">Status:</span>
				{details?.status !== "pending" ? (
					<b className="col-10 mb-2">
						{details.status === "approved"
							? "Approved by"
							: "Rejected by"}{" "}
						{details?.actionBy?.fullName}
						{" on "}
						{dateFormat(
							details?.actionBy?.updatedAt,
							"mmm dd, yyyy"
						)}
					</b>
				) : (
					<b className="col-10 mb-2">Pending</b>
				)}
			</div>
			<div className="status-div">
				<div className={`status ${details.status}`}>
					{details.status.toLowerCase() === "approved" ? (
						<FaCheckCircle color="#4CAF50" />
					) : details.status.toLowerCase() === "pending" ? (
						<MdMore color="#FF9800" />
					) : (
						<MdCancel color="#F44336" />
					)}
					{details.status}
				</div>
			</div>
			<div className="content-comment shadow-sm">
				<h5>{details?.category?.name || details.name}</h5>
				<p>{details.description}</p>
				{details.proof && (
					<div className="img">
						<a href={details.proof} target="_blank">
							View uploaded image
						</a>
					</div>
				)}
			</div>
			<div className="text-center">
				{load ? (
					<Loading />
				) : (
					<MainButton
						onClick={deleteHandler}
						bg="#f44336"
						right="true"
					>
						<span>Delete Expense</span>
						<MdDeleteOutline />
					</MainButton>
				)}
			</div>

			{!load && details.status === "pending" && (
				<FlexBetween className="mt-4">
					<MainButton
						onClick={() => openComment("reject")}
						bg="#f44336"
					>
						Decline
					</MainButton>
					<MainButton onClick={() => openComment("approve")}>
						Approve
					</MainButton>
				</FlexBetween>
			)}
		</ExpenseStyle>
	) : (
		<></>
	);
};

export default ExpenseDetails;
