import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

import TransferIcon from "../../../assets/icons/transfer.svg";
import EditIcon from "../../../assets/icons/edit.svg";
import { PrimaryButton } from "../../../styles/links.styles";
import { DashboardCard, ProgressCard } from "../../../styles/home.styles";
import { FlexBetween } from "../../../styles/basic.styles";

import { CiShop, CiUser } from "react-icons/ci";
import PageLoad from "../../../components/Loaders/PageLoad";
import { formatCurrency } from "../../../utils/currency";
import LineChart from "../../../components/Home/LineChart";
import ExpenseChart from "../../../components/Home/ExpenseChart";
import PieChart from "../../../components/Home/PieChart";
import { haveRole } from "../../../utils/role";
import ModalComponent from "../../../components/ModalComponent";
import RecordList from "../../../components/Home/RecordList";
import {
	DropDownSelect,
	OptionProp,
} from "../../../components/Filters/BasicInputs";
import { getDashboardStats } from "../../../redux/features/basic/basic-slice";
import { displayError } from "../../../utils/errors";
import basicService from "../../../redux/features/basic/basic-service";
import { userProfile } from "../../../redux/features/auth/auth-slice";

const Dashboard = () => {
	const navigate = useNavigate();

	const dispatch = useAppDispatch();

	const [selectedFilter, setSelectedFilter] = useState<OptionProp | null>({
		label: "This Month",
		value: "month",
	});
	const [openModal, setOpenModal] = useState(false);
	const { details, token } = useAppSelector((state) => state.auth);
	const { dashboardStats } = useAppSelector((state) => state.basic);

	const currency =
		details.business?.currency?.symbol || details.business?.currencyCode;

	useEffect(() => {
		checkOnboardingTrial();
	}, [details]);

	useEffect(() => {
		dispatch(
			getDashboardStats({
				period: selectedFilter?.value || "month",
				year: `${new Date().getFullYear()}`,
			})
		);
	}, [selectedFilter]);

	const checkOnboardingTrial = () => {
		if (details?.businessId) {
			if (details?.business?.onboardingSteps?.trialPick !== "completed") {
				navigate("onboarding");
			}
		} else {
			switchBusiness();
		}
	};

	const switchBusiness = async () => {
		try {
			await basicService.switchBusiness(
				token,
				details.allowedBusinesses[0].business?.id
			);
			dispatch(userProfile(details.id));
		} catch (err) {
			displayError(err, true);
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

	return dashboardStats?.year && details?.business ? (
		<div className="mt-3">
			<div className="row align-items-center">
				<div className="col-lg-5 mb-4">
					<h5>
						Good {greetings()}, <b>{details.firstName}</b>
					</h5>
					{haveRole(details.roleId).isBusinessActioners && (
						<div className="mt-3">
							<PrimaryButton
								style={{ marginRight: "20px" }}
								onClick={() => setOpenModal(true)}
							>
								<span>Record Transaction</span>
								<img src={EditIcon} />
							</PrimaryButton>
							<PrimaryButton
								bg="#EDEEF0"
								color="#505BDA"
								onClick={() => navigate("/dashboard/transfers")}
							>
								<span>Transfer Item</span>
								<img src={TransferIcon} />
							</PrimaryButton>
						</div>
					)}
				</div>
				{haveRole(details.roleId).isBusinessAdmin ? (
					<div className="col-lg-7 mb-4">
						<DashboardCard>
							<div className="head-btwn">
								<h5>{details.business?.name}</h5>
								<DropDownSelect
									value={selectedFilter}
									options={[
										{ label: "This Month", value: "month" },
										{ label: "Today", value: "today" },
										{ label: "This Week", value: "week" },
										{ label: "This Year", value: "year" },
									]}
									changeSelected={setSelectedFilter}
								/>
							</div>

							<FlexBetween>
								<ProgressCard>
									<div className="box">
										<CiUser size={18} />
										<span>
											{
												dashboardStats.userReport
													?.metrics?.active
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
														details.organization
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
											{
												dashboardStats.shopReport
													?.activeShops
											}{" "}
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
														details.organization
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
											{
												dashboardStats.totalTransferRequests
											}{" "}
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
				) : (
					<div className="col-lg-7 mb-4">
						<div className="row">
							<div className="col-md-7"></div>
							<div className="col-md-5">
								<DropDownSelect
									value={selectedFilter}
									options={[
										{ label: "This Month", value: "month" },
										{ label: "Today", value: "today" },
										{ label: "This Week", value: "week" },
										{ label: "This Year", value: "year" },
									]}
									changeSelected={setSelectedFilter}
								/>
							</div>
						</div>
					</div>
				)}
			</div>
			<div className="row mt-1">
				{haveRole(details.roleId).isBusinessAdmin && (
					<div className="col-lg-5 mb-4">
						<DashboardCard>
							<div className="head">
								<h6>Purchases</h6>
								<span>
									{
										dashboardStats.purchaseReport?.metrics
											?.count
									}
								</span>
							</div>
							<div className="body">
								<FlexBetween>
									<div className="content">
										<h6>Total Purchases</h6>
										<h4>
											{currency}{" "}
											{formatCurrency(
												dashboardStats.purchaseReport
													?.metrics?.totalPrice
											)}
										</h4>
									</div>
									<div className="content">
										<h6>Paid to Supplier</h6>
										<h4>
											{currency}{" "}
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
				)}
				<div className="col-lg-7 mb-4">
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
										{currency}{" "}
										{formatCurrency(
											dashboardStats.totalSale
										)}
									</h4>
								</div>
								<div className="content">
									<h6>Payment Recieved</h6>
									<h4>
										{currency}{" "}
										{formatCurrency(
											dashboardStats.salesReport
												?.totalRecievedFromCustomers
										)}
									</h4>
								</div>
								<div className="content">
									<h6>Sales Margin</h6>
									<h4>
										{currency}{" "}
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
				<div className="col-lg-5 mb-4">
					<DashboardCard style={{ height: "100%" }}>
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
													{currency}{" "}
													{formatCurrency(t.worth)}
												</td>
											</tr>
										)
									)}
								</tbody>
							</table>
						</div>
					</DashboardCard>
				</div>
				{haveRole(details.roleId).isBusinessAdmin && (
					<>
						<div className="col-lg-7 mb-4">
							<DashboardCard>
								<div className="head">
									<h6>Sales Trend</h6>
								</div>
								<div className="body">
									<LineChart arr={dashboardStats.sales} />
								</div>
							</DashboardCard>
						</div>

						<div className="col-lg-4 mb-4">
							<DashboardCard style={{ height: "100%" }}>
								<div className="head">
									<h6>Top Subdealers</h6>
								</div>
								<div className="body">
									<table className="table mt-3">
										<thead>
											<tr>
												<th>Subdealer</th>
												<th className="text-end">
													Value
												</th>
											</tr>
										</thead>
										<tbody>
											{dashboardStats.subdealerReport.topSubdealers?.map(
												(t: any, i: number) => (
													<tr key={i + 1}>
														<td>{t.name}</td>
														<td className="text-end">
															{currency}{" "}
															{formatCurrency(
																t.tradeValue
															)}
														</td>
													</tr>
												)
											)}
										</tbody>
									</table>
								</div>
							</DashboardCard>
						</div>
						<div className="col-lg-4 mb-4">
							<DashboardCard style={{ height: "100%" }}>
								<div className="head">
									<h6>Top Selling Items</h6>
								</div>
								<div className="body">
									<table className="table mt-3">
										<thead>
											<tr>
												<th>Products</th>
												<th className="text-end">
													Value
												</th>
											</tr>
										</thead>
										<tbody>
											{dashboardStats.productReport?.topSellingProducts?.map(
												(t: any, i: number) => (
													<tr key={i + 1}>
														<td>{t.name}</td>
														<td className="text-end">
															{currency}{" "}
															{formatCurrency(
																t.salesValue
															)}
														</td>
													</tr>
												)
											)}
										</tbody>
									</table>
								</div>
							</DashboardCard>
						</div>

						<div className="col-lg-4 mb-4">
							<DashboardCard style={{ height: "100%" }}>
								<div className="head">
									<h6>Top Selling Items By Unit</h6>
								</div>
								<div className="body">
									<table className="table mt-3">
										<thead>
											<tr>
												<th>Products</th>
												<th>Total Quantity</th>
											</tr>
										</thead>
										<tbody>
											{dashboardStats.productReport?.topSellingProductsByUnit?.map(
												(t: any, i: number) => (
													<tr key={i + 1}>
														<td>{t.name}</td>
														<td>
															{t.totalQuantity}
														</td>
													</tr>
												)
											)}
										</tbody>
									</table>
								</div>
							</DashboardCard>
						</div>
						<div className="col-lg-6 mb-4">
							<DashboardCard>
								<div className="head">
									<h6>Shop Sales</h6>
								</div>
								<div className="body">
									<PieChart
										arr={
											dashboardStats.shopReport?.trend
												?.shopSales
										}
										labels={
											dashboardStats.shopReport?.trend
												?.shops
										}
									/>
								</div>
							</DashboardCard>
						</div>
						<div className="col-lg-6 mb-4">
							<DashboardCard>
								<div className="head">
									<h6>Expenses</h6>
								</div>
								<div className="body">
									<ExpenseChart
										arr={
											dashboardStats.expenseReport
												?.metrics
										}
									/>
								</div>
							</DashboardCard>
						</div>
					</>
				)}
			</div>
			<ModalComponent
				open={openModal}
				title="Record Transaction"
				close={() => setOpenModal(false)}
				size="sm"
			>
				<RecordList />
			</ModalComponent>
		</div>
	) : (
		<PageLoad />
	);
};

export default Dashboard;
