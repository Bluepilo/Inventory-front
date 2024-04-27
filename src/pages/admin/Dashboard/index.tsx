import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import PageLoad from "../../../components/Loaders/PageLoad";
import { getDashboardStats } from "../../../redux/features/admin/admin-slice";
import { DashboardCard } from "../../../styles/home.styles";
import PieChart from "../../../components/Home/PieChart";
import { formatCurrency } from "../../../utils/currency";

const Dashboard = () => {
	const dispatch = useAppDispatch();

	const { dashboardStats } = useAppSelector((state) => state.admin);

	useEffect(() => {
		dispatch(getDashboardStats(`?year=2024&period=today`));
	}, []);

	return dashboardStats?.year ? (
		<div className="mt-3">
			<div className="row">
				<div className="col-lg-4 mb-4">
					<DashboardCard>
						<div className="head">
							<h6>Organizations</h6>
						</div>
						<div className="body">
							<div className="content">
								<h6>Total</h6>
								<h4>{dashboardStats.totalBusinesses}</h4>
							</div>
						</div>
					</DashboardCard>
				</div>
				<div className="col-lg-4 mb-4">
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
				<div className="col-lg-4 mb-4">
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
				<div className="col-lg-8 mb-4">
					<DashboardCard>
						<div className="head">
							<h6>Sales Volume</h6>
						</div>
						<div className="body">
							<PieChart
								arr={dashboardStats.sales}
								labels={dashboardStats.businesses}
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
	);
};

export default Dashboard;
