import React from "react";
import { FormBody } from "../../../styles/form.styles";
import Logo from "../../../assets/images/logo.svg";
import { ConfirmStyle } from "../../../styles/sub.styles";
import { MainButton } from "../../../styles/links.styles";
import { useNavigate } from "react-router-dom";

const PaymentConfirm = () => {
	const navigate = useNavigate();

	return (
		<div className="container mt-5">
			<div className="row justify-content-center">
				<div className="col-md-6">
					<FormBody>
						<ConfirmStyle>
							<img src={Logo} />
							<p>Your Payment has been processed.</p>
							<p>It will be credited into your wallet.</p>

							<MainButton
								onClick={() =>
									navigate("/dashboard/subscription")
								}
							>
								<span>Check Wallet Balance</span>
							</MainButton>
						</ConfirmStyle>
					</FormBody>
				</div>
			</div>
		</div>
	);
};

export default PaymentConfirm;
