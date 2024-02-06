import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/auth/Login";
import AuthLayout from "../layouts/AuthLayout";

const Routing = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<AuthLayout />}>
					<Route path="" element={<Login />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default Routing;
