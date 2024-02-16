import React from "react";
import { Table } from "../styles/table.styles";

interface Props {
	head: any;
	body: any;
}

const TableContent = ({ head, body }: Props) => {
	return (
		<Table className="table">
			{Array.isArray(head) && (
				<thead>
					<tr>
						{head.map((h, i) => (
							<th key={i}>{h}</th>
						))}
					</tr>
				</thead>
			)}
		</Table>
	);
};

export default TableContent;
