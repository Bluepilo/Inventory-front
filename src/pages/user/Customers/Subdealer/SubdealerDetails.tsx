import { useEffect } from "react";
import { useParams } from "react-router-dom";
import TitleCover from "../../../../components/TitleCover";
import UserWallet from "../../../../components/UserWallet/UserWallet";

const SubdealerDetails = () => {
	const params = useParams();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<div>
			<TitleCover title="Subdealer Wallet" />
			<UserWallet userType="subdealer" id={params.id || ""} />
		</div>
	);
};

export default SubdealerDetails;
