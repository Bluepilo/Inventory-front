import React from "react";
import { Modal } from "react-bootstrap";

const ModalComponent = ({
	open,
	close,
	children,
	size,
	title,
}: {
	open: boolean;
	close: () => void;
	children: React.ReactNode;
	size?: "sm" | "lg" | "xl";
	title?: string;
}) => {
	return (
		<Modal show={open} onHide={close} centered {...(size && { size })}>
			{title && (
				<Modal.Header closeButton>
					<Modal.Title
						style={{
							fontSize: "1.1rem",
							fontWeight: "600",
							textTransform: "capitalize",
						}}
					>
						{title}
					</Modal.Title>
				</Modal.Header>
			)}
			<Modal.Body>{children}</Modal.Body>
		</Modal>
	);
};

export default ModalComponent;
