import React, { useState } from "react";
import { Form } from "../../styles/form.styles";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import Loading from "../Loaders/Loading";
import { ButtonSubmit } from "../../styles/links.styles";
import { displayError } from "../../utils/errors";
import customerService from "../../redux/features/customer/customer-services";
import { useAppSelector } from "../../redux/hooks";
import { toast } from "react-toastify";

const ChangePassword = ({ detail, close }: { detail: any; close: any }) => {
	const { token } = useAppSelector((state) => state.auth);

	const [load, setLoad] = useState(false);
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const submitHandler = async (e: any) => {
		try {
			setLoad(true);
			await customerService.changePassword(
				token,
				{
					password,
					passwordConfirmation: confirmPassword,
				},
				detail.id
			);
			setLoad(false);
			toast.success("Password has been changed.");
			close();
		} catch (err) {
			setLoad(false);
			displayError(err, true);
		}
	};

	return (
		<Form onSubmit={submitHandler}>
			<h5 className="mb-3">Change Password</h5>
			<div className="row">
				<div className="col-lg-12">
					<label>Password</label>
					<div className="pos">
						<input
							type={showPassword ? "text" : "password"}
							value={password}
							onChange={(e) => setPassword(e.target.value)}
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
							{showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
						</button>
					</div>
				</div>
				<div className="col-lg-12">
					<label>Confirm Password</label>
					<div className="pos">
						<input
							type={showConfirmPassword ? "text" : "password"}
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
							disabled={load}
							className="height"
						/>
						<button
							onClick={(e) => {
								e.preventDefault();
								setShowConfirmPassword(!showConfirmPassword);
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
				<div className="col-lg-12">
					{load ? (
						<Loading />
					) : (
						<ButtonSubmit type="submit">
							Change Password
						</ButtonSubmit>
					)}
				</div>
			</div>
		</Form>
	);
};

export default ChangePassword;
