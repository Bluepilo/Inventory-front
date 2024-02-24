import { useEffect } from "react";
import { useParams } from "react-router-dom";
import TitleCover from "../../../components/TitleCover";
import UserWallet from "../../../components/UserWallet/UserWallet";

const SupplierDetails = () => {
	const params = useParams();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<div>
			<TitleCover title="Supplier Wallet" />
			<UserWallet userType="supplier" id={params.id || ""} />
		</div>
	);
};

export default SupplierDetails;
