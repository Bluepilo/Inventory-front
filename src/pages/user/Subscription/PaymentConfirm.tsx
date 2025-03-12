import { useEffect, useState } from "react";
import { FormBody } from "../../../styles/form.styles";
import Logo from "../../../assets/images/logo-dark.png";
import { ConfirmStyle } from "../../../styles/sub.styles";
import { MainButton } from "../../../styles/links.styles";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../../../redux/hooks";
import { userProfile } from "../../../redux/features/auth/auth-slice";
import subscriptionService from "../../../redux/features/subscription/subscriptionService";
import Loading from "../../../components/Loaders/Loading";
import { toast } from "react-toastify";
import { displayError } from "../../../utils/errors";

const PaymentConfirm = () => {
	const [search] = useSearchParams();

	let params = search.get("trxref");
	let duration = search.get("duration");
	let id = search.get("id");

	const dispatch = useAppDispatch();

	const [load, setLoad] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		verifyHandler();
	}, []);

	const verifyHandler = async () => {
		try {
			setLoad(true);
			await subscriptionService.verifyPayment(params || "");
			setLoad(false);
			dispatch(userProfile());
			if (duration) {
				subscribeHandler();
			}
		} catch (err) {
			dispatch(userProfile());
			setLoad(false);
		}
	};

	const subscribeHandler = async () => {
		let req = {
			subscriptionPlanId: id,
			monthly: duration === "monthly" ? true : false,
			autoRenew: true,
		};
		try {
			setLoad(true);
			await subscriptionService.makeSubscription(req);
			setLoad(false);
			toast.success("Your subscription is successful");
			dispatch(userProfile());
		} catch (err) {
			setLoad(false);
			displayError(err, true);
		}
	};

	return (
		<div className="container mt-5">
			<div className="row justify-content-center">
				<div className="col-md-6">
					<FormBody>
						<ConfirmStyle>
							<img src={Logo} />
							<p>Your Payment has been processed.</p>
							{!duration && (
								<p>It will be credited into your wallet.</p>
							)}
							{load ? (
								<Loading />
							) : (
								<MainButton
									onClick={() =>
										navigate("/dashboard/subscription")
									}
								>
									<span>
										{duration
											? "Check Subscription"
											: "Check Wallet Balance"}
									</span>
								</MainButton>
							)}
						</ConfirmStyle>
					</FormBody>
				</div>
			</div>
		</div>
	);
};

export default PaymentConfirm;
