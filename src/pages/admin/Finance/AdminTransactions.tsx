import { useEffect, useState } from "react";
import TitleCover from "../../../components/TitleCover";
import adminService from "../../../redux/features/admin/admin-service";
import { useAppSelector } from "../../../redux/hooks";
import { Table, TableComponent } from "../../../styles/table.styles";
import dateFormat from "dateformat";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../../utils/currency";
import SkeletonTable from "../../../components/Loaders/SkeletonTable";
import Paginate from "../../../components/Paginate";

const AdminTransactions = () => {
	const { token } = useAppSelector((state) => state.auth);

	const [load, setLoad] = useState(false);
	const [list, setList] = useState<any>({});
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(20);

	let filters = `?page=${page}&limit=${limit}`;

	useEffect(() => {
		window.scrollTo(0, 0);
		listTransactions();
	}, [filters]);

	const listTransactions = async () => {
		try {
			setLoad(true);
			let res = await adminService.listTransactions(filters, token);
			setLoad(false);
			setList(res);
		} catch (err) {
			setLoad(false);
		}
	};

	return (
		<div>
			<TitleCover title="Transactions" dataCount={list?.count} />
			<div className="mt-3">
				<TableComponent>
					<div className="table-responsive">
						<Table className="table">
							<thead>
								<tr>
									<th>Payment Date</th>
									<th>Organization</th>
									<th>Transaction Type</th>
									<th>Credit</th>
									<th>Debit</th>
								</tr>
							</thead>
							<tbody>
								{!load &&
									list?.rows?.map((tr: any) => (
										<tr key={tr.id}>
											<td>
												{dateFormat(
													tr.updatedAt,
													"mmm dd, yyyy"
												)}
											</td>
											<td className="link">
												<Link
													to={`/admin/organizations/${tr.organization?.id}`}
												>
													{tr.organization?.name}
												</Link>
											</td>
											<td>{tr.transactionType}</td>
											<td>
												{tr.mode === "in"
													? `${formatCurrency(
															tr.amountPaid
													  )}`
													: "--"}
											</td>
											<td>
												{tr.mode === "out"
													? `${formatCurrency(
															tr.amountPaid
													  )}`
													: "--"}
											</td>
										</tr>
									))}
							</tbody>
						</Table>
					</div>
					{load && <SkeletonTable />}
				</TableComponent>
				{!load && list?.count ? (
					<Paginate
						changeLimit={(l) => setLimit(l)}
						limit={limit}
						count={list.count}
						pageNumber={page}
						onPrev={(n) => setPage(n)}
						onNext={(n) => setPage(n)}
					/>
				) : (
					<></>
				)}
			</div>
		</div>
	);
};

export default AdminTransactions;
