import React, { useState } from "react";
import { Form } from "../../styles/form.styles";
import basicService from "../../redux/features/basic/basic-service";
import { toast } from "react-toastify";
import { logout } from "../../redux/features/auth/auth-slice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { displayError } from "../../utils/errors";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { MainButton } from "../../styles/links.styles";
import { Spinner } from "react-bootstrap";

const DeleteBusinessModal = ({
	closeModal,
	logMeOut,
}: {
	closeModal: () => void;
	logMeOut?: boolean;
}) => {
	const dispatch = useAppDispatch();

	const { details } = useAppSelector((state) => state.auth);

	const [load, setLoad] = useState(false);
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const deleteHandler = async (e: any) => {
		e.preventDefault();
		try {
			setLoad(true);
			await basicService.deleteBusiness(details.businessId, {
				reason: "Delete Business",
				password,
			});
			toast.success("Business has been deleted.");
			closeModal();
			if (logMeOut) {
				dispatch(logout());
			}
		} catch (err) {
			setLoad(false);
			displayError(err, true);
		}
	};

	return (
		<Form onSubmit={deleteHandler}>
			<h6 className="mb-3">Your business will be deleted on Submit.</h6>
			<label>Enter Password</label>
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
			<div className="mt-3 text-center">
				{load ? (
					<Spinner style={{ marginLeft: "10px" }} />
				) : (
					<MainButton bg="#f44336" type="submit">
						<span>Delete Business</span>
					</MainButton>
				)}
			</div>
		</Form>
	);
};

export default DeleteBusinessModal;
