import ModalComponent from "../ModalComponent";
import { ModalLoadStyle } from "../../styles/basic.styles";
import { Spinner } from "react-bootstrap";

const LoadModal = ({ open }: { open: boolean }) => {
	return (
		<ModalComponent
			open={open}
			close={() => console.log("closed")}
			size="sm"
		>
			<ModalLoadStyle>
				<div className="text-center">
					<Spinner animation="border" variant="primary" />
					<p>Please hold while we process your request...</p>
				</div>
			</ModalLoadStyle>
		</ModalComponent>
	);
};

export default LoadModal;
