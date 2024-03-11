import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/auth/Login";
import AuthLayout from "../layouts/AuthLayout";
import Signup from "../pages/auth/Signup";
import ForgotPassword from "../pages/auth/ForgotPassword";
import Admin from "../layouts/Admin";
import User from "../layouts/User";
import Error404 from "../pages/Error404";

// Admin Routes
import AdminDashboard from "../pages/admin/Dashboard";

// User Routes
import Dashboard from "../pages/user/Dashboard";
import Onboarding from "../pages/user/Dashboard/Onboarding";
import Sales from "../pages/user/Sales";
import NewSale from "../pages/user/Sales/NewSale";
import SaleDetails from "../pages/user/Sales/SaleDetails";
import WalkIn from "../pages/user/Customers/WalkIn";
import Subdealer from "../pages/user/Customers/Subdealer";
import WalkinDetails from "../pages/user/Customers/WalkIn/WalkinDetails";
import SubdealerDetails from "../pages/user/Customers/Subdealer/SubdealerDetails";
import Supplier from "../pages/user/Supplier";
import SupplierDetails from "../pages/user/Supplier/SupplierDetails";
import Purchases from "../pages/user/Purchases";
import PurchaseDetails from "../pages/user/Purchases/PurchaseDetails";
import NewPurchase from "../pages/user/Purchases/NewPurchase";
import Transactions from "../pages/user/Transactions";
import Transfer from "../pages/user/Transfer";
import NewTransfer from "../pages/user/Transfer/NewTransfer";
import TransferDetails from "../pages/user/Transfer/TransferDetails";
import Expenses from "../pages/user/Expenses";
import Catalogue from "../pages/user/Catalogue";
import Product from "../pages/user/Catalogue/Product";
import NewProduct from "../pages/user/Catalogue/NewProduct";
import UploadProduct from "../pages/user/Catalogue/UploadProduct";
import Services from "../pages/user/Services";
import VerifyOtp from "../pages/auth/VerifyOtp";
import NewBusiness from "../pages/auth/NewBusiness";
import Stocks from "../pages/user/Reports/Stocks";
import ProductHistory from "../pages/user/Reports/Stocks/ProductHistory";
import Returns from "../pages/user/Reports/Returns";
import ReturnDetails from "../pages/user/Reports/Returns/ReturnDetails";
import NewReturns from "../pages/user/Reports/Returns/NewReturns";
import Adjustments from "../pages/user/Reports/Adjustments";
import NewAdjustments from "../pages/user/Reports/Adjustments/NewAdjustments";

const Routing = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="*" element={<Error404 />} />
				<Route path="/" element={<AuthLayout />}>
					<Route path="" element={<Login />} />
					<Route path="sign-up" element={<Signup />} />
					<Route
						path="forgot-password"
						element={<ForgotPassword />}
					/>
					<Route path="verify-otp" element={<VerifyOtp />} />
					<Route path="add-business" element={<NewBusiness />} />
				</Route>
				<Route
					path="/dashboard"
					element={<Navigate replace to="/dashboard/home" />}
				/>
				<Route
					path="/admin"
					element={<Navigate replace to="/admin/home" />}
				/>
				<Route path="/admin" element={<Admin />}>
					<Route path="home" element={<AdminDashboard />} />
				</Route>
				<Route path="/dashboard" element={<User />}>
					<Route path="home" element={<Dashboard />} />
					<Route path="home/onboarding" element={<Onboarding />} />
					<Route path="sales" element={<Sales />} />
					<Route path="sales/new" element={<NewSale />} />
					<Route path="sales/:id" element={<SaleDetails />} />
					<Route
						path="customers"
						element={
							<Navigate
								replace
								to="/dashboard/customers/walk-in"
							/>
						}
					/>
					<Route path="customers/walk-in" element={<WalkIn />} />
					<Route path="customers/subdealer" element={<Subdealer />} />
					<Route
						path="customers/walk-in/:id"
						element={<WalkinDetails />}
					/>
					<Route
						path="customers/subdealer/:id"
						element={<SubdealerDetails />}
					/>
					<Route path="suppliers" element={<Supplier />} />
					<Route path="suppliers/:id" element={<SupplierDetails />} />
					<Route path="purchases" element={<Purchases />} />
					<Route path="purchases/new" element={<NewPurchase />} />
					<Route path="purchases/:id" element={<PurchaseDetails />} />
					<Route path="transactions" element={<Transactions />} />
					<Route path="transfers" element={<Transfer />} />
					<Route path="transfers/new" element={<NewTransfer />} />
					<Route path="transfers/:id" element={<TransferDetails />} />
					<Route path="expenses" element={<Expenses />} />
					<Route path="catalogue" element={<Catalogue />} />
					<Route path="catalogue/:id" element={<Product />} />
					<Route path="catalogue/:id/new" element={<NewProduct />} />
					<Route
						path="catalogue/:id/upload"
						element={<UploadProduct />}
					/>
					<Route path="services" element={<Services />} />
					<Route path="reports/stocks" element={<Stocks />} />
					<Route
						path="reports/stocks/:id"
						element={<ProductHistory />}
					/>
					<Route path="reports/returns" element={<Returns />} />
					<Route
						path="reports/returns/new"
						element={<NewReturns />}
					/>
					<Route
						path="reports/returns/:id"
						element={<ReturnDetails />}
					/>
					<Route
						path="reports/adjustments"
						element={<Adjustments />}
					/>
					<Route
						path="reports/adjustments/new"
						element={<NewAdjustments />}
					/>
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default Routing;
