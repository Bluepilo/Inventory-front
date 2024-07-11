import { useEffect, useState } from "react";
import TitleCover from "../../../../components/TitleCover";
import { BasicSearch } from "../../../../components/Filters/BasicInputs";
import { SummaryCard } from "../../../../styles/dashboard.styles";
import { formatCurrency } from "../../../../utils/currency";
import { UseDebounce } from "../../../../utils/hooks";
import customerService from "../../../../redux/features/customer/customer-services";
import { useAppSelector } from "../../../../redux/hooks";
import { Table, TableComponent } from "../../../../styles/table.styles";
import dateFormat from "dateformat";
import { Link } from "react-router-dom";
import SuccessIcon from "../../../../assets/icons/success.svg";
import FailedIcon from "../../../../assets/icons/failed.svg";
import SkeletonTable from "../../../../components/Loaders/SkeletonTable";
import Paginate from "../../../../components/Paginate";

const WalkIn = () => {
	const { token, details } = useAppSelector((state) => state.auth);

	const [load, setLoad] = useState(false);
	const [search, setSearch] = useState("");
	const [lists, setList] = useState<any>({});
	const [summary, setSummary] = useState<any>({});
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(20);
	const [sortConfig, setSortConfig] = useState({
		keys: [
			"createdAt",
			"updatedAt",
			"fullName",
			"phoneNo",
			"balance",
			"isActive",
		],
		direction: "asc",
	});

	const debouncedSearch = UseDebounce(search);

	let filters = `?page=${page}&limit=${limit}&shopId=${details.shopId || ""}`;

	const currency =
		details.business?.currency?.symbol || details.business.currencyCode;

	useEffect(() => {
		window.scrollTo(0, 0);
		if (debouncedSearch) {
			searchWalkins();
		} else {
			listWalkins();
		}
		getSummary();
	}, [filters, debouncedSearch]);

	const searchWalkins = async () => {
		try {
			setLoad(true);
			let res = await customerService.searchWalkIns(
				token,
				filters,
				debouncedSearch
			);
			setLoad(false);
			setList(res);
		} catch (err) {
			setLoad(false);
		}
	};

	const listWalkins = async () => {
		try {
			setLoad(true);
			let res = await customerService.getWalkIns(token, filters);
			setLoad(false);
			setList(res);
		} catch (err) {
			setLoad(false);
		}
	};

	const getSummary = async () => {
		try {
			let res = await customerService.walkInSummary(
				token,
				debouncedSearch
			);
			setSummary(res);
		} catch (err) {}
	};

	const handleSort = (key: string) => {
		let direction = "asc";

		if (sortConfig.keys.includes(key) && sortConfig.direction === "asc") {
			direction = "desc";
		}

		const sortedCustomers = [...lists.rows].sort((a, b) => {
			let comparison = 0;

			if (key === "balance") {
				const balanceA = parseFloat(a.balance) || 0;
				const balanceB = parseFloat(b.balance) || 0;
				comparison = balanceA - balanceB;
			} else {
				const valueA = String(a[key] || "");
				const valueB = String(b[key] || "");
				comparison = valueA.localeCompare(valueB, "en", {
					sensitivity: "base",
				});
			}

			return direction === "asc" ? comparison : -comparison;
		});

		setSortConfig({ keys: [key], direction });
		setList({ ...lists, rows: sortedCustomers });
	};

	return (
		<div>
			<TitleCover title="Walk-in Customers" dataCount={lists?.count} />
			<div className="mt-3">
				<div className="row">
					<div className="col-md-6">
						<BasicSearch
							searchVal={search}
							changeSearchVal={setSearch}
							wide="true"
							placeholder="Search by name, address or phone"
						/>
					</div>
				</div>
				<div className="row align-items-center mt-4">
					<div className="col-lg-7 mb-3">
						<SummaryCard>
							<div>
								<h6>Total in Wallets: </h6>
								<h6>
									{summary?.totalInWallet
										? `${currency} ${formatCurrency(
												summary.totalInWallet
										  )}`
										: "--"}
								</h6>
							</div>

							<div>
								<h6>Total Debts in Wallets:</h6>
								<h6>
									{summary?.totalDebts
										? `${currency} ${formatCurrency(
												summary.totalDebts
										  )}`
										: "--"}
								</h6>
							</div>
						</SummaryCard>
					</div>
				</div>
				<div className="mt-4">
					<TableComponent>
						<div className="table-responsive">
							<Table className="table">
								<thead>
									<tr>
										<th
											className="point"
											onClick={() =>
												handleSort("updatedAt")
											}
										>
											Last Transaction{" "}
											{sortConfig.keys.includes(
												"updatedAt"
											) && (
												<span>
													{sortConfig.direction ===
													"asc"
														? "▲"
														: "▼"}
												</span>
											)}
										</th>
										<th
											className="point"
											onClick={() =>
												handleSort("createdAt")
											}
										>
											First Transaction{" "}
											{sortConfig.keys.includes(
												"createdAt"
											) && (
												<span>
													{sortConfig.direction ===
													"asc"
														? "▲"
														: "▼"}
												</span>
											)}
										</th>
										<th
											className="point"
											onClick={() =>
												handleSort("fullName")
											}
										>
											Customer Name{" "}
											{sortConfig.keys.includes(
												"fullName"
											) && (
												<span>
													{sortConfig.direction ===
													"asc"
														? "▲"
														: "▼"}
												</span>
											)}
										</th>
										<th
											className="point"
											onClick={() =>
												handleSort("phoneNo")
											}
										>
											Phone{" "}
											{sortConfig.keys.includes(
												"phoneNo"
											) && (
												<span>
													{sortConfig.direction ===
													"asc"
														? "▲"
														: "▼"}
												</span>
											)}
										</th>
										<th
											className="price point"
											onClick={() =>
												handleSort("balance")
											}
										>
											Wallet Balance{" "}
											{sortConfig.keys.includes(
												"balance"
											) && (
												<span>
													{sortConfig.direction ===
													"asc"
														? "▲"
														: "▼"}
												</span>
											)}
										</th>
										<th>Status</th>
									</tr>
								</thead>
								{!load && (
									<tbody>
										{lists?.rows?.map((l: any) => (
											<tr key={l.id}>
												<td>
													{dateFormat(
														l.updatedAt,
														"mmm dd, yyyy"
													)}
												</td>
												<td>
													{dateFormat(
														l.createdAt,
														"mmm dd, yyyy"
													)}
												</td>
												<td className="link">
													<Link to={`${l.id}`}>
														{l.fullName?.slice(
															0,
															12
														)}{" "}
														{l.fullName?.length >
															12 && "..."}
													</Link>
												</td>
												<td>{l.phoneNo}</td>
												<td
													className="price"
													style={{
														color:
															l.balance > 0
																? "inherit"
																: "red",
													}}
												>
													{currency}{" "}
													{formatCurrency(l.balance)}
												</td>
												<td className="status">
													<img
														src={
															l.isActive
																? SuccessIcon
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
					{lists?.count ? (
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
	);
};

export default WalkIn;
