import React, { useEffect, useState } from "react";
import { Form } from "../../styles/form.styles";
import { ButtonSubmit } from "../../styles/links.styles";
import { displayError } from "../../utils/errors";
import customerService from "../../redux/features/customer/customer-services";
import { useAppSelector } from "../../redux/hooks";
import { toast } from "react-toastify";
import Loading from "../Loaders/Loading";

const AddUser = ({
	onComplete,
	editDetails,
}: {
	editDetails: any;
	onComplete: () => void;
}) => {
	const { token } = useAppSelector((state) => state.auth);

	const [load, setLoad] = useState(false);
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [address, setAddress] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");

	useEffect(() => {
		if (editDetails?.id) {
			setFirstName(editDetails.firstName);
			setLastName(editDetails.lastName);
			setEmail(editDetails.email);
			setPhone(editDetails.phoneNo);
			setUsername(editDetails.username);
			setAddress(editDetails.address);
		}
	}, [editDetails]);

	const submitHandler = async (e: any) => {
		e.preventDefault();
		try {
			setLoad(true);
			let payload = {
				firstName,
				lastName,
				email,
				address,
				password,
				phoneNo: phone,
				username,
			};
			let res;
			if (editDetails?.id) {
				res = await customerService.updateUser(
					token,
					payload,
					editDetails.id
				);
			} else {
				res = await customerService.createUser(token, payload);
			}

			setLoad(false);
			if (res) {
				toast.success(
					`User has been ${editDetails?.id ? "updated" : "created."}`
				);
				onComplete();
			}
		} catch (err) {
			setLoad(false);
			displayError(err, true);
		}
	};

	return (
		<Form onSubmit={submitHandler}>
			<div className="row">
				<div className="col-lg-6">
					<label>First Name</label>
					<input
						type="text"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						required
						disabled={load}
						className="height"
					/>
				</div>
				<div className="col-lg-6">
					<label>Last Name</label>
					<input
						type="text"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						disabled={load}
						className="height"
					/>
				</div>
				<div className="col-lg-6">
					<label>Email</label>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						disabled={load}
						className="height"
					/>
				</div>
				<div className="col-lg-6">
					<label>Mobile Number</label>
					<input
						type="tel"
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
						disabled={load}
						required
						className="height"
					/>
				</div>

				{!editDetails && (
					<>
						<div className="col-lg-6">
							<label>Username</label>
							<input
								type="text"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								required
								disabled={load}
								className="height"
							/>
						</div>
						<div className="col-lg-6">
							<label>Password</label>
							<input
								type="text"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
								disabled={load}
								className="height"
							/>
						</div>
					</>
				)}
				<div className="col-lg-12">
					<label>Address</label>
					<input
						type="text"
						value={address}
						onChange={(e) => setAddress(e.target.value)}
						disabled={load}
						className="height"
					/>
				</div>

				<div className="col-lg-12">
					{load ? (
						<Loading />
					) : (
						<ButtonSubmit>
							{editDetails?.id ? "Update" : "Create User"}
						</ButtonSubmit>
					)}
				</div>
			</div>
		</Form>
	);
};

export default AddUser;
