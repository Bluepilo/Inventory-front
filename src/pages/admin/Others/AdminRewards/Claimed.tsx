import { Table } from "../../../../styles/table.styles";
import dateFormat from "dateformat";
import { formatCurrency } from "../../../../utils/currency";
import SuccessIcon from "../../../../assets/icons/success.svg";
import { Drop } from "../../../../styles/basic.styles";
import { HiDotsVertical } from "react-icons/hi";
import { displayError, displaySuccess } from "../../../../utils/errors";
import rewardService from "../../../../redux/features/rewards/reward-service";
import { useAppSelector } from "../../../../redux/hooks";
import ModalComponent from "../../../../components/ModalComponent";
import { useState } from "react";
import AccountDetailsInfo from "../../../../components/Reward/AccountDetailsInfo";

const Claimed = ({
	list,
	reloadList,
	load,
	setReferral,
	setLoad,
}: {
	list: any;
	reloadList: () => void;
	load: boolean;
	setReferral: (arg: any) => void;
	setLoad: (arg: boolean) => void;
}) => {
	const [openModal, setOpenModal] = useState(false);
	const [account, setAccount] = useState<any>({});

	const { token } = useAppSelector((state) => state.auth);

	const resolveClaim = async (val: any) => {
		if (window.confirm(`Are you sure you want to resolve this?`)) {
			try {
				setLoad(true);
				await rewardService.resolveClaimReward(token, val.id);
				setLoad(false);
				displaySuccess("Reward Claimed");
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
						<th>Activity</th>
						<th>Account</th>
						<th className="price">Amount</th>
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
									<a
										href="#"
										onClick={(e) => {
											e.preventDefault();
											setReferral(l.user);
										}}
									>
										{l.user?.fullName}
									</a>
								</td>
								<td>{l.activity}</td>
								<td className="link">
									<a
										href="#"
										onClick={(e) => {
											e.preventDefault();
											setAccount(l.account);
											setOpenModal(true);
										}}
									>
										View Details
									</a>
								</td>
								<td className="price bold">
									₦ {formatCurrency(l.amount)}
								</td>
								<td className="text-center">
									{l.status === "success" ? (
										<img src={SuccessIcon} />
									) : (
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
														resolveClaim(l);
													}}
												>
													Resolve
												</Drop.Item>
											</Drop.Menu>
										</Drop>
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
				title="Account Details"
			>
				<AccountDetailsInfo detail={account} />
			</ModalComponent>
		</div>
	);
};

export default Claimed;
