import React, { useState } from "react";
import { Form } from "../../../styles/form.styles";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import Loading from "../../Loaders/Loading";
import { WideButton } from "../../../styles/links.styles";
import { displayError } from "../../../utils/errors";
import adminService from "../../../redux/features/admin/admin-service";
import { useAppSelector } from "../../../redux/hooks";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const DeleteOrg = ({ id }: { id: string }) => {
	const navigate = useNavigate();

	const { token } = useAppSelector((state) => state.auth);

	const [reason, setReason] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [load, setLoad] = useState(false);

	const submitHandler = async (e: any) => {
		e.preventDefault();
		if (reason && password) {
			try {
				setLoad(true);
				await adminService.deleteOrg(token, id, { reason, password });
				setLoad(false);
				toast.success("Organization has been deleted.");
				navigate("/admin/organizations");
			} catch (err) {
				setLoad(false);
				displayError(err, true);
			}
		} else {
			alert("Provide both fields.");
		}
	};

	return (
		<div>
			<p>Are you sure you want to delete this organization?</p>
			<Form onSubmit={submitHandler}>
				<label>Reason</label>
				<input
					value={reason}
					onChange={(e) => setReason(e.target.value)}
					className="height"
				/>
				<label>Password</label>
				<div className="pos">
					<input
						className="height"
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
				{load ? (
					<Loading />
				) : (
					<WideButton type="submit" bg="red">
						<span>Delete Organization</span>
					</WideButton>
				)}
			</Form>
		</div>
	);
};

export default DeleteOrg;
