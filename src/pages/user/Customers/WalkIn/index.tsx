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

	const debouncedSearch = UseDebounce(search);

	let filters = `?page=${page}&limit=${limit}&shopId=${details.shopId || ""}`;

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
										? `₦ ${formatCurrency(
												summary.totalInWallet
										  )}`
										: "--"}
								</h6>
							</div>

							<div>
								<h6>Total Debts in Wallets:</h6>
								<h6>
									{summary?.totalDebts
										? `₦ ${formatCurrency(
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
										<th>Last Transaction</th>
										<th>First Transaction</th>
										<th>Customer Name</th>
										<th>Phone</th>
										<th className="price">
											Wallet Balance
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
													₦{" "}
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
