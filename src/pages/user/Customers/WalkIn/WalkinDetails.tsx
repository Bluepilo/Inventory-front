import { useParams } from "react-router-dom";
import TitleCover from "../../../../components/TitleCover";
import UserWallet from "../../../../components/UserWallet/UserWallet";
import { useEffect } from "react";

const WalkinDetails = () => {
	const params = useParams();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<div>
			<TitleCover title="Walk-In Customer Wallet" />
			<UserWallet userType="customer" id={params.id || ""} />
		</div>
	);
};

export default WalkinDetails;
