import { useState } from "react";
import TitleCover from "../../../../components/TitleCover";

const WalkIn = () => {
	const [lists, setList] = useState<any>({});
	return (
		<div>
			<TitleCover title="Walk-in Customers" dataCount={lists?.count} />
		</div>
	);
};

export default WalkIn;
