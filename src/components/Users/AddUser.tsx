import React, { useEffect, useState } from "react";
import { Form } from "../../styles/form.styles";
import { ButtonSubmit } from "../../styles/links.styles";
import { displayError } from "../../utils/errors";
import customerService from "../../redux/features/customer/customer-services";
import { useAppSelector } from "../../redux/hooks";
import { toast } from "react-toastify";
import Loading from "../Loaders/Loading";
import { UploadWrapper } from "../../styles/basic.styles";
import { useNavigate } from "react-router-dom";
import adminService from "../../redux/features/admin/admin-service";

const AddUser = ({
	onComplete,
	editDetails,
	admin,
	roles,
}: {
	editDetails: any;
	onComplete: () => void;
	admin?: boolean;
	roles?: any;
}) => {
	const navigate = useNavigate();

	const [load, setLoad] = useState(false);
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [address, setAddress] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	const [image, setImage] = useState("");
	const [uploading, setUploading] = useState(false);
	const [roleId, setRoleId] = useState("");

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
				image,
			};
			let res;
			if (editDetails?.id) {
				res = await customerService.updateUser(payload, editDetails.id);
			} else {
				if (admin) {
					res = await adminService.createUser({
						...payload,
						role: roleId,
					});
				} else {
					res = await customerService.createUser(payload);
				}
			}

			setLoad(false);
			if (res) {
				toast.success(
					`User has been ${editDetails?.id ? "updated" : "created."}`
				);
				onComplete();
				if (!editDetails?.id && !admin) {
					navigate(`/dashboard/users/${res.id}`);
				}
			}
		} catch (err) {
			setLoad(false);
			displayError(err, true);
		}
	};

	const fileUpload = (e: any) => {
		if (window.confirm("Upload Image?")) {
			let file = e.target.files[0];
			setUploading(true);
			const formData = new FormData();
			formData.append("file", file);
			formData.append("image", file);
			formData.append("upload_preset", "Bluepilo");
			formData.append("cloud_name", "dikkx8dz4");

			fetch("https://api.cloudinary.com/v1_1/dikkx8dz4/image/upload", {
				method: "POST",
				body: formData,
			})
				.then((res) => res.json())
				.then((data) => {
					setUploading(false);
					setImage(data.secure_url);
				})
				.catch((err) => {
					setUploading(false);
					console.log(err);
				});
		}
	};

	return (
		<Form onSubmit={submitHandler}>
			<div className="row">
				<div className="col-lg-6 mb-3">
					<UploadWrapper>
						{image ? (
							<div className="img-box">
								<a href={image} target="_blank">
									View Uploaded Image
								</a>
								<button onClick={() => setImage("")}>X</button>
							</div>
						) : (
							<div className="upload-btn-wrapper">
								<button className="btn wide">
									{uploading
										? "Hold on..."
										: `Click to ${
												editDetails?.image
													? "Change"
													: "Upload"
										  } image`}
								</button>
								<input
									disabled={uploading}
									type="file"
									name="myfile"
									onChange={fileUpload}
								/>
							</div>
						)}
					</UploadWrapper>
				</div>
				<div className="col-lg-6"></div>
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
				{admin && (
					<div className="col-lg-12">
						<label>Role</label>
						<select
							value={roleId}
							onChange={(e) => setRoleId(e.target.value)}
							required
							disabled={load}
							className="height"
						>
							<option value={""}>Select One</option>
							{roles?.map((role: any) => (
								<option value={role.id} key={role.id}>
									{role.name}
								</option>
							))}
						</select>
					</div>
				)}

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
