import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/auth/Login";
import AuthLayout from "../layouts/AuthLayout";
import Signup from "../pages/auth/Signup";
import ForgotPassword from "../pages/auth/ForgotPassword";
import Admin from "../layouts/Admin";
import User from "../layouts/User";

const Routing = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<AuthLayout />}>
					<Route path="" element={<Login />} />
					<Route path="sign-up" element={<Signup />} />
					<Route
						path="forgot-password"
						element={<ForgotPassword />}
					/>
				</Route>
				<Route path="/admin" element={<Admin />}></Route>
				<Route path="/dashboard" element={<User />}></Route>
			</Routes>
		</BrowserRouter>
	);
};

export default Routing;
