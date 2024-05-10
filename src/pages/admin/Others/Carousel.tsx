import React from "react";
import TitleCover from "../../../components/TitleCover";
import { Alert, ComingSoon } from "../../../styles/basic.styles";

const Carousel = () => {
	return (
		<div>
			<TitleCover title={"Ads Carousel"} />
			<ComingSoon>
				<Alert>API not available yet.</Alert>
			</ComingSoon>
		</div>
	);
};

export default Carousel;
