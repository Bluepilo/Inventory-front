import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { PaginateStyles } from "../styles/table.styles";
import { useState } from "react";

interface Props {
	changeLimit: (arg: number) => void;
	limit: number;
	count: number;
	pageNumber: number;
	onNext: (arg: number) => void;
	onPrev: (arg: number) => void;
}

const Paginate = ({
	changeLimit,
	count,
	limit,
	pageNumber,
	onNext,
	onPrev,
}: Props) => {
	const pages = Math.ceil(count / limit);

	return (
		<PaginateStyles>
			<div className="select">
				<select
					value={limit}
					onChange={(e) => {
						changeLimit(Number(e.target.value));
					}}
				>
					<option value={"10"}>10</option>
					<option value={"20"}>20</option>
					<option value={"50"}>50</option>
					<option value={"100"}>100</option>
				</select>
				<span>entries per page</span>
			</div>
			<div className="clicks">
				<button
					disabled={pageNumber > 1 ? false : true}
					onClick={() => onPrev(pageNumber - 1)}
				>
					<RxCaretLeft />
					<span className="ms-1">Previous Page</span>
				</button>
				<div>1</div>
				<button
					disabled={pageNumber != pages ? false : true}
					onClick={() => onNext(pageNumber + 1)}
				>
					<span className="me-1">Next Page</span>
					<RxCaretRight />
				</button>
			</div>
			<div className="infos">
				<p>
					Page {pageNumber} of {pages}
				</p>
				<p>
					{count} {count > 1 ? "entries" : "entry"}
					{/* 1 - {limit} of {count} entries */}
				</p>
			</div>
		</PaginateStyles>
	);
};

export default Paginate;
