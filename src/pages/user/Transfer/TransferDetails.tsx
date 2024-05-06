import { useEffect, useState } from "react";
import TitleCover from "../../../components/TitleCover";
import SkeletonDetails from "../../../components/Loaders/SkeletonDetails";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../../redux/hooks";
import transferService from "../../../redux/features/transfer/transfer-service";
import { displayError } from "../../../utils/errors";
import { ActionDetailsDiv, DetailCard } from "../../../styles/sale.styles";
import { haveRole } from "../../../utils/role";
import { Flex } from "../../../styles/basic.styles";
import { MainButton, WideButton } from "../../../styles/links.styles";
import ModalComponent from "../../../components/ModalComponent";
import CommentBox from "../../../components/Sales/CommentBox";
import { toast } from "react-toastify";
import TransferInfo from "../../../components/Transfers/TransferInfo";
import ItemsPicked from "../../../components/Transfers/ItemsPicked";
import { IoCartSharp, IoCopy } from "react-icons/io5";

const TransferDetails = () => {
	const navigate = useNavigate();

	const { token, details } = useAppSelector((state) => state.auth);
	const params = useParams();

	const [load, setLoad] = useState(false);
	const [transferDetails, setTransferDetails] = useState<any>({});
	const [openComment, setOpenComment] = useState(false);
	const [action, setAction] = useState("");

	useEffect(() => {
		window.scrollTo(0, 0);
		if (params.id) {
			loadTransfer();
		}
	}, [params]);

	const loadTransfer = async () => {
		try {
			setLoad(true);
			let res = await transferService.getTransferDetails(
				token,
				params.id || ""
			);
			setLoad(false);
			if (res && res.id) {
				setTransferDetails(res);
			}
		} catch (err) {
			setLoad(false);
			displayError(err, true);
		}
	};

	const approvalHandler = async (comment: string) => {
		try {
			setLoad(true);
			let res = await transferService.approveOrReject(
				token,
				transferDetails?.id,
				{
					action,
					comment,
				}
			);
			toast.success(
				`Transfer has been ${
					action === "accept" ? "accepted" : "declined"
				}`
			);
			setLoad(false);
			loadTransfer();
		} catch (err) {
			setLoad(false);
			displayError(err, true);
		}
	};

	return (
		<div>
			<TitleCover title={`Transfer Details`} />
			<div className="mt-3">
				{load ? (
					<SkeletonDetails />
				) : (
					transferDetails?.id && (
						<ActionDetailsDiv>
							<div className="row">
								<div className="col-lg-6 mb-3">
									<TransferInfo
										transferDetails={transferDetails}
									/>
								</div>
								<div className="col-lg-6">
									{transferDetails.status === "pending" &&
										haveRole(details.businessRoleId)
											.isBusinessActioners && (
											<DetailCard
												style={{
													background:
														"rgba(255, 39, 37, 0.10)",
												}}
											>
												<p>
													This transfer is awaiting
													approval.
												</p>
												<Flex>
													<MainButton
														onClick={() => {
															setOpenComment(
																true
															);
															setAction("accept");
														}}
													>
														Accept
													</MainButton>
													<MainButton
														style={{
															marginLeft: "15px",
														}}
														bg="#F44336"
														onClick={() => {
															setOpenComment(
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
									<ItemsPicked
										transferDetails={transferDetails}
									/>
									<div className="buttons mb-5">
										<div className="row">
											<div className="col-lg-6 mb-3">
												<WideButton
													bg="#EDEEF0"
													color="#505BDA"
													onClick={() =>
														navigate(
															"/dashboard/transfers/new",
															{
																state: {
																	cloneState:
																		transferDetails,
																},
															}
														)
													}
												>
													<span>
														Clone Transfer List
													</span>
													<IoCopy color="#505BDA" />
												</WideButton>
											</div>
											<div className="col-lg-6 mb-3">
												<WideButton
													bg="#FFB900"
													color="#000D33"
													onClick={() =>
														navigate(
															"/dashboard/transfers/new"
														)
													}
												>
													<span>
														Record New Transfer
													</span>
													<IoCartSharp />
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
				open={openComment}
				close={() => setOpenComment(false)}
				title={`${action} Transfer`}
			>
				<CommentBox
					submit={(comment) => {
						setOpenComment(false);
						approvalHandler(comment);
					}}
					btnName={action.toUpperCase()}
					bg={action === "decline" ? "#FF2725" : "#0241FF"}
				/>
			</ModalComponent>
		</div>
	);
};

export default TransferDetails;
