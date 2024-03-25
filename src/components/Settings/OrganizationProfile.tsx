import { useEffect, useState } from "react";
import { Avatar, UploadWrapper } from "../../styles/basic.styles";
import { useAppSelector } from "../../redux/hooks";
import { Form } from "../../styles/form.styles";
import { WideButton } from "../../styles/links.styles";

const OrganizationProfile = ({ close }: { close: (arg: string) => void }) => {
	const { details } = useAppSelector((state) => state.auth);

	const [load, setLoad] = useState(false);
	const [uploading, setUploading] = useState(false);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");

	useEffect(() => {
		if (details.organization) {
			setName(details.organization.name);
			setEmail(details.organization.email);
			setPhone(details.organization.phone);
			setFirstName(details.organization.ownerFirstName);
			setLastName(details.organization.ownerLastName);
		}
	}, []);

	const fileUpload = () => {};

	const submitHandler = () => {};

	const closeAccount = () => {
		close("close");
	};

	return (
		<div>
			<Avatar>
				{details.organization?.image ? (
					<img src={details.organization.image} />
				) : (
					<span />
				)}
				<UploadWrapper>
					<div className="upload-btn-wrapper">
						<button className="btn wide">
							{uploading
								? "Hold on..."
								: details.organization?.image
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
			<Form onSubmit={submitHandler} className="mt-3">
				<div className="row">
					<div className="col-lg-6">
						<label>Organization Name</label>
						<input
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
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
							disabled={load}
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
						<label>Owner Surname</label>
						<input
							type="text"
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
							required
							disabled={load}
							className="height"
						/>
					</div>
					<div className="col-lg-6">
						<label>Owner First Name</label>
						<input
							type="text"
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
							required
							disabled={load}
							className="height"
						/>
					</div>
				</div>
				<div>
					<WideButton
						onClick={(e) => {
							e.preventDefault();
						}}
						disabled={load}
					>
						<span>Update Changes</span>
					</WideButton>
				</div>
			</Form>
			<div className="mt-4">
				<WideButton
					bg="red"
					onClick={() => closeAccount()}
					disabled={load}
				>
					<span>Close Account</span>
				</WideButton>
			</div>
		</div>
	);
};

export default OrganizationProfile;
