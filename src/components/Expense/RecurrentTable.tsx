import { Table } from "../../styles/table.styles";
import dateFormat from "dateformat";
import { formatCurrency } from "../../utils/currency";
import SuccessIcon from "../../assets/icons/success.svg";
import PendingIcon from "../../assets/icons/pending.svg";
import FailedIcon from "../../assets/icons/failed.svg";
import { MainButton } from "../../styles/links.styles";
import { displayError, displaySuccess } from "../../utils/errors";
import expenseService from "../../redux/features/expense/expense-service";
import { useAppSelector } from "../../redux/hooks";

const RecurrentTable = ({
	data,
	load,
	currency,
	setLoad,
	reload,
}: {
	data: any;
	load: boolean;
	currency: string;
	setLoad: (arg: boolean) => void;
	reload: () => void;
}) => {
	const cancelExpense = async (id: string) => {
		if (
			window.confirm(
				"Are you sure you want to proceed with the cancelation?"
			)
		) {
			try {
				setLoad(true);
				await expenseService.deleteRecurrentExpense(id);
				setLoad(false);
				displaySuccess("Recurrent Expense has been cancelled");
				reload();
			} catch (err) {
				setLoad(false);
				displayError(err, true);
			}
		}
	};
	return (
		<Table className="table">
			<thead>
				<tr>
					<th>Date Created</th>
					<th>Frequency</th>
					<th>Type</th>
					<th>Last Recorded Date</th>
					<th>Next Recorded Date</th>
					<th className="price">Cost</th>
					<th>Status</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				{!load &&
					data &&
					Array.isArray(data) &&
					data.map((d) => (
						<tr key={d.id}>
							<td>{dateFormat(d.createdAt, "mmm dd, yyyy")}</td>
							<td>{d.frequency}</td>
							<td>{d.name}</td>
							<td>
								{dateFormat(d.lastRecordDate, "mmm dd, yyyy")}
							</td>
							<td>
								{dateFormat(d.nextRecordDate, "mmm dd, yyyy")}
							</td>
							<td className="price bold">
								{currency} {formatCurrency(d.cost)}
							</td>
							<td>
								<img
									src={
										d.status.toLowerCase() === "approved"
											? SuccessIcon
											: d.status.toLowerCase() ===
											  "pending"
											? PendingIcon
											: FailedIcon
									}
								/>
							</td>
							<td>
								<MainButton
									sm="true"
									bg="#F44336"
									onClick={() => cancelExpense(d.id)}
								>
									Cancel
								</MainButton>
							</td>
						</tr>
					))}
			</tbody>
		</Table>
	);
};

export default RecurrentTable;
