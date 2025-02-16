import React, { useState } from "react";
import { Form } from "../../../styles/form.styles";
import Loading from "../../Loaders/Loading";
import { WideButton } from "../../../styles/links.styles";
import { displayError, displaySuccess } from "../../../utils/errors";
import adminService from "../../../redux/features/admin/admin-service";
import { useAppSelector } from "../../../redux/hooks";

const ExtendTrial = ({ id, onClose }: { id: any; onClose: () => void }) => {
	const [load, setLoad] = useState(false);
	const [date, setDate] = useState("");

	const submitHandler = async (e: any) => {
		e.preventDefault();
		try {
			setLoad(true);
			await adminService.extendTrial(id, { endDate: date });
			setLoad(false);
			displaySuccess("Date has been extended.");
			onClose();
		} catch (err) {
			setLoad(false);
			displayError(err, true);
		}
	};

	return (
		<Form onSubmit={submitHandler}>
			<label>Select Date</label>
			<input
				type="date"
				className="height"
				value={date}
				onChange={(e) => setDate(e.target.value)}
			/>
			{load ? (
				<Loading />
			) : (
				<WideButton
					type="submit"
					className="mt-3"
					disabled={!date ? true : false}
				>
					<span>Extend Trial</span>
				</WideButton>
			)}
		</Form>
	);
};

export default ExtendTrial;
