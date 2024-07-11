import { useEffect, useState } from "react";
import TitleCover from "../../../../components/TitleCover";
import Filters from "../../../../components/Filters";
import { OptionProp } from "../../../../components/Filters/BasicInputs";
import {
	CheckBoxPrint,
	SummaryCard,
} from "../../../../styles/dashboard.styles";
import { Link, useLocation, useParams } from "react-router-dom";
import { MainButton } from "../../../../styles/links.styles";
import { IoIosCloudDownload } from "react-icons/io";
import { Table, TableComponent } from "../../../../styles/table.styles";
import SkeletonTable from "../../../../components/Loaders/SkeletonTable";
import productService from "../../../../redux/features/product/product-service";
import { useAppSelector } from "../../../../redux/hooks";
import dateFormat from "dateformat";

const ProductHistory = () => {
	const name = useLocation().state?.name;

	const id = useParams()?.id;

	const { token, details } = useAppSelector((state) => state.auth);

	const [lists, setLists] = useState<any>({});

	const [startDate, setStartDate] = useState(
		new Date(new Date().getFullYear(), new Date().getMonth(), 1)
	);
	const [endDate, setEndDate] = useState(
		new Date(new Date().setDate(new Date().getDate() + 1))
	);
	const [shopId, setShopId] = useState<OptionProp | null>(null);
	const [typeId, setTypeId] = useState<OptionProp | null>(null);
	const [load, setLoad] = useState(false);
	const [dateType, setDateType] = useState({
		label: "This Month",
		value: "month",
	});

	let filters = `?startDate=${startDate}&endDate=${endDate}&productId=${id}&shopId=${
		details.shopId || shopId?.value || ""
	}&productLogTypeId=${typeId?.value || ""}`;

	useEffect(() => {
		logHistory();
	}, [filters]);

	const logHistory = async () => {
		try {
			setLoad(true);
			let res = await productService.getLogReports(token, filters);
			setLists(res);
			setLoad(false);
		} catch (err) {
			setLoad(false);
		}
	};

	const clearFilters = () => {
		setStartDate(
			new Date(new Date().getFullYear(), new Date().getMonth(), 1)
		);
		setEndDate(new Date(new Date().setDate(new Date().getDate() + 1)));
		setTypeId(null);
		setShopId(null);
		setDateType({ label: "This Month", value: "month" });
	};

	return (
		<div>
			<TitleCover
				title="Product History"
				dataCount={lists?.log?.length}
			/>
			<Filters
				startDate={startDate}
				changeStartDate={setStartDate}
				endDate={endDate}
				changeEndDate={setEndDate}
				shopId={shopId}
				changeShopId={setShopId}
				clearValues={clearFilters}
				logType={typeId}
				changeLogType={setTypeId}
				dateType={dateType}
				changeDateType={setDateType}
			/>
			<div className="row align-items-center mt-4">
				<div className="col-lg-8 mb-3">
					<SummaryCard>
						{name && (
							<div>
								<h6>Product: </h6>
								<h6>{name}</h6>
							</div>
						)}
						<div>
							<h6>Stock: </h6>
							<h6>{lists?.stock || "--"}</h6>
						</div>
					</SummaryCard>
				</div>
				<div className="col-lg-4 mb-3">
					<CheckBoxPrint>
						<MainButton>
							<IoIosCloudDownload />
							<span>Download Report</span>
						</MainButton>
					</CheckBoxPrint>
				</div>
			</div>
			<div className="mt-4">
				<TableComponent>
					<div className="table-responsive">
						<Table className="table">
							<thead>
								<tr>
									<th>Date Created</th>
									<th>Staff</th>
									<th>Shop</th>
									<th>Transaction Type</th>
									<th>In</th>
									<th>Out</th>
									<th>Total</th>
								</tr>
							</thead>
							{!load && (
								<tbody>
									{lists?.log?.map((l: any) => (
										<tr key={l.id}>
											<td>
												{dateFormat(
													l.createdAt,
													"mmm dd, yyyy"
												)}
											</td>
											<td>{l.user?.firstName}</td>
											<td>{l.shop?.name}</td>
											<td className="link">
												{l.logType?.name === "Sale" ? (
													<Link
														to={`/dashboard/sales/${l.saleId}`}
													>
														Sale
													</Link>
												) : l.logType?.name ===
												  "Purchase" ? (
													<Link
														to={`/dashboard/purchases/${l.purchaseId}`}
													>
														{l.purchase
															?.isOnboarding
															? "Imported"
															: "Purchase"}
													</Link>
												) : (
													l.logType?.name
												)}
											</td>
											<td>
												{l.mode === "in"
													? l.quantity
													: "--"}
											</td>
											<td>
												{l.mode === "out"
													? l.quantity
													: "--"}
											</td>
											<td>{l.stockAfter}</td>
										</tr>
									))}
								</tbody>
							)}
						</Table>
					</div>
					{load && <SkeletonTable />}
				</TableComponent>
			</div>
		</div>
	);
};

export default ProductHistory;
