import { useEffect, useState } from "react";
import TitleCover from "../../../components/TitleCover";
import { Plan, SubSwitch } from "../../../styles/sub.styles";
import subscriptionService from "../../../redux/features/subscription/subscriptionService";
import Loading from "../../../components/Loaders/Loading";
import { formatCurrency } from "../../../utils/currency";
import { FaCircleCheck } from "react-icons/fa6";
import { MainButton } from "../../../styles/links.styles";
import ModalComponent from "../../../components/ModalComponent";
import Subscribe from "../../../components/Subscription/Subscribe";

const Upgrade = () => {
	const [isMonthly, setIsMonthly] = useState(false);
	const [plans, setPlans] = useState([]);
	const [openModal, setOpenModal] = useState(false);
	const [planDetail, setPlanDetail] = useState({});

	useEffect(() => {
		window.scrollTo(0, 0);
		getPlans();
	}, []);

	const getPlans = async () => {
		try {
			let res = await subscriptionService.getPlans();
			let arr = res?.filter((a: any) => a.name !== "Free");
			setPlans(arr || []);
		} catch (err) {}
	};

	return (
		<div>
			<TitleCover title="Upgrade your Subscription" />
			<SubSwitch isMonthly={`${isMonthly}`}>
				<div className="b-switch">
					<button
						onClick={() => setIsMonthly(true)}
						className={isMonthly ? "active" : ""}
					>
						Billed Monthly
					</button>
					<button
						onClick={() => setIsMonthly(false)}
						className={!isMonthly ? "active" : ""}
					>
						Billed Annually <span className="count">Save 33%</span>
					</button>
				</div>
			</SubSwitch>
			{plans?.length > 0 ? (
				<div className="row mt-4">
					{plans.map((p: any) => (
						<div className="col-lg-3 col-sm-6 mb-3" key={p.id}>
							<Plan>
								<h6>{p.name}</h6>
								<p>
									₦{" "}
									{formatCurrency(
										isMonthly
											? p.monthlyPrice
											: p.annualPrice
									)}
									<sup>/{isMonthly ? "Month" : "Year"}</sup>
								</p>
								<div className="mt-2">
									<p className="content">
										<FaCircleCheck
											color={
												!isMonthly
													? "#0241ff"
													: "#FFB500"
											}
										/>
										<span>
											{p.noOfShops} Outlet/Shop/Office
										</span>
									</p>
									<p className="content">
										<FaCircleCheck
											color={
												!isMonthly
													? "#0241ff"
													: "#FFB500"
											}
										/>
										<span>{p.noOfUsers} Active Users</span>
									</p>
									<p className="content">
										<FaCircleCheck
											color={
												!isMonthly
													? "#0241ff"
													: "#FFB500"
											}
										/>
										{p.name === "Premium" ? (
											<span>Transaction Limited</span>
										) : (
											<span>
												{p.name === "Starter"
													? "1000"
													: p.name === "Basic"
													? "2000"
													: "5000"}{" "}
												Transaction per month
											</span>
										)}
									</p>
									<p className="content">
										<FaCircleCheck
											color={
												!isMonthly
													? "#0241ff"
													: "#FFB500"
											}
										/>
										<span>Products Unlimited</span>
									</p>
									<p className="content">
										<FaCircleCheck
											color={
												!isMonthly
													? "#0241ff"
													: "#FFB500"
											}
										/>
										<span>Customers Unlimited</span>
									</p>
									<p className="content">
										<FaCircleCheck
											color={
												!isMonthly
													? "#0241ff"
													: "#FFB500"
											}
										/>
										<span>Suppliers Unlimited</span>
									</p>
									<p className="content">
										<FaCircleCheck
											color={
												!isMonthly
													? "#0241ff"
													: "#FFB500"
											}
										/>
										<span>File Library 1GB</span>
									</p>
									<p className="content">
										<FaCircleCheck
											color={
												!isMonthly
													? "#0241ff"
													: "#FFB500"
											}
										/>
										<span>Transaction sms alert Addon</span>
									</p>
									<p className="content">
										<FaCircleCheck
											color={
												!isMonthly
													? "#0241ff"
													: "#FFB500"
											}
										/>
										<span>Advance Report</span>
									</p>
									<p className="content">
										<FaCircleCheck
											color={
												!isMonthly
													? "#0241ff"
													: "#FFB500"
											}
										/>
										<span>Managed Catalogue</span>
									</p>
									<p className="content">
										<FaCircleCheck
											color={
												!isMonthly
													? "#0241ff"
													: "#FFB500"
											}
										/>
										<span>Expense Manager</span>
									</p>
								</div>
								<MainButton
									className="mt-3"
									bg={!isMonthly ? "#0241ff" : "#FFB500"}
									color={!isMonthly ? "#fff" : "#000D33"}
									onClick={() => {
										setPlanDetail(p);
										setOpenModal(true);
									}}
								>
									<span>Subscribe</span>
								</MainButton>
							</Plan>
						</div>
					))}
				</div>
			) : (
				<div className="mt-5">
					<Loading />
				</div>
			)}
			<ModalComponent open={openModal} close={() => setOpenModal(false)}>
				<Subscribe
					plan={planDetail}
					plans={plans}
					close={() => setOpenModal(false)}
				/>
			</ModalComponent>
		</div>
	);
};

export default Upgrade;
