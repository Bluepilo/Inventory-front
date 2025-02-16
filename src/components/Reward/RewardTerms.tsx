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

	const acceptHandler = async () => {
		try {
			setLoad(true);
			await rewardService.acceptTerms();
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
			<h5 className="text-center mt-3">
				Terms and Conditions for Bluepilo Inventory App's Referral
				Program:
			</h5>
			<h6>Eligibility:</h6>
			<ul>
				<li>
					The referral program is open to all users of Bluepilo
					inventory app who are at least 18 years old.
				</li>
			</ul>
			<h6>Referral Process:</h6>
			<ul>
				<li>
					Users can refer friends, family, or colleagues by sharing a
					unique referral link or code.
				</li>
				<li>
					Referrals must be new customers to the inventory app
					company.
				</li>
				<li>
					Referrers will only receive rewards for successful referrals
					who have subscribed.
				</li>
			</ul>
			<h6>Reward System:</h6>
			<ul>
				<li>
					Referrers will receive rewards for each successful referral
					that subscribes to a plan.
				</li>
				<li>
					The reward structure will be outlined by the company and may
					include discounts, credits, or other incentives.
				</li>
				<li>
					Rewards are not transferable and hold cash value payable
					into the user's bank account.
				</li>
			</ul>
			<h6>Prohibited Activities:</h6>
			<ul>
				<li>
					Users must not engage in fraudulent or misleading activities
					to gain referrals.
				</li>
				<li>
					Trify Link Limited reserves the right to disqualify users
					violating the program's terms.
				</li>
			</ul>
			<h6>Modification and Termination:</h6>
			<ul>
				<li>
					Bluepilo inventory app can modify or terminate the referral
					program without prior notice.
				</li>
				<li>
					Changes to terms and conditions will be communicated through
					appropriate channels.
				</li>
			</ul>
			<h6>Limitation of Liability:</h6>
			<ul>
				<li>
					Bluepilo and Trify Link Limited are not liable for any
					damages incurred from participating in the referral program.
				</li>
			</ul>
			<p>
				By participating, users agree to adhere to the set terms and
				conditions.
			</p>
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
