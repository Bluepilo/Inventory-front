import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { OrgDashboard } from "../../../styles/org.styles";
import { getOrganizationReport } from "../../../redux/features/basic/basic-slice";
import Dashboard from "../../../components/Organization/Dashboard";
import Businesses from "../../../components/Organization/Businesses";
import PageLoad from "../../../components/Loaders/PageLoad";
import { haveRole } from "../../../utils/role";

const Organization = () => {
	const dispatch = useAppDispatch();

	const { organization } = useAppSelector((state) => state.basic);
	const { details } = useAppSelector((state) => state.auth);

	useEffect(() => {
		window.scrollTo(0, 0);
		dispatch(getOrganizationReport());
	}, []);

	return organization?.organization &&
		haveRole(details.roleId).isBusinessOwner ? (
		<div className="row">
			<div className="col-lg-11">
				<OrgDashboard>
					<Dashboard />
				</OrgDashboard>
				<Businesses />
			</div>
		</div>
	) : (
		<PageLoad />
	);
};

export default Organization;
