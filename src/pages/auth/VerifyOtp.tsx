import { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { useLocation, useNavigate } from "react-router-dom";
import AuthProgress from "../../components/Auth/AuthProgress";
import { OTPStyle, ResendBox } from "../../styles/auth.styles";
import { MainButton } from "../../styles/links.styles";
import { displayError } from "../../utils/errors";
import authService from "../../redux/features/auth/auth-service";
import { useAppDispatch } from "../../redux/hooks";
import { saveToken } from "../../redux/features/auth/auth-slice";
import LoadModal from "../../components/Loaders/LoadModal";
import { toast } from "react-toastify";

const VerifyOtp = () => {
	const dispatch = useAppDispatch();

	const navigate = useNavigate();

	const email = useLocation().state?.email;

	const [load, setLoad] = useState(false);
	const [otp, setOtp] = useState("");

	useEffect(() => {
		if (!email) {
			navigate("/");
		}
	}, [email]);

	const changeOtp = async (val: string) => {
		setOtp(val);
		if (val.length === 5) {
			try {
				setLoad(true);
				let res = await authService.verifyOtp({ email, code: val });
				setLoad(false);
				if (res && res?.accessToken) {
					dispatch(saveToken(res.accessToken));
				}
				console.log(res, "RES");
				navigate("/add-business", { state: { id: res?.user?.id } });
			} catch (err) {
				setLoad(false);
				displayError(err, true);
			}
		}
	};

	const resendHandler = async () => {
		try {
			setLoad(true);
			await authService.resendOTP({ email });
			setLoad(false);
			toast.success("OTP has been sent!");
		} catch (err) {
			setLoad(false);
			displayError(err, true);
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
				<MainButton sm="true" onClick={resendHandler}>
					Resend OTP
				</MainButton>
			</ResendBox>
			{load && <LoadModal open={true} />}
		</div>
	);
};

export default VerifyOtp;
