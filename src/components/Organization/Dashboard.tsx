import { CiShop } from "react-icons/ci";
import { HiDotsVertical, HiOutlineUsers } from "react-icons/hi";
import { TbReceipt } from "react-icons/tb";
import { FaRegEdit } from "react-icons/fa";
import { useAppSelector } from "../../redux/hooks";
import SubIcon from "../../assets/menus/subscription.svg";
import { Drop } from "../../styles/basic.styles";
import { FiUserPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
	const navigate = useNavigate();

	const { details } = useAppSelector((state) => state.auth);
	const { organization } = useAppSelector((state) => state.basic);

	const getPercent = (a: number, b: number) => {
		let calcA = a || 0;
		let calcB = b || 0;
		let calc = (calcA / calcB) * 100;
		return calc;
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
									<span className="ms-2">Create Users</span>
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
								{details.organization.id}
							</span>
							<span className="col-6 ss mt-3">
								Active Subscription
							</span>
							<span className="col-6 mt-3">
								{details.organization?.subscriptionPlan?.name}
							</span>
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
										<span>
											{organization?.users[0]?.isActive}
										</span>
										/{organization?.users[0]?.count}
									</p>
									<div className="prog">
										<div
											style={{
												width: `${getPercent(
													organization?.users[0]
														?.isActive,
													organization?.users[0]
														?.count
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
										<span>
											{organization?.shops[0]?.isActive ||
												"0"}
										</span>
										/{organization?.shops[0]?.count || "0"}
									</p>
									<div className="prog">
										<div
											style={{
												width: `${getPercent(
													organization?.shops[0]
														?.isActive,
													organization?.shops[0]
														?.count
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
										<span>0</span>/0
									</p>
									<div className="prog">
										<div
											style={{
												width: `100%`,
											}}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
