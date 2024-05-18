import { useEffect, useState } from "react";
import TitleCover from "../../../components/TitleCover";
import { displayError } from "../../../utils/errors";
import adminService from "../../../redux/features/admin/admin-service";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../redux/hooks";
import SkeletonDetails from "../../../components/Loaders/SkeletonDetails";
import { ActionDetailsDiv } from "../../../styles/sale.styles";
import BasicDetails from "../../../components/Organization/Admin/BasicDetails";
import BusinessList from "../../../components/Organization/Admin/BusinessList";
import UserList from "../../../components/Organization/Admin/UserList";
import PaymentHistory from "../../../components/Organization/Admin/PaymentHistory";
import SubHistory from "../../../components/Organization/Admin/SubHistory";
import OnboardSteps from "../../../components/Organization/Admin/OnboardSteps";

const OrganizationDetails = () => {
	const params = useParams();

	const { token } = useAppSelector((state) => state.auth);

	const [org, setOrg] = useState<any>({});
	const [load, setLoad] = useState(false);

	useEffect(() => {
		window.scrollTo(0, 0);
		loadOrg();
	}, []);

	const loadOrg = async () => {
		try {
			setLoad(true);
			let res = await adminService.getOrg(token, params?.id || "");
			setLoad(false);
			setOrg(res);
		} catch (err) {
			setLoad(false);
			displayError(err, true);
		}
	};
	return (
		<div>
			<TitleCover title={org?.name || "Organization Details"} />
			{load ? (
				<SkeletonDetails />
			) : (
				org?.id && (
					<>
						<ActionDetailsDiv>
							<div className="row">
								<div className="col-lg-6 mb-3">
									<BasicDetails
										details={org}
										reload={() => loadOrg()}
									/>
								</div>
								<div className="col-lg-6 mb-3">
									<OnboardSteps steps={org.onboardingSteps} />
								</div>
								<div className="col-lg-12 mb-3">
									<BusinessList list={org.businesses} />
									<UserList list={org.users} />
									<PaymentHistory
										history={org.paymentHistory}
									/>
									<SubHistory
										history={org.subscriptionHistory}
									/>
								</div>
							</div>
						</ActionDetailsDiv>
					</>
				)
			)}
		</div>
	);
};

export default OrganizationDetails;
