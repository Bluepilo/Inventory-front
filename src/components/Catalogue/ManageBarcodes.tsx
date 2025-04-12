import React from "react";
import { Table, TableComponent } from "../../styles/table.styles";
import SkeletonTable from "../Loaders/SkeletonTable";
import EachManageBarcode from "../Lists/EachManageBarcode";

const ManageBarcodes = ({
	list,
	load,
	reload,
	openCode,
}: {
	list: any;
	load: boolean;
	reload: () => void;
	openCode: (arg: any) => void;
}) => {
	return (
		<TableComponent>
			<div className="table-responsive">
				<Table className="table">
					<thead>
						<tr>
							<th>Product</th>
							<th>Barcode</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{!load &&
							list?.rows?.map((li: any) => (
								<EachManageBarcode
									li={li}
									key={li.id}
									reload={reload}
									openCode={openCode}
								/>
							))}
					</tbody>
				</Table>
			</div>
			{load && <SkeletonTable />}
		</TableComponent>
	);
};

export default ManageBarcodes;
