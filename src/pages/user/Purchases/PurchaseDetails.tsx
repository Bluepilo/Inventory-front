import { useEffect, useState } from "react";
import TitleCover from "../../../components/TitleCover";
import SkeletonDetails from "../../../components/Loaders/SkeletonDetails";
import { ActionDetailsDiv, DetailCard } from "../../../styles/sale.styles";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../../redux/hooks";
import purchaseService from "../../../redux/features/purchase/purchase-service";
import { displayError } from "../../../utils/errors";
import PurchaseInfo from "../../../components/Purchase/Details/PurchaseInfo";
import { haveRole } from "../../../utils/role";
import { Flex } from "../../../styles/basic.styles";
import { MainButton, WideButton } from "../../../styles/links.styles";
import dateFormat from "dateformat";
import ItemsPicked from "../../../components/Purchase/Details/ItemsPicked";
import { toast } from "react-toastify";
import PrintLogo from "../../../assets/icons/print.svg";
import AddMoneyLogo from "../../../assets/icons/money-add.svg";
import ClipLogo from "../../../assets/icons/clipboard.svg";
import { IoCopy } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import ModalComponent from "../../../components/ModalComponent";
import CommentBox from "../../../components/Sales/CommentBox";
import WithdrawPurchase from "../../../components/Purchase/Details/WithdrawPurchase";

const PurchaseDetails = () => {
	const navigate = useNavigate();

	const { token, details } = useAppSelector((state) => state.auth);
	const params = useParams();

	const [load, setLoad] = useState(false);
	const [purchaseDetails, setPurchaseDetails] = useState<any>({});
	const [openWithdrawal, setOpenWithdrawal] = useState(false);
	const [action, setAction] = useState("");

	useEffect(() => {
		window.scrollTo(0, 0);
		if (params.id) {
			loadPurchase();
		}
	}, [params]);

	const loadPurchase = async () => {
		try {
			setLoad(true);
			let res = await purchaseService.getPurchaseInfo(token, params.id);
			setLoad(false);
			if (res && res.id) {
				setPurchaseDetails(res);
			}
		} catch (err) {
			setLoad(false);
			displayError(err, true);
		}
	};

	const supplyItems = async (arr: any) => {
		if (
			window.confirm(
				"Are you confirming that the quantities set have been supplied?"
			)
		) {
			try {
				setLoad(true);
				await purchaseService.updateSupply(token, purchaseDetails.id, {
					products: arr,
				});
				setLoad(false);
				toast.success("Products has been supplied!");
				loadPurchase();
			} catch (err) {
				displayError(err, true);
			}
		}
	};

	const awaitingHandler = async (comment: string) => {
		try {
			setLoad(true);
			let res = await purchaseService.approveOrDeclineWithdrawal(
				token,
				{ action, comment },
				purchaseDetails.id
			);
			setLoad(false);
			if (res) {
				loadPurchase();
			}
		} catch (err) {
			setLoad(false);
			displayError(err, true);
		}
	};

	return (
		<div>
			<TitleCover
				title={`${
					purchaseDetails?.isOnboarding ? "Import" : "Purchase"
				} ${
					purchaseDetails?.status === "withdrawn"
						? "Withdrawn!"
						: "Completed!"
				}`}
			/>
			<div className="mt-3">
				{load ? (
					<SkeletonDetails />
				) : (
					purchaseDetails?.id && (
						<ActionDetailsDiv>
							<div className="row">
								<div className="col-lg-5 mb-4">
									<PurchaseInfo
										purchaseDetails={purchaseDetails}
									/>
								</div>
								<div className="col-lg-7 mb-3">
									{purchaseDetails.status ===
										"awaiting withdrawal" &&
										haveRole(details.roleId)
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
									{purchaseDetails.status === "withdrawn" && (
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
													{purchaseDetails.user?.fullName?.substring(
														0,
														15
													)}{" "}
													on{" "}
													{dateFormat(
														purchaseDetails.updatedAt,
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
												<h6>
													{purchaseDetails.comment}
												</h6>
											</div>
										</DetailCard>
									)}
									<ItemsPicked
										purchaseDetails={purchaseDetails}
										supplyItems={supplyItems}
									/>
									<div className="buttons mb-5">
										<div className="row">
											<div className="col-lg-4 mb-3">
												<WideButton>
													<span>
														Generate Invoice
													</span>
													<img src={PrintLogo} />
												</WideButton>
											</div>
											<div className="col-lg-4 mb-3">
												<WideButton
													bg="#EDEEF0"
													color="#505BDA"
													onClick={() =>
														navigate(
															"/dashboard/purchases/new",
															{
																state: {
																	cloneState:
																		purchaseDetails,
																},
															}
														)
													}
												>
													<span>
														Clone Purchase List
													</span>
													<IoCopy color="#505BDA" />
												</WideButton>
											</div>
											<div className="col-lg-4 mb-3">
												{purchaseDetails.status ==
													"success" && (
													<WideButton
														bg="#FF2725"
														onClick={() =>
															setOpenWithdrawal(
																true
															)
														}
													>
														<span>
															Withdraw Purchase
														</span>
														<MdCancel color="#FFF" />
													</WideButton>
												)}
											</div>
										</div>

										<div className="row mt-4">
											<div className="col-lg-6 mb-3">
												<WideButton
													bg="#FFB900"
													color="#000D33"
													onClick={() =>
														navigate(
															"/dashboard/purchases/new"
														)
													}
												>
													<span>
														Record New Purchase
													</span>
													<img src={AddMoneyLogo} />
												</WideButton>
											</div>
											<div className="col-lg-6 mb-3">
												<WideButton
													bg="#EDEEF0"
													color="#505BDA"
													onClick={() =>
														navigate(
															"/dashboard/purchases"
														)
													}
												>
													<span>
														Recent Purchases
													</span>
													<img src={ClipLogo} />
												</WideButton>
											</div>
										</div>
									</div>
								</div>
							</div>
						</ActionDetailsDiv>
					)
				)}
			</div>
			<ModalComponent
				open={openWithdrawal}
				close={() => setOpenWithdrawal(false)}
				title="Withdraw Purchase"
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
					<WithdrawPurchase
						id={purchaseDetails?.id}
						submit={() => {
							setOpenWithdrawal(false);
							loadPurchase();
						}}
					/>
				)}
			</ModalComponent>
		</div>
	);
};

export default PurchaseDetails;
