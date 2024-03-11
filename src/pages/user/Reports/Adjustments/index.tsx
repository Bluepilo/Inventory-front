import React, { useEffect, useState } from "react";
import { OptionProp } from "../../../../components/Filters/BasicInputs";
import TitleCover from "../../../../components/TitleCover";
import Filters from "../../../../components/Filters";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../../redux/hooks";
import { IoCartSharp } from "react-icons/io5";
import productService from "../../../../redux/features/product/product-service";
import { Table, TableComponent } from "../../../../styles/table.styles";
import dateFormat from "dateformat";
import { formatCurrency } from "../../../../utils/currency";
import SkeletonTable from "../../../../components/Loaders/SkeletonTable";

const Adjustments = () => {
	const navigate = useNavigate();

	const { token } = useAppSelector((state) => state.auth);

	const [lists, setLists] = useState<any>({});

	const [shopId, setShopId] = useState<OptionProp | null>(null);
	const [staffId, setStaffId] = useState<OptionProp | null>(null);
	const [startDate, setStartDate] = useState(
		new Date(new Date().getFullYear(), new Date().getMonth(), 1)
	);
	const [endDate, setEndDate] = useState(
		new Date(new Date().setDate(new Date().getDate() + 1))
	);
	const [productId, setProductId] = useState<OptionProp | null>(null);
	const [productList, setProductList] = useState<OptionProp[]>([]);
	const [load, setLoad] = useState(false);

	let filters = `?shopId=${shopId?.value || ""}&userId=${
		staffId?.value || ""
	}&productId=${
		productId?.value || ""
	}&startDate=${startDate}&endDate=${endDate}&adjustment=true`;

	const clearFilters = () => {
		setProductId(null);
		setStaffId(null);
		setShopId(null);
		setStartDate(
			new Date(new Date().getFullYear(), new Date().getMonth(), 1)
		);
		setEndDate(new Date(new Date().setDate(new Date().getDate() + 1)));
	};

	useEffect(() => {
		window.scrollTo(0, 0);
		getReports();
	}, [filters]);

	useEffect(() => {
		getProducts();
	}, []);

	const getReports = async () => {
		try {
			setLoad(true);
			let res = await productService.getLogReports(token, filters);
			setLoad(false);
			setLists(res);
		} catch (err) {
			setLoad(false);
		}
	};

	const getProducts = async () => {
		try {
			let res = await productService.allProducts(token, "?all=true");
			let arr = res?.rows.map((a: any) => {
				return { ...a, label: a.summary, value: a.id };
			});
			setProductList(arr || []);
		} catch (err) {}
	};

	return (
		<div>
			<TitleCover
				title="Stock Adjustments"
				dataCount={lists?.log?.length}
				button="Adjust Stock"
				buttonIcon={<IoCartSharp />}
				buttonClick={() => navigate("new")}
			/>
			<Filters
				shopId={shopId}
				changeShopId={setShopId}
				startDate={startDate}
				changeStartDate={setStartDate}
				endDate={endDate}
				changeEndDate={setEndDate}
				clearValues={clearFilters}
				staffId={staffId}
				changeStaffId={setStaffId}
				others={productId}
				changeOthers={setProductId}
				othersLabel="Product"
				othersList={productList}
			/>
			<div className="mt-4">
				<TableComponent>
					<div className="table-responsive">
						<Table className="table">
							<thead>
								<tr>
									<th>Date</th>
									<th>Product</th>
									<th>Staff</th>
									<th>Shop</th>
									<th>Units</th>
									<th className="price">Value</th>
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
											<td>{l.product?.summary}</td>
											<td>{l.user?.fullName}</td>
											<td>{l.shop?.name}</td>
											<td>{l.quantity}</td>
											<td className="price">
												₦ {formatCurrency(l.total)}
											</td>
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

export default Adjustments;
