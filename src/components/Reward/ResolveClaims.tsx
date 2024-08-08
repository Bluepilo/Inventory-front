import React, { useState } from "react";
import { Form } from "../../styles/form.styles";
import { ButtonSubmit } from "../../styles/links.styles";

const ResolveClaims = ({
	id,
	changeType,
}: {
	id: string;
	changeType: (arg: string, id: string) => void;
}) => {
	const [action, setAction] = useState("");

	const submitHandler = (e: any) => {
		e.preventDefault();
		changeType(action, id);
	};

	return (
		<Form onSubmit={submitHandler}>
			<div className="row">
				<div className="col-lg-12">
					<label>Select Action</label>
					<select
						value={action}
						onChange={(e) => setAction(e.target.value)}
						required
						className="height"
					>
						<option value={""}>Select One</option>
						<option value={"approve"}>Approved</option>
						<option value={"dispute"}>Disputed</option>
						<option value={"rejected"}>Rejected</option>
					</select>
				</div>
			</div>
			<div className="mt-3">
				<ButtonSubmit type="submit">Resolve</ButtonSubmit>
			</div>
		</Form>
	);
};

export default ResolveClaims;
