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
	getAllCountries,
	getExpenseCategories,
	getLogTypes,
	getManagedBrands,
	getNotifications,
	getSettings,
	getStates,
	paymentMethods,
} from "../redux/features/basic/basic-slice";
import { Outlet } from "react-router-dom";
import { userProfile } from "../redux/features/auth/auth-slice";
import ModalComponent from "../components/ModalComponent";
import SubAds from "../components/Subscription/SubAds";

const DashboardLayout = () => {
	const dispatch = useAppDispatch();

	const { details, showSubModal } = useAppSelector((state) => state.auth);

	const [open, setOpen] = useState(false);
	const [minimized, setMinimized] = useState(false);

	useEffect(() => {
		runActions();
	}, []);

	const runActions = () => {
		if (details.businessId) {
			dispatch(userProfile());
			dispatch(getNotifications(1));
			dispatch(allShops());
			dispatch(allStaffs());
			dispatch(getSettings());
			dispatch(paymentMethods());
			dispatch(getExpenseCategories());
			dispatch(getManagedBrands());
			dispatch(getLogTypes());
			dispatch(getAllCountries());
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
			<ModalComponent open={showSubModal} close={() => console.log("")}>
				<SubAds />
			</ModalComponent>
		</div>
	);
};

export default DashboardLayout;
