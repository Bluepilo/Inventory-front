import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import subscriptionService from "../../redux/features/subscription/subscriptionService";
import { Table } from "../../styles/table.styles";
import dateFormat from "dateformat";
import { formatCurrency } from "../../utils/currency";
import SkeletonTable from "../Loaders/SkeletonTable";
import Paginate from "../Paginate";

const WalletHistory = ({ reload }: { reload: boolean }) => {
	const [load, setLoad] = useState(false);
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const [list, setList] = useState<any>({});

	let filters = `?page=${page}&limit=${limit}`;

	useEffect(() => {
		window.scrollTo(0, 0);
		getPayments();
	}, [filters, reload]);

	const getPayments = async () => {
		try {
			setLoad(true);
			let res = await subscriptionService.getPaymentHistory(filters);
			setLoad(false);
			setList(res);
		} catch (err) {
			setLoad(false);
		}
	};

	return (
		<>
			<div className="table-responsive">
				<Table className="table">
					<thead>
						<tr>
							<th>Date</th>
							<th>Transaction Type</th>
							<th>Credit</th>
							<th>Debit</th>
							<th>Balance</th>
						</tr>
					</thead>
					<tbody>
						{list?.rows?.map((tr: any) => (
							<tr key={tr.id}>
								<td>
									{" "}
									{dateFormat(tr.createdAt, "mmm dd, yyyy")}
								</td>
								<td>
									{tr.mode === "in"
										? "Topup"
										: "Subscription"}
								</td>
								<td>
									{tr.mode === "in"
										? `₦ ${formatCurrency(tr.amountPaid)}`
										: ""}
								</td>
								<td>
									{tr.mode === "out"
										? `₦ ${formatCurrency(tr.amountPaid)}`
										: ""}
								</td>
								<td>₦ {formatCurrency(tr.balanceAfter)}</td>
							</tr>
						))}
					</tbody>
				</Table>
			</div>
			{!list?.rows && <SkeletonTable />}
			{!load && list?.count ? (
				<Paginate
					changeLimit={(l) => setLimit(l)}
					limit={list.limit}
					count={list.count}
					pageNumber={page}
					onPrev={(n) => setPage(n)}
					onNext={(n) => setPage(n)}
				/>
			) : (
				<></>
			)}
		</>
	);
};

export default WalletHistory;
