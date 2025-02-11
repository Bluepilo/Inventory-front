import PermissionDenied from "../../../../components/PermissionDenied";
import { useAppSelector } from "../../../../redux/hooks";
import Catalogue from "../../../user/Catalogue";

const Catalogues = () => {
	const { details } = useAppSelector((state) => state.auth);

	return details?.role?.permissions?.find((f) => f.method === "listBrand") ? (
		<div>
			<Catalogue admin={true} />
		</div>
	) : (
		<PermissionDenied />
	);
};

export default Catalogues;
