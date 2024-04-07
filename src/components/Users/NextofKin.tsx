import React, { useState } from "react";
import { Form } from "../../styles/form.styles";
import Loading from "../Loaders/Loading";
import { ButtonSubmit } from "../../styles/links.styles";
import { displayError } from "../../utils/errors";
import customerService from "../../redux/features/customer/customer-services";
import { useAppSelector } from "../../redux/hooks";
import { toast } from "react-toastify";

const NextofKin = ({ detail, close }: { detail: any; close: any }) => {
	const { token } = useAppSelector((state) => state.auth);

	const [nokName, setNokName] = useState(detail.nokName);
	const [nokEmail, setNokEmail] = useState("");
	const [nokPhoneNo, setNokPhoneNo] = useState("");
	const [nokAddress, setNokAddress] = useState("");
	const [load, setLoad] = useState(false);

	const submitHandler = async (e: any) => {
		e.preventDefault();
		let payload = {
			nokEmail,
			nokName,
			nokAddress,
			nokPhoneNo,
		};
		try {
			setLoad(true);
			let res = await customerService.updateUser(
				token,
				payload,
				detail.id
			);
			setLoad(false);
			if (res) {
				toast.success("Next of Kin details has been updated.");
				close();
			}
		} catch (err) {
			setLoad(false);
			displayError(err, true);
		}
	};

	return (
		<Form onSubmit={submitHandler}>
			<h5 className="mb-3">Next Of Kin</h5>
			<div className="row">
				<div className="col-lg-6">
					<label>Full Name</label>
					<input
						type="text"
						value={nokName}
						onChange={(e) => setNokName(e.target.value)}
						required
						disabled={load}
						className="height"
					/>
				</div>
				<div className="col-lg-6">
					<label>Email</label>
					<input
						type="email"
						value={nokEmail}
						onChange={(e) => setNokEmail(e.target.value)}
						required
						disabled={load}
						className="height"
					/>
				</div>
				<div className="col-lg-6">
					<label>Phone Number</label>
					<input
						type="tel"
						value={nokPhoneNo}
						onChange={(e) => setNokPhoneNo(e.target.value)}
						required
						disabled={load}
						className="height"
					/>
				</div>
				<div className="col-lg-6">
					<label>Address</label>
					<input
						type="text"
						value={nokAddress}
						onChange={(e) => setNokAddress(e.target.value)}
						required
						disabled={load}
						className="height"
					/>
				</div>
				<div className="col-lg-12">
					{load ? (
						<Loading />
					) : (
						<ButtonSubmit type="submit">Update</ButtonSubmit>
					)}
				</div>
			</div>
		</Form>
	);
};

export default NextofKin;
