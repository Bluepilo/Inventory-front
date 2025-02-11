import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../../redux/hooks";
import NewPage from "../../../../components/NewPage";
import CoverImg from "../../../../assets/defaults/purchase.png";
import { IoCartSharp } from "react-icons/io5";
import TitleCover from "../../../../components/TitleCover";
import Filters from "../../../../components/Filters";
import { OptionProp } from "../../../../components/Filters/BasicInputs";
import purchaseService from "../../../../redux/features/purchase/purchase-service";
import { Table, TableComponent } from "../../../../styles/table.styles";
import dateFormat from "dateformat";
import { formatCurrency } from "../../../../utils/currency";
import SuccessIcon from "../../../../assets/icons/success.svg";
import PendingIcon from "../../../../assets/icons/pending.svg";
import FailedIcon from "../../../../assets/icons/failed.svg";
import SkeletonTable from "../../../../components/Loaders/SkeletonTable";
import Paginate from "../../../../components/Paginate";
import { Alert } from "../../../../styles/basic.styles";

const ImportInventory = () => {
	const navigate = useNavigate();

	const { details, token, currency } = useAppSelector((state) => state.auth);

	const [lists, setLists] = useState<any>({});
	const [startDate, setStartDate] = useState(
		new Date(new Date().getFullYear(), new Date().getMonth(), 1)
	);
	const [endDate, setEndDate] = useState(
		new Date(new Date().setDate(new Date().getDate() + 1))
	);
	const [shopId, setShopId] = useState<OptionProp | null>(null);
	const [staffId, setStaffId] = useState<OptionProp | null>(null);
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(20);
	const [load, setLoad] = useState(false);
	const [dateType, setDateType] = useState({
		label: "This Month",
		value: "month",
	});

	let filters = `?page=${page}&limit=${limit}&shopId=${
		shopId?.value || ""
	}&userId=${
		staffId?.value || ""
	}&startDate=${startDate}&endDate=${endDate}&includeWithdrawn=0&onboarding=1`;

	useEffect(() => {
		window.scrollTo(0, 0);
		getPurchases();
	}, [filters]);

	const getPurchases = async () => {
		try {
			setLoad(true);
			let res = await purchaseService.getPurchase(token, filters);
			setLoad(false);
			setLists(res);
		} catch (err) {
			setLoad(false);
		}
	};

	const clearFilters = () => {
		setStartDate(
			new Date(new Date().getFullYear(), new Date().getMonth(), 1)
		);
		setEndDate(new Date(new Date().setDate(new Date().getDate() + 1)));
		setStaffId(null);
		setShopId(null);
	};

	return details.business.canOnboard ? (
		details.business.onboardingSteps?.purchase === "completed" ? (
			<div>
				<TitleCover
					title="Imported Inventories"
					dataCount={lists?.count}
					button="Import"
					buttonIcon={<IoCartSharp />}
					buttonClick={() => navigate("new")}
				/>
				<div>
					<Filters
						startDate={startDate}
						changeStartDate={setStartDate}
						endDate={endDate}
						changeEndDate={setEndDate}
						shopId={shopId}
						staffId={staffId}
						changeShopId={setShopId}
						changeStaffId={setStaffId}
						isSearchable={true}
						clearValues={clearFilters}
						dateType={dateType}
						changeDateType={setDateType}
					/>
					<div className="mt-4">
						<TableComponent>
							<div className="table-responsive">
								<Table className="table">
									<thead>
										<tr>
											<th>Date</th>
											<th className="price">
												Order Number
											</th>
											<th>Staff</th>
											<th>Shop</th>
											<th className="price">Price</th>
											<th>Status</th>
										</tr>
									</thead>

									{!load && (
										<tbody>
											{lists?.rows?.map((l: any) => (
												<tr key={l.id}>
													<td>
														{dateFormat(
															l.createdAt,
															"mmm dd, yyyy"
														)}
													</td>

													<td className="price link">
														<Link
															to={`/dashboard/purchases/${l.id}`}
														>
															{l.uniqueRef}
														</Link>
													</td>
													<td>
														{l?.user?.fullName.slice(
															0,
															15
														) || ""}{" "}
														{l?.user?.fullName
															?.length > 15 &&
															"..."}
													</td>
													<td>
														{l?.shop?.name.slice(
															0,
															15
														)}{" "}
														{l?.shop?.name?.length >
															15 && "..."}
													</td>

													<td className="price bold">
														{currency}{" "}
														{formatCurrency(
															l.totalPrice
														)}
													</td>

													<td className="status">
														<img
															src={
																l.status.toLowerCase() ===
																"success"
																	? SuccessIcon
																	: l.status.toLowerCase() ===
																	  "pending"
																	? PendingIcon
																	: FailedIcon
															}
														/>
													</td>
												</tr>
											))}
										</tbody>
									)}
								</Table>
							</div>
							{load && <SkeletonTable />}
						</TableComponent>
						{!load && lists?.count ? (
							<Paginate
								changeLimit={(l) => setLimit(l)}
								limit={lists.limit}
								count={lists.count}
								pageNumber={page}
								onPrev={(n) => setPage(n)}
								onNext={(n) => setPage(n)}
							/>
						) : (
							<></>
						)}
					</div>
				</div>
			</div>
		) : (
			<NewPage
				title={"Purchase"}
				img={CoverImg}
				cover="Import Inventory"
				desc={`Effortless import your current stock and start managing your business with ease.`}
				btnTitle={"Import Inventory"}
				linkTo={() => navigate("new")}
			/>
		)
	) : (
		<Alert>
			You don't have permission to import Inventories. Go to Settings to
			enable.
		</Alert>
	);
};

export default ImportInventory;
