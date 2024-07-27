import { useEffect, useState } from "react";
import TitleCover from "../../../components/TitleCover";
import SkeletonDetails from "../../../components/Loaders/SkeletonDetails";
import salesService from "../../../redux/features/sales/sales-service";
import { useAppSelector } from "../../../redux/hooks";
import { useNavigate, useParams } from "react-router-dom";
import { displayError } from "../../../utils/errors";
import { ActionDetailsDiv, DetailCard } from "../../../styles/sale.styles";
import PrintLogo from "../../../assets/icons/print.svg";
import ClipLogo from "../../../assets/icons/clipboard.svg";
import AddMoneyLogo from "../../../assets/icons/money-add.svg";
import DetailsInfo from "../../../components/Sales/Details/DetailsInfo";
import ItemsPicked from "../../../components/Sales/Details/ItemsPicked";
import { MainButton, WideButton } from "../../../styles/links.styles";
import { MdCancel } from "react-icons/md";
import { IoCopy } from "react-icons/io5";
import History from "../../../components/Sales/Details/History";
import ModalComponent from "../../../components/ModalComponent";
import WithdrawSale from "../../../components/Sales/Details/WithdrawSale";
import dateFormat from "dateformat";
import { Flex } from "../../../styles/basic.styles";
import CommentBox from "../../../components/Sales/CommentBox";
import { haveRole } from "../../../utils/role";

const SaleDetails = () => {
	const navigate = useNavigate();

	const { token, details } = useAppSelector((state) => state.auth);
	const params = useParams();

	const [load, setLoad] = useState(false);
	const [saleDetails, setSaleDetails] = useState<any>({});
	const [openWithdrawal, setOpenWithdrawal] = useState(false);
	const [action, setAction] = useState("");

	useEffect(() => {
		window.scrollTo(0, 0);
		if (params.id) {
			loadSale();
		}
	}, [params]);

	const loadSale = async () => {
		try {
			setLoad(true);
			let res = await salesService.getSaleInfo(token, params.id);
			setLoad(false);
			if (res && res.id) {
				setSaleDetails(res);
			}
		} catch (err) {
			setLoad(false);
			displayError(err, true);
		}
	};

	const awaitingHandler = async (comment: string) => {
		try {
			setLoad(true);
			let res = await salesService.approveOrDeclineWithdrawal(
				token,
				{ action, comment },
				saleDetails.uniqueRef
			);
			setLoad(false);
			if (res) {
				loadSale();
			}
		} catch (err) {
			setLoad(false);
			displayError(err, true);
		}
	};

	return (
		<div>
			<TitleCover
				title={`Sales ${
					saleDetails?.status === "withdrawn"
						? "Withdrawn!"
						: "Completed!"
				}`}
			/>
			<div className="mt-3">
				{load ? (
					<SkeletonDetails />
				) : (
					saleDetails?.id && (
						<ActionDetailsDiv>
							<div className="row">
								<div className="col-lg-6 mb-4">
									<DetailsInfo saleDetails={saleDetails} />
								</div>
								<div className="col-lg-6 mb-3">
									{saleDetails.status ===
										"awaiting withdrawal" &&
										haveRole(details.businessRoleId)
											.isBusinessAdmin && (
											<DetailCard
												style={{
													background:
														"rgba(255, 39, 37, 0.10)",
												}}
											>
												<p>
													This sale is awaiting
													withdrawal.
												</p>
												<Flex>
													<MainButton
														onClick={() => {
															setOpenWithdrawal(
																true
															);
															setAction(
																"approve"
															);
														}}
													>
														Approve
													</MainButton>
													<MainButton
														style={{
															marginLeft: "15px",
														}}
														bg="#F44336"
														onClick={() => {
															setOpenWithdrawal(
																true
															);
															setAction(
																"decline"
															);
														}}
													>
														Decline
													</MainButton>
												</Flex>
											</DetailCard>
										)}
									{saleDetails.status === "withdrawn" && (
										<DetailCard
											style={{
												background:
													"rgba(255, 39, 37, 0.10)",
											}}
										>
											<div className="body-detail">
												<p>
													<b
														style={{
															color: "#F44336",
														}}
													>
														Withdrawn
													</b>{" "}
													by{" "}
													{saleDetails.withdrawnBy?.fullName?.substring(
														0,
														15
													)}{" "}
													on{" "}
													{dateFormat(
														saleDetails.updatedAt,
														"mmm dd, yyyy h:MM TT"
													)}
												</p>
												<p
													style={{
														margin: 0,
														padding: 0,
													}}
												>
													Reason for Withdrawal:
												</p>
												<h6>{saleDetails.comment}</h6>
											</div>
										</DetailCard>
									)}
									<ItemsPicked saleDetails={saleDetails} />
									<div className="buttons mb-5">
										<div className="mb-3">
											<WideButton
												onClick={() =>
													navigate("reciept", {
														state: saleDetails,
													})
												}
											>
												<span>
													Generate Sale Receipt
												</span>
												<img src={PrintLogo} />
											</WideButton>
										</div>
										<div className="mb-4">
											<WideButton
												bg="#EDEEF0"
												color="#505BDA"
												onClick={() =>
													navigate(
														"/dashboard/sales/new",
														{
															state: {
																cloneState:
																	saleDetails,
															},
														}
													)
												}
											>
												<span>Clone Sale List</span>
												<IoCopy color="#505BDA" />
											</WideButton>
										</div>
										{saleDetails.status == "success" && (
											<div className="mt-5">
												<WideButton
													bg="#FF2725"
													onClick={() =>
														setOpenWithdrawal(true)
													}
												>
													<span>Withdraw Sale</span>
													<MdCancel color="#FFF" />
												</WideButton>
											</div>
										)}
										<div className="row mt-4">
											<div className="col-lg-6 mb-3">
												<WideButton
													bg="#FFB900"
													color="#000D33"
													onClick={() =>
														navigate(
															"/dashboard/sales/new"
														)
													}
												>
													<span>Record New Sale</span>
													<img src={AddMoneyLogo} />
												</WideButton>
											</div>
											<div className="col-lg-6 mb-3">
												<WideButton
													bg="#EDEEF0"
													color="#505BDA"
													onClick={() =>
														navigate(
															"/dashboard/sales"
														)
													}
												>
													<span>Recent Sales</span>
													<img src={ClipLogo} />
												</WideButton>
											</div>
										</div>
									</div>
									<History saleDetails={saleDetails} />
								</div>
							</div>
						</ActionDetailsDiv>
					)
				)}
			</div>
			<ModalComponent
				open={openWithdrawal}
				close={() => setOpenWithdrawal(false)}
				title="Withdraw Sale"
			>
				{action ? (
					<CommentBox
						submit={(comment) => {
							setOpenWithdrawal(false);
							awaitingHandler(comment);
						}}
						btnName={action.toUpperCase()}
						bg={action === "decline" ? "#FF2725" : "#0241FF"}
					/>
				) : (
					<WithdrawSale
						id={saleDetails?.uniqueRef}
						submit={() => {
							setOpenWithdrawal(false);
							loadSale();
						}}
					/>
				)}
			</ModalComponent>
		</div>
	);
};

export default SaleDetails;
