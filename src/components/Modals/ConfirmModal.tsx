import { Confirmation } from "../../styles/basic.styles";
import ModalComponent from "../ModalComponent";

const ConfirmModal = ({
	open,
	close,
	confirm,
	label,
}: {
	open: boolean;
	close: () => void;
	confirm: () => void;
	label?: string;
}) => {
	return (
		<ModalComponent
			open={open}
			close={() => console.log("Clicked")}
			size="sm"
		>
			<Confirmation>
				<p>{label || "Are you sure you want to proceed?"}</p>
				<div className="text-center mt-4">
					<button className="yes" onClick={confirm}>
						Yes
					</button>
					<button className="no" onClick={close}>
						No
					</button>
				</div>
			</Confirmation>
		</ModalComponent>
	);
};

export default ConfirmModal;
