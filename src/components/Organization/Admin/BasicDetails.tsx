import { DetailCard } from "../../../styles/sale.styles";
import dateFormat from "dateformat";
import { formatCurrency } from "../../../utils/currency";
import { MainButton } from "../../../styles/links.styles";
import ModalComponent from "../../ModalComponent";
import { useState } from "react";
import DeleteOrg from "./DeleteOrg";
import TopUp from "./TopUp";
import Subscribe from "./Subscribe";
import ExtendTrial from "./ExtendTrial";
import { useAppSelector } from "../../../redux/hooks";

const BasicDetails = ({
	details,
	reload,
}: {
	details: any;
	reload: () => void;
}) => {
	const [open, setOpen] = useState(false);
	const [modalType, setModalType] = useState("");

	const { details: admin } = useAppSelector((state) => state.auth);

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
						<span className="col-4 mb-2">Last login by:</span>
						<b className="col-8 mb-2">
							{details.lastBusinessLoginBy?.fullName}
						</b>
						<span className="col-4 mb-2">Last login at:</span>
						<b className="col-8 mb-2">
							{details.lastBusinessLoginBy?.lastLoginAt
								? dateFormat(
										details.lastBusinessLoginBy
											?.lastLoginAt,
										"mmm dd, yyyy | h:MM TT"
								  )
								: "---"}
						</b>
						<span className="col-4 mb-2">Wallet Balance:</span>
						<b className="col-8 mb-2">
							{formatCurrency(details.wallet?.balance)}
						</b>
						<span className="col-4 mb-2">Total Businesses:</span>
						<b className="col-8 mb-2">
							{details.businesses?.length}
						</b>
						<span className="col-4 mb-2">Total Users:</span>
						<b className="col-8 mb-2">{details.users?.length}</b>
					</div>
					<div className="mt-3">
						{admin?.role?.permissions?.find(
							(f) => f.method === "topupCustomerWallet"
						) && (
							<MainButton
								onClick={() => {
									setModalType("topup");
									setOpen(true);
								}}
							>
								<span>Top up Wallet</span>
							</MainButton>
						)}
						{admin?.role?.permissions?.find(
							(f) => f.method === "subscribeForOrganization"
						) && (
							<MainButton
								className="ms-4"
								onClick={() => {
									setModalType("subscribe");
									setOpen(true);
								}}
							>
								<span>Subscribe</span>
							</MainButton>
						)}
					</div>
					<div className="mt-3">
						{admin?.role?.permissions?.find(
							(f) => f.method === "extendTrialSubscription"
						) && (
							<MainButton
								onClick={() => {
									setModalType("trial");
									setOpen(true);
								}}
								className="me-4"
							>
								<span>Extend Trial</span>
							</MainButton>
						)}
						{admin?.role?.permissions?.find(
							(f) => f.method === "deleteOrganization"
						) && (
							<MainButton
								bg="red"
								onClick={() => {
									setModalType("delete");
									setOpen(true);
								}}
							>
								<span>Delete Organization</span>
							</MainButton>
						)}
					</div>
				</div>
			</DetailCard>
			<ModalComponent
				open={open}
				close={() => setOpen(false)}
				title={modalType.toUpperCase()}
			>
				{modalType === "delete" ? (
					<DeleteOrg id={details.id} />
				) : modalType === "topup" ? (
					<TopUp
						onClose={() => {
							setOpen(false);
							reload();
						}}
						id={details.id}
					/>
				) : modalType === "subscribe" ? (
					<Subscribe
						id={details.id}
						onClose={() => {
							setOpen(false);
							reload();
						}}
						balance={details.wallet?.balance}
					/>
				) : modalType === "trial" ? (
					<ExtendTrial
						id={details.id}
						onClose={() => {
							setOpen(false);
							reload();
						}}
					/>
				) : (
					<></>
				)}
			</ModalComponent>
		</>
	);
};

export default BasicDetails;
