import { useState } from "react";
import { Form } from "../../styles/form.styles";
import { ButtonSubmit } from "../../styles/links.styles";
import AddIcon from "../../assets/icons/user-add.svg";
import { PhoneNumberInput } from "../Filters/BasicInputs";

const NewCustomer = ({ submit }: { submit: (arg: any) => void }) => {
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [address, setAddress] = useState("");
	const [email, setEmail] = useState("");

	const submitHandler = async (e: any) => {
		e.preventDefault();
		let obj = {
			id: "",
			fullName: name,
			email: email,
			address: address,
			phoneNo: phone,
			value: 9000000000,
		};
		submit(obj);
	};

	return (
		<>
			<h5>Create New Customer</h5>
			<Form style={{ marginTop: "30px" }} onSubmit={submitHandler}>
				<label>Name of Customer</label>
				<input
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
					required
				/>
				<label>Phone Number</label>
				<PhoneNumberInput value={phone} setValue={setPhone} />
				<label>Email</label>
				<input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<label>Address</label>
				<textarea
					value={address}
					onChange={(e) => setAddress(e.target.value)}
				/>
				<div className="mt-2">
					<ButtonSubmit type="submit">
						<span>Add Customer</span>
						<img src={AddIcon} />
					</ButtonSubmit>
				</div>
			</Form>
		</>
	);
};

export default NewCustomer;
