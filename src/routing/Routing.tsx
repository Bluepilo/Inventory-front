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
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default Routing;
