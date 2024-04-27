import { useState } from "react";
import { CiShop } from "react-icons/ci";
import { HiDotsVertical, HiOutlineUsers } from "react-icons/hi";
import { TbReceipt } from "react-icons/tb";
import { FaRegEdit } from "react-icons/fa";
import { useAppSelector } from "../../redux/hooks";
import SubIcon from "../../assets/menus/subscription.svg";
import { Drop } from "../../styles/basic.styles";
import { FiUserPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import ModalComponent from "../ModalComponent";
import OrganizationProfile from "../Settings/OrganizationProfile";

const Dashboard = () => {
	const navigate = useNavigate();

	const { details } = useAppSelector((state) => state.auth);
	const { organization } = useAppSelector((state) => state.basic);

	const [openOrg, setOpenOrg] = useState(false);

	const getPercent = (a: number, b: number) => {
		let calcA = a || 0;
		let calcB = b || 0;
		let calc = (calcA / calcB) * 100;
		return calc;
	};

	const planName = () => {
		if (
			details.organization?.subscriptionPlan?.name?.includes("Free") &&
			details.organization.isTrialOn
		) {
			return "On Free Trial";
		} else {
			return details.organization?.subscriptionPlan?.name;
		}
	};

	return (
		<div className="row">
			<div className="col-md-6">
				<div className="left-side">
					<div className="head">
						<h5>Organization Dashboard</h5>
						<Drop align={"end"}>
							<Drop.Toggle size="sm" id="dropdown-basic">
								<HiDotsVertical color="#fff" />
							</Drop.Toggle>

							<Drop.Menu>
								<Drop.Item
									href="#"
									onClick={(e) => {
										e.preventDefault();
										navigate(
											"/dashboard/subscription/upgrade"
										);
									}}
									className="mb-2 mt-1"
								>
									<img src={SubIcon} />
									<span className="ms-2">
										Upgrade Subscription
									</span>
								</Drop.Item>

								<Drop.Item
									href="#2"
									onClick={(e) => {
										e.preventDefault();
										setOpenOrg(true);
									}}
									className="mb-2"
								>
									<FaRegEdit />
									<span className="ms-2">
										Edit Organization Info
									</span>
								</Drop.Item>
								<Drop.Item
									href="#2"
									onClick={(e) => {
										e.preventDefault();
										navigate("users");
									}}
								>
									<FiUserPlus />
									<span className="ms-2">Manage Users</span>
								</Drop.Item>
							</Drop.Menu>
						</Drop>
					</div>
					<div className="body">
						<div className="row">
							<span className="col-6 ss mt-3">
								Organization Name
							</span>
							<span className="col-6 mt-3">
								{details.organization.name}
							</span>
							<span className="col-6 ss mt-3">
								Organization ID
							</span>
							<span className="col-6 mt-3">
								{details.organization.uniqueId}
							</span>
							<span className="col-6 ss mt-3">
								Active Subscription
							</span>
							<span className="col-6 mt-3">{planName()}</span>
						</div>
					</div>
				</div>
			</div>
			<div className="col-md-6">
				<div className="right-side">
					<div className="row">
						<div className="col-md-6">
							<div className="box">
								<div className="head">
									<HiOutlineUsers />
									<h6>Users</h6>
								</div>
								<div className="body">
									<p>
										<span>{organization?.users}</span>/
										{
											details.organization
												?.subscriptionPlan.noOfUsers
										}
									</p>
									<div className="prog">
										<div
											style={{
												width: `${getPercent(
													organization?.users,
													details.organization
														?.subscriptionPlan
														.noOfUsers
												)}%`,
											}}
										/>
									</div>
								</div>
							</div>
						</div>
						<div className="col-md-6">
							<div className="box">
								<div className="head">
									<CiShop />
									<h6>Shops</h6>
								</div>
								<div className="body">
									<p>
										<span>{organization?.shops}</span>/
										{
											details.organization
												?.subscriptionPlan.noOfShops
										}
									</p>
									<div className="prog">
										<div
											style={{
												width: `${getPercent(
													organization?.shops,
													details.organization
														?.subscriptionPlan
														.noOfShops
												)}%`,
											}}
										/>
									</div>
								</div>
							</div>
						</div>

						<div className="col-md-6">
							<div className="box">
								<div className="head">
									<TbReceipt />
									<h6>Transactions/Month</h6>
								</div>
								<div className="body">
									<p>
										<span>
											{organization?.transactions}
										</span>
										/
										{
											details.organization
												?.subscriptionPlan
												.noOfTransactions
										}
									</p>
									<div className="prog">
										<div
											style={{
												width: `${getPercent(
													organization?.transactions,
													details.organization
														?.subscriptionPlan
														.noOfTransactions
												)}%`,
											}}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<ModalComponent
				open={openOrg}
				close={() => setOpenOrg(false)}
				title="Organization Profile"
			>
				<OrganizationProfile
					close={(arg: string) => {
						setOpenOrg(false);
						if (arg === "close") {
							navigate("close-account");
						}
					}}
				/>
			</ModalComponent>
		</div>
	);
};

export default Dashboard;
