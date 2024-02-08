import { Spinner } from "react-bootstrap";

const Loading = () => {
	return (
		<div className="text-center">
			<Spinner animation="border" variant="primary" />
		</div>
	);
};

export default Loading;
