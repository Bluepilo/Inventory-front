import { useState } from "react";
import ModalComponent from "../ModalComponent";

const UploadErrors = ({
	errors,
	openModal,
	closeModal,
}: {
	errors: any;
	openModal: boolean;
	closeModal: (arg: boolean) => void;
}) => {
	return (
		<ModalComponent
			open={openModal}
			close={() => closeModal(false)}
			size="lg"
		>
			<div style={{ color: "#F44336" }}>
				{Array.isArray(errors) &&
					errors.map((err, i) => <p key={i + 1}>{err}</p>)}
			</div>
		</ModalComponent>
	);
};

export default UploadErrors;
