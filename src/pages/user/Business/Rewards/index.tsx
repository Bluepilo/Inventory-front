import React, { useEffect, useState } from "react";
import TitleCover from "../../../../components/TitleCover";
import { displayError, displaySuccess } from "../../../../utils/errors";
import rewardService from "../../../../redux/features/rewards/reward-service";
import { useAppSelector } from "../../../../redux/hooks";
import { SummaryCard } from "../../../../styles/dashboard.styles";
import { formatCurrency } from "../../../../utils/currency";
import { Table, TableComponent } from "../../../../styles/table.styles";
import dateFormat from "dateformat";
import SkeletonTable from "../../../../components/Loaders/SkeletonTable";
import Paginate from "../../../../components/Paginate";
import { OptionProp } from "../../../../components/Filters/BasicInputs";
import Filters from "../../../../components/Filters";
import ModalComponent from "../../../../components/ModalComponent";
import { Form } from "../../../../styles/form.styles";
import Loading from "../../../../components/Loaders/Loading";
import { ButtonSubmit } from "../../../../styles/links.styles";
import CurrencyInput from "react-currency-input-field";
import SuccessIcon from "../../../../assets/icons/success.svg";
import PendingIcon from "../../../../assets/icons/pending.svg";
import FailedIcon from "../../../../assets/icons/failed.svg";

const Rewards = () => {
	const { token } = useAppSelector((state) => state.auth);

	const [balance, setBalance] = useState("");
	const [list, setList] = useState<any>({});
	const [load, setLoad] = useState(false);
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(20);
	const [typeId, setTypeId] = useState<OptionProp | null>(null);
	const [openModal, setOpenModal] = useState(false);

	// Claim States
	const [accountNumber, setAccountNumber] = useState("");
	const [accountName, setAccountName] = useState("");
	const [amount, setAmount] = useState(0);
	const [bankName, setBankName] = useState("");

	const getRewards = async () => {
		try {
			let res = await rewardService.getWallet(token);
			setBalance(res?.balance);
		} catch (err) {
			displayError(err, true);
		}
	};

	let filters = `?page=${page}&limit=${limit}&type=${typeId?.value || ""}`;

	const getLogs = async () => {
		try {
			setLoad(true);
			let res = await rewardService.getLogs(token, filters);
			setLoad(false);
			setList(res);
		} catch (err) {
			setLoad(false);
			displayError(err, true);
		}
	};

	const clearFilters = () => {
		setTypeId(null);
	};

	useEffect(() => {
		window.scrollTo(0, 0);
		getLogs();
	}, [filters]);

	useEffect(() => {
		getRewards();
	}, []);

	const claimReward = async () => {
		if (amount > 100) {
			try {
				setLoad(true);
				await rewardService.claimReward(token, {
					amount,
					bankName,
					accountName,
					accountNumber,
				});
				setLoad(false);
				setOpenModal(false);
				displaySuccess("Claim has been sent.");
				getLogs();
			} catch (err) {
				setLoad(false);
				displayError(err, true);
			}
		} else {
			alert("Amount must be greater than 100");
		}
	};

	return (
		<div>
			<TitleCover title="My Rewards" />
			<div className="row align-items-center mt-4">
				<div className="col-lg-6 mb-3">
					<SummaryCard>
						<div>
							<h6>Balance:</h6>
							<h6>
								{balance
									? `₦ ${formatCurrency(balance)}`
									: "--"}
							</h6>
						</div>
						{balance && Number(balance) > 0 && (
							<button onClick={() => setOpenModal(true)}>
								Claim
							</button>
						)}
					</SummaryCard>
				</div>
			</div>
			<Filters
				others={typeId}
				othersLabel="Type"
				othersList={[
					{ label: "Earn", value: "earn" },
					{ label: "Claim", value: "claim" },
				]}
				changeOthers={setTypeId}
				clearValues={clearFilters}
			/>
			<div className="mt-4">
				<TableComponent>
					<div className="table-responsive">
						<Table className="table">
							<thead>
								<tr>
									<th>Date</th>
									<th>Organization</th>
									<th>Activity</th>
									<th className="price">Commission</th>
									<th>Status</th>
								</tr>
							</thead>

							{!load && (
								<tbody>
									{list?.rows?.map((l: any) => (
										<tr key={l.id}>
											<td>
												{dateFormat(
													l.createdAt,
													"mmm dd, yyyy"
												)}
											</td>
											<td>{l.organization?.name}</td>
											<td>{l.activity}</td>

											<td className="price bold">
												₦ {formatCurrency(l.amount)}
											</td>
											<td>
												<img
													src={
														l.status.toLowerCase() ===
														"success"
															? SuccessIcon
															: l.status.toLowerCase() ===
															  "pending"
															? PendingIcon
															: FailedIcon
													}
												/>
												<span
													style={{
														textTransform:
															"capitalize",
														marginLeft: "5px",
													}}
												>
													{l.status}
												</span>
											</td>
										</tr>
									))}
								</tbody>
							)}
						</Table>
					</div>
					{load && <SkeletonTable />}
				</TableComponent>
				{!load && list?.count ? (
					<Paginate
						changeLimit={(l) => setLimit(l)}
						limit={list.limit}
						count={list.count}
						pageNumber={page}
						onPrev={(n) => setPage(n)}
						onNext={(n) => setPage(n)}
					/>
				) : (
					<></>
				)}
			</div>
			<ModalComponent
				open={openModal}
				close={() => setOpenModal(false)}
				title="Claim Reward"
			>
				<Form
					onSubmit={(e) => {
						e.preventDefault();
						claimReward();
					}}
				>
					<label>Bank Name</label>
					<input
						type="text"
						value={bankName}
						onChange={(e) => setBankName(e.target.value)}
						required
						disabled={load}
						className="height"
					/>
					<label>Account Number</label>
					<input
						type="text"
						value={accountNumber}
						onChange={(e) => setAccountNumber(e.target.value)}
						required
						disabled={load}
						className="height"
					/>
					<label>Account Name</label>
					<input
						type="text"
						value={accountName}
						onChange={(e) => setAccountName(e.target.value)}
						required
						disabled={load}
						className="height"
					/>
					<label>Amount</label>
					<CurrencyInput
						id="input-example"
						name="input-name"
						decimalsLimit={2}
						prefix={`₦ `}
						value={amount}
						onValueChange={(values) => {
							setAmount(values ? Number(values) : 0);
						}}
						required
						className="height"
					/>
					{amount > Number(balance) && (
						<div className="error-check mb-3">
							Insufficient Wallet Balance
						</div>
					)}
					{load ? (
						<Loading />
					) : (
						<ButtonSubmit
							type="submit"
							disabled={amount > Number(balance) ? true : false}
							style={{
								background:
									amount > Number(balance)
										? "#CCC"
										: "#0241ff",
							}}
						>
							Claim
						</ButtonSubmit>
					)}
				</Form>
			</ModalComponent>
		</div>
	);
};

export default Rewards;
