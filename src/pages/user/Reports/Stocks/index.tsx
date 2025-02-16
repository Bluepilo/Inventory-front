import { useEffect, useState } from "react";
import TitleCover from "../../../../components/TitleCover";
import Filters from "../../../../components/Filters";
import { OptionProp } from "../../../../components/Filters/BasicInputs";
import productService from "../../../../redux/features/product/product-service";
import { useAppSelector } from "../../../../redux/hooks";
import { UseDebounce } from "../../../../utils/hooks";
import {
	CheckBoxPrint,
	SummaryCard,
} from "../../../../styles/dashboard.styles";
import { formatCurrency } from "../../../../utils/currency";
import { Table, TableComponent } from "../../../../styles/table.styles";
import SkeletonTable from "../../../../components/Loaders/SkeletonTable";
import { Link } from "react-router-dom";
import Paginate from "../../../../components/Paginate";
import StockAlert from "../../../../components/Reports/StockAlert";
import { FaFileCsv } from "react-icons/fa6";
import { CSVLink } from "react-csv";
import RoleGuard from "../../../../components/RoleGuard";

const Stocks = () => {
	const { currency } = useAppSelector((state) => state.auth);

	const [lists, setLists] = useState<any>({});

	const [shopId, setShopId] = useState<OptionProp | null>(null);
	const [categoryId, setCategoryId] = useState<OptionProp | null>(null);
	const [brandId, setBrandId] = useState<OptionProp | null>(null);

	const [categories, setCategories] = useState([]);
	const [brands, setBrands] = useState([]);
	const [load, setLoad] = useState(false);
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(20);
	const [minStock, setMinStock] = useState("1");
	const [search, setSearch] = useState("");

	const debouncedSearch = UseDebounce(search);

	let filters = `?page=${page}&limit=${limit}&shopId=${
		shopId?.value || ""
	}&categoryId=${categoryId?.value || ""}&brandId=${
		brandId?.value || ""
	}&minStock=${minStock}&searchWord=${debouncedSearch}`;

	useEffect(() => {
		listData();
	}, []);

	useEffect(() => {
		window.scrollTo(0, 0);
		getReports();
	}, [filters]);

	const listData = async () => {
		try {
			let brandRes = await productService.filterBrands("?business=true");
			let categoryRes = await productService.productCategories();

			let arrBrand = brandRes?.map((r: any) => {
				return { label: r.name, value: r.id };
			});
			setBrands(arrBrand);

			let arrCategory = categoryRes?.map((r: any) => {
				return { label: r.name, value: r.id };
			});
			setCategories(arrCategory);
		} catch (err) {}
	};

	const clearFilters = () => {
		setBrandId(null);
		setCategoryId(null);
		setShopId(null);
	};

	const getReports = async () => {
		try {
			setLoad(true);
			let res = await productService.stockReports(filters);
			setLoad(false);
			let arr = res?.rows?.map((l: any) => {
				return { ...l, finalValue: l.costPrice * l.totalStock };
			});
			setLists({ ...res, rows: arr });
		} catch (err) {
			setLoad(false);
		}
	};

	const headers = [
		{ label: "Product", key: "summary" },
		{ label: "Unit", key: "totalStock" },
		{ label: "Stock Value", key: `finalValue` },
	];

	return (
		<div>
			<TitleCover title="Total Stocks" dataCount={lists?.count} />
			<Filters
				isSearchable={true}
				searchVal={search}
				changeSearchVal={setSearch}
				shopId={shopId}
				changeShopId={setShopId}
				categoryList={categories}
				expenseCategory={categoryId}
				changeExpenseCategory={setCategoryId}
				others={brandId}
				changeOthers={setBrandId}
				othersList={brands}
				othersLabel={"Brands"}
				clearValues={clearFilters}
			/>
			<div className="row align-items-center mt-4">
				<div className="col-lg-7 mb-3">
					<SummaryCard>
						<div>
							<h6>Products in stock: </h6>
							<h6>{lists?.summary?.stock || "--"}</h6>
						</div>
						<RoleGuard access="isBusinessAdmin">
							<div>
								<h6>Worth: </h6>
								<h6>
									{lists?.summary?.worth
										? `${currency} ${formatCurrency(
												lists.summary.worth
										  )}`
										: "--"}
								</h6>
							</div>
						</RoleGuard>
					</SummaryCard>
				</div>
				<div className="col-lg-5 mb-3">
					<CheckBoxPrint>
						<div className="checks">
							<input
								type="checkbox"
								checked={minStock === "0" ? true : false}
								onChange={(e) =>
									setMinStock(e.target.checked ? "0" : "1")
								}
								name="withdrawn"
							/>
							<label htmlFor="withdrawn">
								Include Zero Units
							</label>
						</div>
						{lists?.rows && (
							<CSVLink
								data={lists.rows}
								headers={headers}
								filename="Stock Reports"
								className="main-btn"
							>
								<FaFileCsv />
								<span>Export CSV</span>
							</CSVLink>
						)}
					</CheckBoxPrint>
				</div>
			</div>
			<div className="mt-4">
				<TableComponent>
					<div className="table-responsive">
						<Table className="table">
							<thead>
								<tr>
									<th>Product</th>
									<th>Unit</th>
									<th>Min Stock (Alert)</th>
									<th className="price">Stock Value</th>
								</tr>
							</thead>
							{!load && (
								<tbody>
									{lists?.rows?.map((l: any) => (
										<tr key={l.id}>
											<td className="link">
												<Link
													to={`${l.id}`}
													state={{ name: l.summary }}
												>
													{l.summary}
												</Link>{" "}
											</td>
											<td>{l.totalStock}</td>
											<td>
												<StockAlert stock={l} />
											</td>
											<td className="price">
												{currency}{" "}
												{formatCurrency(l.finalValue)}
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
	);
};

export default Stocks;
