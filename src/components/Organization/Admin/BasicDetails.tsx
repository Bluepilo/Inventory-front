import { DetailCard } from "../../../styles/sale.styles";
import dateFormat from "dateformat";
import { formatCurrency } from "../../../utils/currency";

const BasicDetails = ({ details }: { details: any }) => {
	const showFreeTrial = (name: string, isTrial: boolean) => {
		if (name?.includes("Free") && isTrial) {
			return true;
		} else {
			return false;
		}
	};

	return (
		<>
			<DetailCard>
				<div className="head">
					<div className="sale-info">
						<h6>{details.name}</h6>
					</div>
					<div className="user-info">
						<p>
							{details.image && <img src={details.image} />}
							<span>{details.uniqueId}</span>
						</p>
					</div>
				</div>
				<div className="body">
					<div className="row">
						<span className="col-4 mb-2">Owner By:</span>
						<b className="col-8 mb-2">
							{details.ownerFirstName} {details.ownerLastName}
						</b>
						<span className="col-4 mb-2">Email Address:</span>
						<b className="col-8 mb-2">{details.email}</b>
						<span className="col-4 mb-2">Phone:</span>
						<b className="col-8 mb-2">{details.phone}</b>
						<span className="col-4 mb-2">Address:</span>
						<b className="col-8 mb-2">{details.address}</b>
						<span className="col-4 mb-2">Date Registered:</span>
						<b className="col-8 mb-2">
							{dateFormat(details.createdAt, "mmm dd, yyyy")}
						</b>
						<span className="col-4 mb-2">Active Subscription:</span>
						<b className="col-8 mb-2">
							{details?.subscriptionPlan?.name?.includes(
								"Free"
							) && details.isTrialOn
								? "On Trial"
								: details.subscriptionPlan?.name}
						</b>
						<span className="col-4 mb-2">Plan End Date</span>
						<b className="col-8 mb-2">
							{details?.subscriptionPlan?.name?.includes(
								"Free"
							) && details.isTrialOn
								? dateFormat(
										details.trialEndedAt,
										"mmm dd, yyyy"
								  )
								: details.subscription
								? dateFormat(
										details.subscription?.endDate,
										"mmm dd, yyyy"
								  )
								: "No Expiry Date"}
						</b>
						<span className="col-4 mb-2">Total Business:</span>
						<b className="col-8 mb-2">
							{details.businesses?.length}
						</b>
						<span className="col-4 mb-2">Total Users:</span>
						<b className="col-8 mb-2">{details.users?.length}</b>
						<span className="col-4 mb-2">Last login by:</span>
						<b className="col-8 mb-2">
							{details.lastBusinessLoginBy?.fullName}
						</b>
						<span className="col-4 mb-2">Last login at:</span>
						<b className="col-8 mb-2">
							{dateFormat(
								details.lastBusonessLoginBy?.lastLoginAt,
								"mmm dd, yyyy | h:MM TT"
							)}
						</b>
						<span className="col-4 mb-2">Wallet Balance:</span>
						<b className="col-8 mb-2">
							{formatCurrency(details.wallet?.balance)}
						</b>
					</div>
				</div>
			</DetailCard>
		</>
	);
};

export default BasicDetails;
