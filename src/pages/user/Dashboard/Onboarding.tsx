import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { HelpBox, OnboardingStyles } from "../../../styles/home.styles";
import { onboardingsteps } from "../../../utils/data";
import OnboardStep from "../../../components/Home/OnboardStep";
import BouyIcon from "../../../assets/icons/lifebouy.svg";
import PhoneIcon from "../../../assets/icons/phone.svg";
import { MainLink } from "../../../styles/links.styles";
import { useEffect } from "react";
import { updateOnboardingSteps } from "../../../redux/features/basic/basic-slice";

const Onboarding = () => {
	const dispatch = useAppDispatch();

	const { details } = useAppSelector((state) => state.auth);

	useEffect(() => {
		saveTrialPick();
	}, []);

	const saveTrialPick = () => {
		if (details.business.onboardingSteps?.trialPick !== "completed") {
			sendTrialPick();
		}
	};

	const sendTrialPick = async () => {
		dispatch(
			updateOnboardingSteps({
				steps: {
					...details?.business?.onboardingSteps,
					trialPick: "completed",
				},
			})
		);
	};
	return details?.business ? (
		<div className="mt-3">
			<div className="row">
				<div className="col-lg-6 mb-3">
					<OnboardingStyles>
						<div className="head">
							<h5>
								{details.firstName},{" "}
								<span>Welcome to BluePilo</span>
							</h5>
							<p>
								Congratulations on choosing BluePilo for your
								business!
							</p>
							<p>
								<strong>
									Let's set up your inventory quickly for a
									seamless experience.
								</strong>
							</p>
						</div>
						<div className="steps">
							{onboardingsteps.map((step) => (
								<OnboardStep step={step} key={step.id} />
							))}
						</div>
					</OnboardingStyles>
				</div>

				<div className="col-lg-5 mb-3">
					<HelpBox>
						<div className="up">
							<img src={BouyIcon} alt="Icon" />
							<h5>Need help with the onboarding?</h5>
						</div>
						<div className="down">
							<div className="first">
								<p>
									Book a 30 minutes session with our
									onboarding experts for <span>FREE</span>
								</p>
								<MainLink
									href="https://bluepilo.com/book-an-appointment/"
									target="_blank"
								>
									<img src={PhoneIcon} />
									<span>Book Free Support</span>
								</MainLink>
							</div>
							<div className="first bord">
								<p>
									Click to Watch our 3 Minutes getting started
									video
								</p>
								<div className="ratio ratio-16x9">
									<iframe
										src={
											"https://www.youtube.com/embed/_ASINfSrD2Q?si=td8P3IGJtOON0QFv"
										}
										title={"About Bluepilo"}
										frameBorder="0"
										allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
										allowFullScreen
									></iframe>
								</div>
							</div>
						</div>
					</HelpBox>
				</div>
			</div>
		</div>
	) : (
		<></>
	);
};

export default Onboarding;
