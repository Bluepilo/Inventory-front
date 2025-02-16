import { useState } from "react";
import TitleCover from "../../../../components/TitleCover";
import { Form, FormBody } from "../../../../styles/form.styles";
import {
	DropDownSelect,
	OptionProp,
} from "../../../../components/Filters/BasicInputs";
import DateFilter from "../../../../components/Filters/DateFilter";
import customerService from "../../../../redux/features/customer/customer-services";
import { useAppSelector } from "../../../../redux/hooks";
import productService from "../../../../redux/features/product/product-service";
import { MainButton } from "../../../../styles/links.styles";
import { FaFileCsv } from "react-icons/fa";
import basicService from "../../../../redux/features/basic/basic-service";
import { displayError, displaySuccess } from "../../../../utils/errors";
import salesService from "../../../../redux/features/sales/sales-service";
import expenseService from "../../../../redux/features/expense/expense-service";
import purchaseService from "../../../../redux/features/purchase/purchase-service";
import Loading from "../../../../components/Loaders/Loading";

const Exports = () => {
	const { shops, staffs } = useAppSelector((state) => state.basic);

	const [reports] = useState([
		{ label: "Users", value: "users" },
		{ label: "Shops", value: "shops" },
		{ label: "Customers", value: "customers" },
		{
			label: "Customers' Transactions",
			value: "customers-transactions",
		},
		{
			label: "Expenses",
			value: "expenses",
		},
		{
			label: "Sales & Margins",
			value: "sales",
		},
		{
			label: "Purchases",
			value: "purchases",
		},
		{
			label: "Product History",
			value: "products",
		},
		{
			label: "Transactions",
			value: "transactions",
		},
		{
			label: "Inventory",
			value: "inventory",
		},
	]);
	const [reportType, setReportType] = useState<OptionProp | null>(null);
	const [showns, setShowns] = useState<string[]>([]);
	const [customerTypes] = useState([
		{ label: "Walk-In", value: "walkin" },
		{ label: "Subdealer", value: "subdealer" },
	]);
	const [customerType, setCustomerType] = useState<OptionProp | null>(null);
	const [startDate, setStartDate] = useState(
		new Date(new Date().getFullYear(), new Date().getMonth(), 1)
	);
	const [endDate, setEndDate] = useState(
		new Date(new Date().setDate(new Date().getDate() + 1))
	);
	const [dateType, setDateType] = useState({
		label: "This Month",
		value: "month",
	});
	const [customers, setCustomers] = useState<any>([]);
	const [customerId, setCustomerId] = useState<OptionProp | null>(null);
	const [shopId, setShopId] = useState<OptionProp | null>(null);
	const [staffId, setStaffId] = useState<OptionProp | null>(null);
	const [productId, setProductId] = useState<OptionProp | null>(null);
	const [productList, setProductList] = useState<OptionProp[]>([]);
	const [brandId, setBrandId] = useState<OptionProp | null>(null);
	const [brands, setBrands] = useState<any>([]);
	const [load, setLoad] = useState(false);

	const listCustomers = async (isWalkin: boolean) => {
		try {
			let res;
			if (isWalkin) {
				res = await customerService.getSubdealers("?all=true");
			} else {
				res = await customerService.getWalkIns("?all=true");
			}
			let arr = res?.map((a: any) => {
				return { label: a.fullName, value: a.id };
			});
			setCustomers(arr || []);
		} catch (err) {}
	};

	const getProducts = async () => {
		try {
			let res = await productService.allProducts("?all=true");
			let arr = res?.rows.map((a: any) => {
				return { ...a, label: a.summary, value: a.id };
			});
			setProductList(arr || []);
		} catch (err) {}
	};

	const listBrands = async () => {
		try {
			let brandRes = await productService.filterBrands("?business=true");

			let arrBrand = brandRes?.map((r: any) => {
				return { label: r.name, value: r.id };
			});
			setBrands(arrBrand);
		} catch (err) {}
	};

	const changeCustomerType = (val: any) => {
		setCustomerType(val);
		if (val.value === "walkin") {
			listCustomers(false);
		} else {
			listCustomers(true);
		}
	};

	const changeReportType = (val: any) => {
		setReportType(val);
		if (val?.value === "users" || val?.value === "shops") {
			setShowns(["submit"]);
		} else if (
			["transactions", "expenses", "sales", "purchases"].includes(
				val?.value
			)
		) {
			setShowns(["shops", "user", "date", "submit"]);
		} else if (val?.value === "customers") {
			setShowns(["customertype", "date", "submit"]);
		} else if (val?.value === "customers-transactions") {
			setShowns(["customertype", "customer", "date", "submit"]);
		} else if (val?.value === "products") {
			getProducts();
			setShowns(["product", "shops", "date", "submit"]);
		} else if (val?.value === "inventory") {
			listBrands();
			setShowns(["shops", "brand", "submit"]);
		} else {
			setShowns([]);
		}
	};

	const submitHandler = (e: any) => {
		e.preventDefault();

		handleExport(reportType?.value);
	};

	const handleExport = async (val: any) => {
		try {
			let res;
			setLoad(true);
			if (val === "users") {
				res = await basicService.allStaffs("?all=true&download=true");
			} else if (val === "shops") {
				res = await basicService.allShops("?all=true&download=true");
			} else if (val === "customers") {
				if (customerType?.value === "walkin") {
					res = await customerService.getWalkIns(
						`?startDate=${startDate}&endDate=${endDate}&download=true`
					);
				} else {
					res = await customerService.getSubdealers(
						`?startDate=${startDate}&endDate=${endDate}&download=true`
					);
				}
			} else if (val === "customers-transactions") {
				res = await salesService.getTransactions(
					`?startDate=${startDate}&endDate=${endDate}&type=customer&customerId=${
						customerId?.value || ""
					}&download=true`
				);
			} else if (val === "expenses") {
				res = await expenseService.getExpenses(
					`?startDate=${startDate}&endDate=${endDate}&shopId=${
						shopId?.value || ""
					}&staffId=${staffId?.value || ""}&download=true`
				);
			} else if (val === "sales") {
				res = await salesService.getSales(
					`?startDate=${startDate}&endDate=${endDate}&shopId=${
						shopId?.value || ""
					}&staffId=${staffId?.value || ""}&download=true`
				);
			} else if (val === "purchases") {
				res = await purchaseService.getPurchase(
					`?startDate=${startDate}&endDate=${endDate}&shopId=${
						shopId?.value || ""
					}&staffId=${staffId?.value || ""}&download=true`
				);
			} else if (val === "inventory") {
				res = await productService.stockReports(
					`?brandId=${brandId?.value || ""}&shopId=${
						shopId?.value || ""
					}&download=true`
				);
			} else if (val === "products") {
				res = await productService.getLogReports(
					`?startDate=${startDate}&endDate=${endDate}&shopId=${
						shopId?.value || ""
					}&productId=${productId?.value || ""}&download=true`
				);
			} else if (val === "transactions") {
				res = await salesService.getTransactions(
					`?startDate=${startDate}&endDate=${endDate}&shopId=${
						shopId?.value || ""
					}&staffId=${staffId?.value || ""}&download=true`
				);
			}
			setLoad(false);
			displaySuccess("Report Downloaded");
			const blob = new Blob([res], { type: "text/csv" });
			const url = window.URL.createObjectURL(blob);
			const link: any = document.createElement("a");
			link.href = url;
			link.setAttribute("download", `${val}.csv`);
			document.body.appendChild(link);

			link.click();

			link.parentNode.removeChild(link);
		} catch (err) {
			setLoad(false);
			displayError(err, true);
		}
	};

	return (
		<div>
			<TitleCover title="Export Reports" />
			<div className="row mt-4">
				<div className="col-lg-6">
					<FormBody>
						<Form onSubmit={submitHandler}>
							<div className="mb-4">
								<label>Report Type</label>
								<DropDownSelect
									options={reports}
									value={reportType}
									changeSelected={changeReportType}
								/>
							</div>
							{showns.find((s) => s === "product") && (
								<div className="mb-4">
									<label>Product</label>
									<DropDownSelect
										options={productList}
										value={productId}
										changeSelected={setProductId}
									/>
								</div>
							)}
							{showns.find((s) => s === "customertype") && (
								<div className="mb-4">
									<label>Customer Type</label>
									<DropDownSelect
										options={customerTypes}
										value={customerType}
										changeSelected={changeCustomerType}
									/>
								</div>
							)}
							{showns.find((s) => s === "customer") && (
								<div className="mb-4">
									<label>Customer Name</label>
									<DropDownSelect
										options={customers}
										value={customerId}
										changeSelected={setCustomerId}
									/>
								</div>
							)}
							{showns.find((s) => s === "shops") && (
								<div className="mb-4">
									<label>Shop</label>
									<DropDownSelect
										options={shops}
										value={shopId}
										changeSelected={setShopId}
									/>
								</div>
							)}
							{showns.find((s) => s === "user") && (
								<div className="mb-4">
									<label>User</label>
									<DropDownSelect
										options={staffs}
										value={staffId}
										changeSelected={setStaffId}
									/>
								</div>
							)}
							{showns.find((s) => s === "brand") && (
								<div className="mb-4">
									<label>Brand</label>
									<DropDownSelect
										options={brands}
										value={brandId}
										changeSelected={setBrandId}
									/>
								</div>
							)}
							{showns.find((s) => s === "date") && (
								<div>
									<DateFilter
										startDate={startDate}
										setStartDate={setStartDate}
										endDate={endDate}
										setEndDate={setEndDate}
										dateType={dateType}
										setDateType={setDateType}
										singleLine={true}
									/>
								</div>
							)}
							{showns.find((s) => s === "submit") && (
								<div className="text-center mt-4">
									{load ? (
										<Loading />
									) : (
										<MainButton type="submit">
											<FaFileCsv />
											<span>Export</span>
										</MainButton>
									)}
								</div>
							)}
						</Form>
					</FormBody>
				</div>
			</div>
		</div>
	);
};

export default Exports;
