import { Table } from "../../../../styles/table.styles";
import dateFormat from "dateformat";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../../../utils/currency";
import SuccessIcon from "../../../../assets/icons/success.svg";
import PendingIcon from "../../../../assets/icons/pending.svg";
import FailedIcon from "../../../../assets/icons/failed.svg";
import rewardService from "../../../../redux/features/rewards/reward-service";
import { displayError, displaySuccess } from "../../../../utils/errors";
import { useAppSelector } from "../../../../redux/hooks";
import { Drop } from "../../../../styles/basic.styles";
import { HiDotsVertical } from "react-icons/hi";
import { useState } from "react";
import ModalComponent from "../../../../components/ModalComponent";
import ResolveClaims from "../../../../components/Reward/ResolveClaims";

const Earned = ({
	list,
	load,
	reloadList,
	setLoad,
}: {
	list: any;
	load: boolean;
	reloadList: () => void;
	setLoad: (arg: boolean) => void;
}) => {
	const { token } = useAppSelector((state) => state.auth);

	const [id, setId] = useState("");
	const [openModal, setOpenModal] = useState(false);

	const getName = (str: string) => {
		return str.replace(/ /g, "-");
	};

	const resolveClaim = async (type: string, val: string) => {
		if (window.confirm(`Are you sure you want to resolve this?`)) {
			try {
				setLoad(true);
				await rewardService.resolveEarnedReward(token, val, {
					action: type,
				});
				setLoad(false);
				displaySuccess("Completed!");
				reloadList();
			} catch (err) {
				displayError(err, true);
				setLoad(false);
			}
		}
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
						<th>Status</th>
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
										<Drop>
											<Drop.Toggle
												size="sm"
												id="dropdown-basic"
											>
												<HiDotsVertical />
											</Drop.Toggle>
											<Drop.Menu>
												<Drop.Item
													href="#"
													onClick={(e) => {
														e.preventDefault();
														setId(l.id);
														setOpenModal(true);
													}}
												>
													Resolve
												</Drop.Item>
											</Drop.Menu>
										</Drop>
									) : (
										<img src={FailedIcon} />
									)}
								</td>
							</tr>
						))}
					</tbody>
				)}
			</Table>
			<ModalComponent
				open={openModal}
				close={() => setOpenModal(false)}
				title={"Resolve Earning"}
			>
				<ResolveClaims
					changeType={(id, type) => {
						setOpenModal(false);
						resolveClaim(id, type);
					}}
					id={id}
				/>
			</ModalComponent>
		</div>
	);
};

export default Earned;
