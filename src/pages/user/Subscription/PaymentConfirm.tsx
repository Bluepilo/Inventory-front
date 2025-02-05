import React, { useEffect, useState } from "react";
import { FormBody } from "../../../styles/form.styles";
import Logo from "../../../assets/images/logo-dark.png";
import { ConfirmStyle } from "../../../styles/sub.styles";
import { MainButton } from "../../../styles/links.styles";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { userProfile } from "../../../redux/features/auth/auth-slice";
import subscriptionService from "../../../redux/features/subscription/subscriptionService";
import Loading from "../../../components/Loaders/Loading";

const PaymentConfirm = () => {
	const [search] = useSearchParams();

	let params = search.get("trxref");

	const dispatch = useAppDispatch();

	const { details, token } = useAppSelector((state) => state.auth);

	const [load, setLoad] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		verifyHandler();
	}, []);

	const verifyHandler = async () => {
		try {
			setLoad(true);
			await subscriptionService.verifyPayment(token, params || "");
			setLoad(false);
			dispatch(userProfile(details.id));
		} catch (err) {
			dispatch(userProfile(details.id));
			setLoad(false);
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
							<p>It will be credited into your wallet.</p>
							{load ? (
								<Loading />
							) : (
								<MainButton
									onClick={() =>
										navigate("/dashboard/subscription")
									}
								>
									<span>Check Wallet Balance</span>
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
