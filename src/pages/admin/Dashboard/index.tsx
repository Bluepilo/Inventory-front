import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import PageLoad from "../../../components/Loaders/PageLoad";
import { getDashboardStats } from "../../../redux/features/admin/admin-slice";
import { DashboardCard } from "../../../styles/home.styles";
import { formatCurrency } from "../../../utils/currency";
import AdminPieChart from "../../../components/Home/AdminPieChart";
import {
	DropDownSelect,
	OptionProp,
} from "../../../components/Filters/BasicInputs";
import PermissionDenied from "../../../components/PermissionDenied";
import AdminLineGraph from "../../../components/Home/AdminLineGraph";
import { DetailCard } from "../../../styles/sale.styles";
import { Table } from "../../../styles/table.styles";
import SkeletonTable from "../../../components/Loaders/SkeletonTable";
import adminService from "../../../redux/features/admin/admin-service";
import AdminBarChartTransact from "../../../components/Home/AdminBarChartTransact";
import BarChartLoginTrend from "../../../components/Home/BarChartLoginTrend";

const Dashboard = () => {
	const thisYear = new Date().getFullYear();

	const dispatch = useAppDispatch();
	const [year, setYear] = useState<OptionProp | null>({
		label: `${thisYear}`,
		value: `${thisYear}`,
	});
	const [loadSub, setLoadSub] = useState(false);
	const [resultSub, setResultSub] = useState<any>([]);

	const { dashboardStats } = useAppSelector((state) => state.admin);
	const { details } = useAppSelector((state) => state.auth);

	useEffect(() => {
		dispatch(getDashboardStats(`?year=${year?.value}`));
	}, [year]);

	useEffect(() => {
		getResult();
	}, []);

	const getResult = async () => {
		try {
			setLoadSub(true);
			let res = await adminService.subTracker();
			setLoadSub(false);
			setResultSub(res);
		} catch (err) {
			setLoadSub(false);
		}
	};

	return details?.role?.permissions.find(
		(f) => f.method === "dashboardReport"
	) ? (
		dashboardStats?.year ? (
			<div className="mt-3">
				<div className="row justify-content-end mb-3">
					<div className="col-lg-3 col-md-4">
						<DropDownSelect
							label="Select Year"
							options={
								dashboardStats?.years?.map((a: any) => {
									return { label: a, value: a };
								}) || []
							}
							value={year}
							changeSelected={setYear}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-4 mb-4">
						<DashboardCard>
							<div className="head">
								<h6>Organizations</h6>
							</div>
							<div className="body">
								<div className="content">
									<h6>Total</h6>
									<h4>{dashboardStats.totalOrganizations}</h4>
								</div>
							</div>
						</DashboardCard>
					</div>
					<div className="col-lg-4 mb-4">
						<DashboardCard>
							<div className="head">
								<h6>Active Organizations</h6>
							</div>
							<div className="body">
								<div className="content">
									<h6>Total</h6>
									<h4>
										{dashboardStats.activeOrganizations}
									</h4>
								</div>
							</div>
						</DashboardCard>
					</div>
					<div className="col-lg-4 mb-4">
						<DashboardCard>
							<div className="head">
								<h6>Active Shops</h6>
							</div>
							<div className="body">
								<div className="content">
									<h6>Total</h6>
									<h4>{dashboardStats.activeShops}</h4>
								</div>
							</div>
						</DashboardCard>
					</div>
					<div className="col-lg-3 mb-4">
						<DashboardCard>
							<div className="head">
								<h6>Active Users</h6>
							</div>
							<div className="body">
								<div className="content">
									<h6>Total</h6>
									<h4>{dashboardStats.activeUsers}</h4>
								</div>
							</div>
						</DashboardCard>
					</div>
					<div className="col-lg-3 mb-4">
						<DashboardCard>
							<div className="head">
								<h6>Products</h6>
							</div>
							<div className="body">
								<div className="content">
									<h6>Total</h6>
									<h4>{dashboardStats.totalProducts}</h4>
								</div>
							</div>
						</DashboardCard>
					</div>
					<div className="col-lg-3 mb-4">
						<DashboardCard>
							<div className="head">
								<h6>Brands</h6>
							</div>
							<div className="body">
								<div className="content">
									<h6>Total</h6>
									<h4>{dashboardStats.totalBrands}</h4>
								</div>
							</div>
						</DashboardCard>
					</div>
					<div className="col-lg-3 mb-4">
						<DashboardCard>
							<div className="head">
								<h6>Expenses</h6>
							</div>
							<div className="body">
								<div className="content">
									<h6>Total</h6>
									<h4>{dashboardStats.totalExpense}</h4>
								</div>
							</div>
						</DashboardCard>
					</div>
					<div className="col-lg-6 mb-4">
						<DashboardCard>
							<div className="head">
								<h6>Subscription Revenue</h6>
							</div>
							<div className="body">
								<AdminLineGraph
									val={dashboardStats.subscriptionPlans?.map(
										(v: any) => {
											return v.amount;
										}
									)}
									label="Subscription Revenue"
									color={"#0042FF"}
								/>
							</div>
						</DashboardCard>
					</div>

					<div className="col-lg-6 mb-4">
						<DashboardCard>
							<div className="head">
								<h6>Subscription Count</h6>
							</div>
							<div className="body">
								<AdminLineGraph
									val={dashboardStats.subscriptionPlans?.map(
										(v: any) => {
											return v.count;
										}
									)}
									label="Subscription Count"
									color={"#000D33"}
								/>
							</div>
						</DashboardCard>
					</div>
					<div className="col-lg-6 mb-4">
						<DashboardCard>
							<div className="head">
								<h6>Transaction Type</h6>
							</div>
							<div className="body">
								<AdminBarChartTransact
									arr={dashboardStats.transactionTypeReport}
								/>
							</div>
						</DashboardCard>
					</div>
					<div className="col-lg-6 mb-4">
						<DashboardCard>
							<div className="head">
								<h6>Login Trend</h6>
							</div>
							<div className="body">
								<BarChartLoginTrend
									arr={dashboardStats.loginTrend}
								/>
							</div>
						</DashboardCard>
					</div>
					<div className="col-lg-5 mb-4">
						<DetailCard>
							<div className="table-responsive">
								<Table className="table">
									<thead>
										<tr>
											<th>Subscription Type</th>
											<th>Active Units</th>
										</tr>
									</thead>
									{!loadSub && (
										<>
											<tbody>
												{resultSub?.subscriptions?.map(
													(r: any) => (
														<tr key={r.id}>
															<td>{r.name}</td>
															<td>{r.count}</td>
														</tr>
													)
												)}
											</tbody>
										</>
									)}
								</Table>
								{loadSub && <SkeletonTable />}
							</div>
						</DetailCard>
					</div>
					<div className="col-lg-7 mb-4">
						<DashboardCard>
							<div className="head">
								<h6>Sales Volume</h6>
							</div>
							<div className="body">
								<AdminPieChart
									list={dashboardStats.sales}
									admin={true}
								/>
								<div className="head" />
								<div className="body">
									<div className="content">
										<h6>Total Transaction Volume</h6>
										<h4>
											{formatCurrency(
												dashboardStats.totalTransactionVolume
											)}
										</h4>
									</div>
								</div>
							</div>
						</DashboardCard>
					</div>
				</div>
			</div>
		) : (
			<PageLoad />
		)
	) : (
		<>
			<PermissionDenied />
		</>
	);
};

export default Dashboard;
