import { useState } from "react";
import TitleCover from "../../../components/TitleCover";
import { Form, FormBody } from "../../../styles/form.styles";
import { CloseStyle, FlexBetween } from "../../../styles/basic.styles";
import { FiTrash2 } from "react-icons/fi";
import { MainButton } from "../../../styles/links.styles";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ModalComponent from "../../../components/ModalComponent";
import { displayError } from "../../../utils/errors";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { logout } from "../../../redux/features/auth/auth-slice";
import basicService from "../../../redux/features/basic/basic-service";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import LoadModal from "../../../components/Loaders/LoadModal";

const CloseAccount = () => {
	const navigate = useNavigate();

	const dispatch = useAppDispatch();

	const { token, details } = useAppSelector((state) => state.auth);

	const [openModal, setOpenModal] = useState(false);
	const [reason, setReason] = useState("");
	const [comment, setComment] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [load, setLoad] = useState(false);

	const closeHandler = () => {
		if (reason && comment) {
			setOpenModal(true);
		} else {
			toast.error("Please provide a reason and a comment.");
		}
	};

	const submitHandler = async (e: any) => {
		e.preventDefault();
		setOpenModal(false);
		try {
			setLoad(true);
			await basicService.closeAccount(token, details.organization.id, {
				reason,
				password,
				comment,
			});
			setLoad(false);
			dispatch(logout());
		} catch (err) {
			setLoad(false);
			displayError(err, true);
		}
	};

	return (
		<div>
			<TitleCover title={`Close Account`} />
			<div className="row mt-4">
				<div className="col-md-10">
					<FormBody style={{ border: "0.5px solid red" }}>
						<CloseStyle>
							<p>
								Permanent delete all the associated with the
								account and the apps you use.
							</p>
							<div className="svg">
								<span>
									<FiTrash2 color="#fff" />
								</span>
							</div>
							<h5>
								Closing your BluePilo account will permanently
								delete all your account information and you will
								no longer be able to use any of the BluePilo
								services.
							</h5>
							<Form className="mt-5">
								<div className="row">
									<div className="col-lg-6">
										<label>
											Why are you deleting your account?
										</label>
										<select
											className="height"
											value={reason}
											onChange={(e) =>
												setReason(e.target.value)
											}
										>
											<option value={""}></option>
											<option
												value={"This is a test account"}
											>
												This is a test account
											</option>
											<option
												value={"Got alternative app"}
											>
												Got alternative app
											</option>
											<option value={"Too Expensive"}>
												Too Expensive
											</option>
											<option
												value={
													"No needed functionality"
												}
											>
												No needed functionality
											</option>
											<option value={"Difficult to use"}>
												Difficult to use
											</option>
											<option value={"Others"}>
												Others
											</option>
										</select>
									</div>
									<div className="col-lg-6">
										<label>
											Write us a sentence on why you’re
											closing your account
										</label>
										<input
											type="text"
											value={comment}
											onChange={(e) =>
												setComment(e.target.value)
											}
											className="height"
										/>
									</div>
								</div>
							</Form>
							<FlexBetween>
								<MainButton bg="#f44336" onClick={closeHandler}>
									<span>Close Account</span>
								</MainButton>
								<MainButton
									onClick={() => navigate("/dashboard/home")}
									bg="#f5f5f5"
									color="#505BDA"
								>
									<span>Cancel</span>
								</MainButton>
							</FlexBetween>
						</CloseStyle>
					</FormBody>
				</div>
			</div>
			<ModalComponent
				open={openModal}
				close={() => setOpenModal(false)}
				title="Verify it is you!"
			>
				<Form onSubmit={submitHandler}>
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
						<MainButton bg="#f44336" type="submit">
							<span>Close</span>
						</MainButton>
					</div>
				</Form>
			</ModalComponent>
			{load && <LoadModal open={true} />}
		</div>
	);
};

export default CloseAccount;
