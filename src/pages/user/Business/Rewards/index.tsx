import React, { useEffect, useState } from "react";
import TitleCover from "../../../../components/TitleCover";
import { displayError } from "../../../../utils/errors";
import rewardService from "../../../../redux/features/rewards/reward-service";
import { useAppSelector } from "../../../../redux/hooks";
import { SummaryCard } from "../../../../styles/dashboard.styles";
import { formatCurrency } from "../../../../utils/currency";
import { TableComponent } from "../../../../styles/table.styles";

const Rewards = () => {
	const { token } = useAppSelector((state) => state.auth);

	const [balance, setBalance] = useState("");

	useEffect(() => {
		window.scrollTo(0, 0);
		getRewards();
		getLogs();
	}, []);

	const getRewards = async () => {
		try {
			let res = await rewardService.getWallet(token);
			setBalance(res?.balance);
		} catch (err) {
			displayError(err, true);
		}
	};

	const getLogs = async () => {
		try {
			let res = await rewardService.getLogs(token);
		} catch (err) {
			displayError(err, true);
		}
	};

	return (
		<div>
			<TitleCover title="My Rewards" />
			<div className="row align-items-center mt-4">
				<div className="col-lg-6 mb-3">
					<SummaryCard>
						<div>
							<h6>Balance:</h6>
							<h6>
								{balance
									? `₦ ${formatCurrency(balance)}`
									: "--"}
							</h6>
						</div>
					</SummaryCard>
				</div>
			</div>
			<div className="mt-4">
				<TableComponent>
					<div className="table-responsive"></div>
				</TableComponent>
			</div>
		</div>
	);
};

export default Rewards;
