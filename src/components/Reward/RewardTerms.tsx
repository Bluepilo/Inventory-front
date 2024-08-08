import { useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { MainButton } from "../../styles/links.styles";
import { useNavigate } from "react-router-dom";
import { displayError } from "../../utils/errors";
import rewardService from "../../redux/features/rewards/reward-service";
import Loading from "../Loaders/Loading";

const RewardTerms = ({ close }: { close: () => void }) => {
	const navigate = useNavigate();

	const [load, setLoad] = useState(false);

	const { details, token } = useAppSelector((state) => state.auth);

	const acceptHandler = async () => {
		try {
			setLoad(true);
			await rewardService.acceptTerms(token);
			setLoad(false);
			close();
		} catch (err) {
			setLoad(false);
			displayError(err, true);
		}
	};

	const declineHandler = () => {
		close();
		navigate("/");
	};

	return (
		<div>
			<h6>Welcome, {details.firstName}. Earn while you use Bluepilo!</h6>
			<h5 className="text-center mt-3">Terms and Services</h5>
			<p>Mr Yemi will provide the writeups.</p>
			<div className="modal-footer">
				{load ? (
					<Loading />
				) : (
					<MainButton onClick={acceptHandler}>
						Yes, I accept
					</MainButton>
				)}
				<MainButton bg="red" onClick={declineHandler}>
					No, I don't.
				</MainButton>
			</div>
		</div>
	);
};

export default RewardTerms;
