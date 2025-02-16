import { useEffect, useState } from "react";
import TitleCover from "../../../components/TitleCover";
import smsService from "../../../redux/features/sms/smsService";
import { DashboardCard } from "../../../styles/home.styles";
import { useAppSelector } from "../../../redux/hooks";
import { formatCurrency } from "../../../utils/currency";
import ModalComponent from "../../../components/ModalComponent";
import SpandCpEdit from "../../../components/SMS/SpandCpEdit";
import PieChartSms from "../../../components/SMS/PieChartSms";
import PermissionDenied from "../../../components/PermissionDenied";

const SMS = () => {
	const { details } = useAppSelector((state) => state.auth);

	const [settings, setSettings] = useState<any>({});
	const [openModal, setOpenModal] = useState(false);
	const [editSp, setEditSp] = useState(true);
	const [startDate, setStartDate] = useState(
		new Date(new Date().getFullYear(), new Date().getMonth(), 1)
	);
	const [endDate, setEndDate] = useState(
		new Date(new Date().setDate(new Date().getDate() + 1))
	);
	const [report, setReport] = useState<any>([]);

	useEffect(() => {
		getSettings();
		getSmsGraph();
	}, []);

	const getSettings = async () => {
		try {
			let res = await smsService.loadCentralWallet(details.id);
			setSettings(res);
		} catch (err) {}
	};

	const getSmsGraph = async () => {
		try {
			let res = await smsService.smsGraph(
				details.id,
				startDate.toISOString(),
				endDate.toISOString()
			);
			setReport(res);
		} catch (err) {}
	};

	return details?.role?.permissions?.find(
		(f) => f.method === "bluepiloSmsSummary"
	) ? (
		<div>
			<TitleCover title={"Bluepilo SMS"} />
			<div className="row mt-4">
				<div className="col-lg-3 mb-4">
					<DashboardCard>
						<div className="head">
							<h6>Central Wallet Balance</h6>
						</div>
						<div className="body">
							<div className="content">
								<h6>Total</h6>
								<h4>
									{settings?.balance
										? `₦${formatCurrency(settings.balance)}`
										: "--"}
								</h4>
							</div>
						</div>
					</DashboardCard>
				</div>

				<div className="col-lg-3 mb-4">
					<DashboardCard>
						<div className="head">
							<h6>SMS Cost Price</h6>
						</div>
						<div className="body">
							<div className="content">
								<h6>Total</h6>
								<h4>
									{settings?.cpPerPage
										? `₦${formatCurrency(
												settings.cpPerPage
										  )}`
										: "--"}
								</h4>
							</div>
							<div className="e-btn">
								<button
									onClick={() => {
										setEditSp(false);
										setOpenModal(true);
									}}
								>
									Edit
								</button>
							</div>
						</div>
					</DashboardCard>
				</div>
				<div className="col-lg-3 mb-4">
					<DashboardCard>
						<div className="head">
							<h6>SMS Selling Price</h6>
						</div>
						<div className="body">
							<div className="content">
								<h6>Total</h6>
								<h4>
									{settings?.spPerPage
										? `₦${formatCurrency(
												settings.spPerPage
										  )}`
										: "--"}
								</h4>
							</div>
							<div className="e-btn">
								<button
									onClick={() => {
										setEditSp(true);
										setOpenModal(true);
									}}
								>
									Edit
								</button>
							</div>
						</div>
					</DashboardCard>
				</div>
				<div className="col-lg-6 mb-4">
					<PieChartSms report={report} />
				</div>
			</div>
			<ModalComponent
				title={editSp ? "Edit Selling Price" : "Edit Cost Price"}
				open={openModal}
				close={() => setOpenModal(false)}
			>
				<SpandCpEdit
					editSp={editSp}
					onSubmit={() => {
						getSettings();
						setOpenModal(false);
					}}
					val={editSp ? settings?.spPerPage : settings?.cpPerPage}
				/>
			</ModalComponent>
		</div>
	) : (
		<PermissionDenied />
	);
};

export default SMS;
