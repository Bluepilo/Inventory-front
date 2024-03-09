import { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { useLocation, useNavigate } from "react-router-dom";
import AuthProgress from "../../components/Auth/AuthProgress";
import { OTPStyle, ResendBox } from "../../styles/auth.styles";
import { MainButton } from "../../styles/links.styles";

const VerifyOtp = () => {
	const navigate = useNavigate();

	const email = useLocation().state?.email;

	const [load, setLoad] = useState(false);
	const [otp, setOtp] = useState("");

	useEffect(() => {
		if (!email) {
			navigate("/");
		}
	}, [email]);

	const changeOtp = (val: string) => {
		setOtp(val);
		if (val.length === 6) {
			navigate("/add-business");
		}
	};

	return (
		<div style={{ padding: "0 5%" }}>
			<h5 className="text-center">Verify OTP</h5>
			<AuthProgress step={2} />

			<OTPStyle>
				<h6>Enter the OTP we just sent to your email</h6>
				<OTPInput
					value={otp}
					onChange={changeOtp}
					numInputs={6}
					renderSeparator={<span></span>}
					renderInput={(props) => (
						<input {...props} disabled={load} />
					)}
					inputStyle={{
						width: 60,
						height: 60,
						marginRight: 20,
						paddingLeft: 1,
					}}
					inputType="number"
				/>
			</OTPStyle>
			<ResendBox>
				<p>{email}</p>
				<MainButton sm="true">Resend OTP</MainButton>
			</ResendBox>
		</div>
	);
};

export default VerifyOtp;
