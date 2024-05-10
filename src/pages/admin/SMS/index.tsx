import React from "react";
import TitleCover from "../../../components/TitleCover";
import { Alert, ComingSoon } from "../../../styles/basic.styles";

const SMS = () => {
	return (
		<div>
			<TitleCover title={"Bluepilo SMS"} />
			<ComingSoon>
				<Alert>API not available yet.</Alert>
			</ComingSoon>
		</div>
	);
};

export default SMS;
