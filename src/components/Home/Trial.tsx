import { TrialBox } from "../../styles/home.styles";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { updateOnboardingSteps } from "../../redux/features/basic/basic-slice";

const Trial = ({ closeTrial }: { closeTrial: () => void }) => {
	const dispatch = useAppDispatch();

	const { details } = useAppSelector((state) => state.auth);

	const saveTrialPick = async () => {
		closeTrial();
		dispatch(
			updateOnboardingSteps({
				steps: {
					...details?.business?.onboardingSteps,
					trialPick: "completed",
				},
			})
		);
	};

	return (
		<TrialBox>
			<h5>Welcome, {details.firstName}</h5>
			<p>Congratulations, you are currently on 30days Premium trial!</p>
			<div className="text-center">
				<button className="active" onClick={saveTrialPick}>
					Start Onboarding
				</button>
			</div>
		</TrialBox>
	);
};

export default Trial;
