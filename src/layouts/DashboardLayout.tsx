import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import { AppContent, MainPage } from "../styles/dashboard.styles";
import Header from "../components/Header";
import { Container } from "react-bootstrap";
import OutsideClick from "../components/OutsideClick";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
	allShops,
	allStaffs,
	getDashboardStats,
	getExpenseCategories,
	getManagedBrands,
	getNotifications,
	getSettings,
	getStates,
	paymentMethods,
} from "../redux/features/basic/basic-slice";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
	const dispatch = useAppDispatch();

	const { details } = useAppSelector((state) => state.auth);

	const [open, setOpen] = useState(false);
	const [minimized, setMinimized] = useState(false);

	useEffect(() => {
		runActions();
	}, []);

	const runActions = () => {
		if (details.businessId) {
			dispatch(getNotifications());
			dispatch(allShops());
			dispatch(allStaffs());
			dispatch(getSettings());
			dispatch(paymentMethods());
			dispatch(getExpenseCategories());
			dispatch(getManagedBrands());
		}
		dispatch(getStates());
	};

	return (
		<div>
			<OutsideClick handleToggle={() => setOpen(false)}>
				<Sidebar
					open={open}
					minimizeHandler={(val: boolean) => setMinimized(val)}
					onClose={() => setOpen(false)}
					minimized={minimized}
				/>
			</OutsideClick>
			<MainPage minimize={`${minimized}`}>
				<Container>
					<AppContent>
						<Header openMenu={() => setOpen(!open)} />
						<div className="main-content">
							<Outlet />
						</div>
					</AppContent>
				</Container>
			</MainPage>
		</div>
	);
};

export default DashboardLayout;
