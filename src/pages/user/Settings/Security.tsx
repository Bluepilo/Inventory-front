import { useState } from "react";
import { Form, FormBody } from "../../../styles/form.styles";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { MainButton } from "../../../styles/links.styles";
import { displayError } from "../../../utils/errors";
import basicService from "../../../redux/features/basic/basic-service";
import { useAppDispatch } from "../../../redux/hooks";
import { logout } from "../../../redux/features/auth/auth-slice";
import { toast } from "react-toastify";
import LoadModal from "../../../components/Loaders/LoadModal";

const Security = () => {
	const dispatch = useAppDispatch();

	const [load, setLoad] = useState(false);
	const [password, setPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const [showPassword, setShowPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const submitHandler = async () => {
		if (password && newPassword && newPassword === confirmPassword) {
			try {
				let payload = {
					oldPassword: password,
					newPassword,
					newPasswordConfirmation: confirmPassword,
				};
				setLoad(true);
				await basicService.changePassword(payload);
				setLoad(false);
				dispatch(logout());
				toast.success("Password has been changed. Please login again.");
			} catch (err) {
				setLoad(false);
				displayError(err, true);
			}
		} else {
			toast.error("Passwords mismatch.");
		}
	};

	return (
		<div>
			<FormBody>
				<Form onSubmit={submitHandler}>
					<div className="row">
						<div className="col-md-4">
							<label>Current Password</label>
							<div className="pos">
								<input
									type={showPassword ? "text" : "password"}
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
									required
									disabled={load}
									className="height"
								/>
								<button
									onClick={(e) => {
										e.preventDefault();
										setShowPassword(!showPassword);
									}}
								>
									{showPassword ? (
										<FaRegEyeSlash />
									) : (
										<FaRegEye />
									)}
								</button>
							</div>
						</div>
						<div className="col-md-4">
							<label>New Password</label>
							<div className="pos">
								<input
									type={showNewPassword ? "text" : "password"}
									value={newPassword}
									onChange={(e) =>
										setNewPassword(e.target.value)
									}
									required
									disabled={load}
									className="height"
								/>
								<button
									onClick={(e) => {
										e.preventDefault();
										setShowNewPassword(!showNewPassword);
									}}
								>
									{showNewPassword ? (
										<FaRegEyeSlash />
									) : (
										<FaRegEye />
									)}
								</button>
							</div>
						</div>
						<div className="col-md-4">
							<label>Confirm New Password</label>
							<div className="pos">
								<input
									type={
										showConfirmPassword
											? "text"
											: "password"
									}
									value={confirmPassword}
									onChange={(e) =>
										setConfirmPassword(e.target.value)
									}
									required
									disabled={load}
									className="height"
								/>
								<button
									onClick={(e) => {
										e.preventDefault();
										setShowConfirmPassword(
											!showConfirmPassword
										);
									}}
								>
									{showConfirmPassword ? (
										<FaRegEyeSlash />
									) : (
										<FaRegEye />
									)}
								</button>
							</div>
						</div>
					</div>

					<div className="mt-2 text-end">
						<MainButton type="submit">
							<span>Change Password</span>
						</MainButton>
					</div>
				</Form>
			</FormBody>
			{load && <LoadModal open={true} />}
		</div>
	);
};

export default Security;
