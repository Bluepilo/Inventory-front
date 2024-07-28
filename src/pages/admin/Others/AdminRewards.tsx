import React, { useEffect, useState } from "react";
import { displayError } from "../../../utils/errors";
import rewardService from "../../../redux/features/rewards/reward-service";
import { useAppSelector } from "../../../redux/hooks";
import TitleCover from "../../../components/TitleCover";

const AdminRewards = () => {
	const { token } = useAppSelector((state) => state.auth);

	const [load, setLoad] = useState(false);

	let filters = ``;

	useEffect(() => {
		getRewards();
	}, [filters]);

	const getRewards = async () => {
		try {
			setLoad(true);
			await rewardService.getAdminRewards(token, filters);
			setLoad(false);
		} catch (err) {
			setLoad(false);
			displayError(err, true);
		}
	};

	return (
		<div>
			<TitleCover title="All Rewards" />
		</div>
	);
};

export default AdminRewards;
