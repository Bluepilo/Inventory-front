import { useEffect, useState } from "react";
import { Avatar, UploadWrapper } from "../../styles/basic.styles";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Form } from "../../styles/form.styles";
import { WideButton } from "../../styles/links.styles";
import { displayError } from "../../utils/errors";
import basicService from "../../redux/features/basic/basic-service";
import { toast } from "react-toastify";
import { userProfile } from "../../redux/features/auth/auth-slice";
import Loading from "../Loaders/Loading";

const PersonalProfile = ({ close }: { close: () => void }) => {
	const dispatch = useAppDispatch();

	const { details, token } = useAppSelector((state) => state.auth);

	const [load, setLoad] = useState(false);
	const [uploading, setUploading] = useState(false);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [image, setImage] = useState("");
	const [lastName, setLastName] = useState("");
	const [username, setUsername] = useState("");
	const [address, setAddress] = useState("");

	useEffect(() => {
		if (details.id) {
			setName(details.firstName);
			setEmail(details.email);
			setPhone(details.phoneNo);
			setLastName(details.lastName);
			setUsername(details.username);
			setImage(details.image);
			setAddress(details.address);
		}
	}, []);

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
					submitHandler(data.secure_url);
				})
				.catch((err) => {
					setUploading(false);
					displayError(err, true);
				});
		}
	};

	const submitHandler = async (img: string) => {
		const payload = {
			image: img || image,
			firstName: name,
			lastName,
			phoneNo: phone,
			address,
			username,
		};
		try {
			setLoad(true);
			await basicService.updateUser(token, payload, details.id);
			close();
			toast.success("User has been updated");
			dispatch(userProfile(details.id));
		} catch (err) {
			setLoad(false);
			displayError(err, true);
		}
	};

	return (
		<div>
			<Avatar>
				{details.image ? <img src={details.image} /> : <span />}
				<UploadWrapper>
					<div className="upload-btn-wrapper">
						<button className="btn wide">
							{uploading
								? "Hold on..."
								: details.image
								? "Change Logo"
								: "Upload Logo"}
						</button>
						<input
							disabled={uploading}
							type="file"
							name="myfile"
							onChange={fileUpload}
						/>
					</div>
				</UploadWrapper>
			</Avatar>
			<Form
				onSubmit={(e) => {
					e.preventDefault();
					submitHandler("");
				}}
				className="mt-3"
			>
				<div className="row">
					<div className="col-lg-6">
						<label>First Name</label>
						<input
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="height"
						/>
					</div>
					<div className="col-lg-6">
						<label>Last Name</label>
						<input
							type="text"
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
							className="height"
						/>
					</div>
					<div className="col-lg-6">
						<label>Email</label>
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							disabled={true}
							className="height"
						/>
					</div>
					<div className="col-lg-6">
						<label>Phone</label>
						<input
							type="tel"
							value={phone}
							onChange={(e) => setPhone(e.target.value)}
							required
							disabled={load}
							className="height"
						/>
					</div>
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
						<label>Address</label>
						<input
							type="text"
							value={address}
							onChange={(e) => setAddress(e.target.value)}
							disabled={load}
							className="height"
						/>
					</div>
				</div>
				<div>
					{load ? (
						<Loading />
					) : (
						<WideButton disabled={load} type="submit">
							<span>Update Changes</span>
						</WideButton>
					)}
				</div>
			</Form>
		</div>
	);
};

export default PersonalProfile;
