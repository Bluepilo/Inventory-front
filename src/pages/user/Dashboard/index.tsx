import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../redux/hooks";

import TransferIcon from "../../../assets/icons/transfer.svg";
import EditIcon from "../../../assets/icons/edit.svg";
import { PrimaryButton } from "../../../styles/links.styles";
import { DashboardCard, ProgressCard } from "../../../styles/home.styles";
import { FlexBetween } from "../../../styles/basic.styles";

import { CiShop, CiUser } from "react-icons/ci";
import PageLoad from "../../../components/PageLoad";
import { formatCurrency } from "../../../utils/currency";

const Dashboard = () => {
	const navigate = useNavigate();

	const { details } = useAppSelector((state) => state.auth);
	const { dashboardStats } = useAppSelector((state) => state.basic);

	useEffect(() => {
		checkOnboardingTrial();
	}, []);

	const checkOnboardingTrial = () => {
		if (details.business.onboardingSteps?.trialPick !== "completed") {
			navigate("onboarding");
		}
	};

	const greetings = () => {
		let hours = new Date().getHours();
		if (hours < 12) {
			return "Morning";
		} else if (hours >= 12 && hours < 18) {
			return "Afternoon";
		} else {
			return "Evening";
		}
	};

	return dashboardStats.year ? (
		<div className="mt-3">
			<div className="row align-items-center">
				<div className="col-lg-6 mb-3">
					<h5>
						Good {greetings()}, <b>{details.firstName}</b>
					</h5>
					<div className="mt-3">
						<PrimaryButton style={{ marginRight: "20px" }}>
							<span>Record Transaction</span>
							<img src={EditIcon} />
						</PrimaryButton>
						<PrimaryButton bg="#EDEEF0" color="#505BDA">
							<span>Transfer Item</span>
							<img src={TransferIcon} />
						</PrimaryButton>
					</div>
				</div>
				<div className="col-lg-6 mb-3">
					<DashboardCard>
						<h5 style={{ marginBottom: "10px" }}>
							{details.business.name}
						</h5>
						<FlexBetween>
							<ProgressCard>
								<div className="box">
									<CiUser size={18} />
									<span>
										{
											dashboardStats.userReport?.metrics
												?.active
										}{" "}
										active users
									</span>
								</div>
								<div className="prog">
									<div
										className="tracks"
										style={{
											width: `${
												(dashboardStats.userReport
													?.metrics?.active /
													details.business
														?.subscriptionPlan
														?.noOfUsers) *
												100
											}%`,
										}}
									></div>
								</div>
							</ProgressCard>
							<ProgressCard>
								<div className="box">
									<CiShop size={18} />
									<span>
										{dashboardStats.shopReport?.activeShops}{" "}
										active shops
									</span>
								</div>
								<div className="prog">
									<div
										className="tracks"
										style={{
											width: `${
												(dashboardStats.shopReport
													?.activeShops /
													details.business
														?.subscriptionPlan
														?.noOfShops) *
												100
											}%`,
										}}
									></div>
								</div>
							</ProgressCard>
							<ProgressCard>
								<div className="box">
									<img src={TransferIcon} />
									<span>
										{dashboardStats.totalTransferRequests}{" "}
										Pending Transfers
									</span>
								</div>
								<div className="prog">
									<div
										className="tracks"
										style={{
											width: `100%`,
										}}
									></div>
								</div>
							</ProgressCard>
						</FlexBetween>
					</DashboardCard>
				</div>
			</div>
			<div className="row mt-3">
				<div className="col-lg-5 mb-3">
					<DashboardCard>
						<div className="head">
							<h6>Purchases</h6>
							<span>
								{dashboardStats.purchaseReport?.metrics?.count}
							</span>
						</div>
						<div className="body">
							<FlexBetween>
								<div className="content">
									<h6>Total Purchases</h6>
									<h4>
										₦{" "}
										{formatCurrency(
											dashboardStats.purchaseReport
												?.metrics?.totalPrice
										)}
									</h4>
								</div>
								<div className="content">
									<h6>Paid to Supplier</h6>
									<h4>
										₦{" "}
										{formatCurrency(
											dashboardStats.purchaseReport
												.totalPaidToSupplier
										)}
									</h4>
								</div>
							</FlexBetween>
						</div>
					</DashboardCard>
				</div>
				<div className="col-lg-7 mb-3">
					<DashboardCard>
						<div className="head">
							<h6>Sales</h6>
							<span>
								{dashboardStats.salesReport?.metrics?.count}
							</span>
						</div>
						<div className="body">
							<FlexBetween>
								<div className="content">
									<h6>Total Sales</h6>
									<h4>
										₦{" "}
										{formatCurrency(
											dashboardStats.totalSale
										)}
									</h4>
								</div>
								<div className="content">
									<h6>Payment Recieved</h6>
									<h4>
										₦{" "}
										{formatCurrency(
											dashboardStats.salesReport
												?.totalRecievedFromCustomers
										)}
									</h4>
								</div>
								<div className="content">
									<h6>Sales Margin</h6>
									<h4>
										₦{" "}
										{formatCurrency(
											dashboardStats.salesReport?.metrics
												?.totalEstimatedProfit
										)}
									</h4>
								</div>
							</FlexBetween>
						</div>
					</DashboardCard>
				</div>
			</div>
			<div className="row mt-3">
				<div className="col-lg-5">
					<DashboardCard>
						<div className="head">
							<h6>Stock</h6>
							<span>{dashboardStats.totalProducts}</span>
						</div>
						<div className="body">
							<h6>Top 3 Brands in Stock</h6>
							<table className="table mt-3">
								<thead>
									<tr>
										<th>Brands</th>
										<th>Unit</th>
										<th className="text-end">Value</th>
									</tr>
								</thead>
								<tbody>
									{dashboardStats.stockReport?.topBrands?.map(
										(t: any) => (
											<tr key={t.brandId}>
												<td>{t.brand}</td>
												<td>{t.totalStock}</td>
												<td className="text-end">
													₦ {formatCurrency(t.worth)}
												</td>
											</tr>
										)
									)}
								</tbody>
							</table>
						</div>
					</DashboardCard>
				</div>
			</div>
		</div>
	) : (
		<PageLoad />
	);
};

export default Dashboard;
