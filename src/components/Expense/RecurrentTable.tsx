import { Table } from "../../styles/table.styles";
import dateFormat from "dateformat";
import { formatCurrency } from "../../utils/currency";
import SuccessIcon from "../../assets/icons/success.svg";
import PendingIcon from "../../assets/icons/pending.svg";
import FailedIcon from "../../assets/icons/failed.svg";
import { MainButton } from "../../styles/links.styles";

const RecurrentTable = ({
	data,
	load,
	currency,
}: {
	data: any;
	load: boolean;
	currency: string;
}) => {
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
								<MainButton sm="true" bg="#F44336">
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
