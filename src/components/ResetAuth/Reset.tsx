import { useState } from "react";
import { toast } from "react-toastify";
import { Form } from "../../styles/form.styles";
import { displayError } from "../../utils/errors";
import Loading from "../Loading";
import { ButtonSubmit } from "../../styles/links.styles";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import authService from "../../redux/features/auth/auth-service";
import { useNavigate } from "react-router-dom";

const Reset = ({
	email,
	setConfirm,
}: {
	email: string;
	setConfirm: (arg: boolean) => void;
}) => {
	const navigate = useNavigate();

	const [load, setLoad] = useState(false);

	const [token, setToken] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [showCPassword, setShowCPassword] = useState(false);

	const resetHandler = async (e: any) => {
		e.preventDefault();
		try {
			setLoad(true);
			let res = await authService.resetPassword({
				email,
				token,
				newPassword: password,
				newPasswordConfirmation: confirmPassword,
			});
			setLoad(false);
			if (res) {
				navigate("/");
				toast.success("You can now Login");
			}
		} catch (err) {
			setLoad(false);
			displayError(err, true);
		}
	};

	return (
		<Form style={{ marginTop: "30px" }} onSubmit={resetHandler}>
			<label>Enter Token sent to {email}</label>
			<input
				type="text"
				value={token}
				onChange={(e) => setToken(e.target.value)}
				required
				className="no-m"
				disabled={load}
			/>
			<div className="forgot">
				<p>
					Didn't get the token? Click{" "}
					<a
						href="#"
						onClick={(e) => {
							e.preventDefault();
							setConfirm(false);
						}}
					>
						here
					</a>
				</p>
			</div>

			<label>New Password</label>
			<div className="pos">
				<input
					type={showPassword ? "text" : "password"}
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				<button
					onClick={(e) => {
						e.preventDefault();
						setShowPassword(!showPassword);
					}}
				>
					{showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
				</button>
			</div>
			<label>Confirm New Password</label>
			<div className="pos">
				<input
					type={showCPassword ? "text" : "password"}
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
					required
				/>
				<button
					onClick={(e) => {
						e.preventDefault();
						setShowCPassword(!showCPassword);
					}}
				>
					{showCPassword ? <FaRegEyeSlash /> : <FaRegEye />}
				</button>
			</div>
			<div className="mt-5">
				{load ? (
					<Loading />
				) : (
					<ButtonSubmit type="submit">Reset</ButtonSubmit>
				)}
			</div>
		</Form>
	);
};

export default Reset;
