import { useEffect, useState } from "react";
import TitleCover from "../../../components/TitleCover";
import smsService from "../../../redux/features/sms/smsService";
import { useAppSelector } from "../../../redux/hooks";
import { SummaryCard } from "../../../styles/dashboard.styles";
import { formatCurrency } from "../../../utils/currency";
import ModalComponent from "../../../components/ModalComponent";
import TopSMSWallet from "../../../components/SMS/TopSMSWallet";
import { Table, TableComponent } from "../../../styles/table.styles";
import { displayError } from "../../../utils/errors";
import SkeletonTable from "../../../components/Loaders/SkeletonTable";
import { DetailCard } from "../../../styles/sale.styles";
import { MainButton } from "../../../styles/links.styles";
import { BasicSearch } from "../../../components/Filters/BasicInputs";

const SmsWallets = () => {
	const { token, details } = useAppSelector((state) => state.auth);

	const [load, setLoad] = useState(false);
	const [centralWallet, setCentralWallet] = useState<any>({});
	const [openModal, setOpenModal] = useState(false);
	const [modalType, setModalType] = useState("");
	const [walletList, setWalletList] = useState<any>({});
	const [user, setUser] = useState<any>({});
	const [search, setSearch] = useState("");

	useEffect(() => {
		loadCentralWallet();
	}, []);

	useEffect(() => {
		if (search) {
			searchOrgz();
		} else {
			loadAllWallets();
		}
	}, [search]);

	const loadCentralWallet = async () => {
		try {
			let res = await smsService.loadCentralWallet(token, details.id);
			setCentralWallet(res || { balance: 0, createdBy: "admin" });
		} catch (err) {}
	};

	const loadAllWallets = async () => {
		try {
			setLoad(true);
			let res = await smsService.allWallets(token, details.id);
			setLoad(false);
			setWalletList(res);
		} catch (err) {
			setLoad(false);
			displayError(err, true);
		}
	};

	const searchOrgz = () => {
		let arr = walletList?.wallets.filter(
			(n: any) =>
				n.orgName.toLowerCase().indexOf(search.toLowerCase()) !== -1
		);
		setWalletList({ ...walletList, wallets: arr });
	};

	return (
		<div>
			<TitleCover title={"All SMS Wallets"} />
			<div className="mt-4">
				<div className="row">
					<div className="col-lg-6 mb-3">
						<SummaryCard>
							<div>
								<h6>Central Wallet Bal: </h6>
								<h6
									style={{
										color:
											centralWallet?.balance < 0
												? "red"
												: "",
									}}
								>
									{centralWallet?.createdBy
										? `₦${formatCurrency(
												centralWallet.balance
										  )}`
										: "---"}
								</h6>
							</div>
							<button
								onClick={() => {
									setModalType("central");
									setOpenModal(true);
								}}
							>
								Top Up
							</button>
						</SummaryCard>
					</div>
				</div>
				<div className="mt-4 row">
					<div className="col-lg-7">
						<div className="mb-3">
							<BasicSearch
								searchVal={search}
								changeSearchVal={setSearch}
								wide="true"
								placeholder="Search Organization"
							/>
						</div>
						<TableComponent>
							<div className="table-responsive">
								<Table className="table">
									<thead>
										<tr>
											<th>Organization</th>
											<th className="price">Balance</th>
											<th></th>
										</tr>
									</thead>
									{!load && (
										<tbody>
											{walletList?.wallets?.map(
												(wallet: any) => (
													<tr key={wallet.id}>
														<td>
															{wallet.orgName}
														</td>
														<td className="price">
															₦
															{formatCurrency(
																wallet.balance
															)}
														</td>
														<td className="link">
															<a
																href="#"
																onClick={(
																	e
																) => {
																	e.preventDefault();
																	setModalType(
																		"user"
																	);
																	setUser(
																		wallet
																	);
																	setOpenModal(
																		true
																	);
																}}
															>
																Top Up
															</a>
														</td>
													</tr>
												)
											)}
										</tbody>
									)}
								</Table>
							</div>
							{load && <SkeletonTable />}
						</TableComponent>
					</div>
					<div className="col-lg-5">
						<DetailCard>
							<h6>Total Wallet Balances</h6>
							<h5 style={{ fontWeight: "600" }}>
								₦{formatCurrency(walletList?.totalBal)}
							</h5>
							<div className="mt-4">
								<MainButton
									onClick={() => {
										setModalType("all");
										setOpenModal(true);
									}}
								>
									<span>Top All Wallets</span>
								</MainButton>
							</div>
						</DetailCard>
					</div>
				</div>
			</div>
			<ModalComponent
				open={openModal}
				close={() => setOpenModal(false)}
				title={
					modalType === "central"
						? "Top Central Wallet"
						: modalType === "user"
						? `Top up ${user.name}'s Wallet`
						: modalType === "all"
						? "Top All Organization wallets"
						: ""
				}
			>
				<TopSMSWallet
					onSubmit={() => {
						loadCentralWallet();
						loadAllWallets();
						setOpenModal(false);
					}}
					type={modalType}
					user={user}
				/>
			</ModalComponent>
		</div>
	);
};

export default SmsWallets;
