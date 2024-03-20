import React from "react";
import TitleCover from "../../../../components/TitleCover";
import { Alert, ComingSoon } from "../../../../styles/basic.styles";

const ProfitLoss = () => {
	return (
		<div>
			<TitleCover title={"Profit and Loss"} />
			<ComingSoon>
				<Alert>Coming Soon!</Alert>
			</ComingSoon>
		</div>
	);
};

export default ProfitLoss;
