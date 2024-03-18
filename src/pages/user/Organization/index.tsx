import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { OrgDashboard } from "../../../styles/org.styles";
import { getOrganizationReport } from "../../../redux/features/basic/basic-slice";
import Dashboard from "../../../components/Organization/Dashboard";
import Businesses from "../../../components/Organization/Businesses";

const Organization = () => {
	const dispatch = useAppDispatch();

	const { details } = useAppSelector((state) => state.auth);

	useEffect(() => {
		window.scrollTo(0, 0);
		dispatch(getOrganizationReport());
	}, []);

	return details.organization ? (
		<div className="row">
			<div className="col-lg-11">
				<OrgDashboard>
					<Dashboard />
				</OrgDashboard>
				<Businesses />
			</div>
		</div>
	) : (
		<></>
	);
};

export default Organization;
