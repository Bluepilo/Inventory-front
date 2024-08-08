import { Table } from "../../../../styles/table.styles";
import dateFormat from "dateformat";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../../../utils/currency";
import SuccessIcon from "../../../../assets/icons/success.svg";
import PendingIcon from "../../../../assets/icons/pending.svg";
import FailedIcon from "../../../../assets/icons/failed.svg";

const Earned = ({
	list,
	load,
	setReferral,
}: {
	list: any;
	load: boolean;
	setReferral: (arg: any) => void;
}) => {
	const getName = (str: string) => {
		return str.replace(/ /g, "-");
	};

	return (
		<div className="table-responsive">
			<Table className="table">
				<thead>
					<tr>
						<th>Date</th>
						<th>Referral Agent</th>
						<th>Organization</th>
						<th>Activity</th>
						<th>Subscription Type</th>
						<th>Rate</th>
						<th className="price">Commission</th>
						<th></th>
					</tr>
				</thead>

				{!load && (
					<tbody>
						{list?.rows?.map((l: any) => (
							<tr key={l.id}>
								<td>
									{l.createdAt
										? dateFormat(
												l.createdAt,
												"mmm dd, yyyy"
										  )
										: "--"}
								</td>
								<td className="link">
									<Link
										to={`/admin/users/${getName(
											`${l.user?.fullName}`
										)}`}
										state={l.user}
									>
										{l.user?.fullName}
									</Link>
								</td>
								<td className="link">
									<Link
										to={`/admin/organizations/${l.organization?.id}`}
									>
										{l.organization?.name}
									</Link>
								</td>
								<td>{l.activity}</td>
								<td>--</td>
								<td>{l.rate}%</td>
								<td className="price bold">
									₦ {formatCurrency(l.amount)}
								</td>
								<td className="text-center">
									{l.status === "success" ? (
										<img src={SuccessIcon} />
									) : l.status === "pending" ? (
										<img src={PendingIcon} />
									) : (
										<img src={FailedIcon} />
									)}
								</td>
							</tr>
						))}
					</tbody>
				)}
			</Table>
		</div>
	);
};

export default Earned;
