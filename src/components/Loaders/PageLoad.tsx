import { Spinner } from "react-bootstrap";
import { LoadPage } from "../../styles/basic.styles";

const PageLoad = () => {
	return (
		<LoadPage>
			<div className="text-center">
				<Spinner animation="border" variant="primary" />
				<p>Loading...</p>
			</div>
		</LoadPage>
	);
};

export default PageLoad;
