import { TrialBox } from "../../styles/home.styles";
import basicService from "../../redux/features/basic/basic-service";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { userProfile } from "../../redux/features/auth/auth-slice";

const Trial = ({ closeTrial }: { closeTrial: () => void }) => {
	const dispatch = useAppDispatch();

	const { details, token } = useAppSelector((state) => state.auth);

	const pickFreeTrial = async () => {
		closeTrial();
		try {
			await basicService.saveTrialPick();
			saveTrialPick();
		} catch (err) {
			saveTrialPick();
		}
	};

	const saveTrialPick = async () => {
		closeTrial();
		try {
			await basicService.updateOnboardingSteps(
				{
					steps: {
						...details?.business?.onboardingSteps,
						trialPick: "completed",
					},
				},
				token
			);
			dispatch(userProfile(details.id));
		} catch (err) {}
	};

	return (
		<TrialBox>
			<h5>Start with a free plan that suits your business need.</h5>
			<div className="pick">
				<div>
					<h6>Free Forever Plan</h6>
					<p>One Business Location, One User</p>
				</div>
				<button className="active" onClick={saveTrialPick}>
					Pick
				</button>
			</div>
			<div className="pick bord">
				<div>
					<h6>Premium Plan 14 days Trial</h6>
					<p>
						Multiple business Locations, Multiple Users and lots
						more
					</p>
				</div>
				<button className="active" onClick={pickFreeTrial}>
					Pick
				</button>
			</div>
			<a
				href="#"
				className="cancels"
				onClick={(e) => {
					e.preventDefault();
					saveTrialPick();
				}}
			>
				Cancel
			</a>
		</TrialBox>
	);
};

export default Trial;
