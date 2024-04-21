import { TrialBox } from "../../styles/home.styles";

const Trial = ({ closeTrial }: { closeTrial: () => void }) => {
	const saveTrialPick = async () => {
		closeTrial();
	};

	return (
		<TrialBox>
			<h5>You are welcome</h5>
			<p>Congratulations, you are currently on 30days Premium trial!</p>
			<div className="text-center">
				<button className="active" onClick={saveTrialPick}>
					Create Business
				</button>
			</div>
		</TrialBox>
	);
};

export default Trial;
