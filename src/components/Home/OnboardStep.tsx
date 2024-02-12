import { FaCircleCheck } from "react-icons/fa6";
import { useAppSelector } from "../../redux/hooks";
import { Link } from "react-router-dom";
import CheckIcon from "../../assets/icons/circle-check.svg";

interface Step {
	id: number;
	type: string;
	desc: string;
	title: string;
	title2?: string;
	icon: any;
	href: string;
}

const OnboardStep = ({ step }: { step: Step }) => {
	const { details } = useAppSelector((state) => state.auth);

	const getActiveClasss = () => {
		if (details.business.onboardingSteps[step.type] === "completed") {
			return "active";
		} else {
			return "";
		}
	};

	return (
		<div className={`step ${getActiveClasss()}`}>
			<div className="first">
				{getActiveClasss() === "active" ? (
					<img src={CheckIcon} />
				) : (
					<span>{step.id}</span>
				)}
				<div>
					<h6>
						<Link to={step.href}>{step.title}</Link>
						{step.title2 && <Link to={"/"}> {step.title2}</Link>}
					</h6>
					<p>{step.desc}</p>
				</div>
			</div>
			<img src={step.icon} alt={`${step.id}`} className="icon" />
		</div>
	);
};

export default OnboardStep;
