import React, { useEffect, useState } from "react";
import TitleCover from "../../../../components/TitleCover";
import { Link, useParams } from "react-router-dom";
import productService from "../../../../redux/features/product/product-service";
import { useAppSelector } from "../../../../redux/hooks";
import { displayError } from "../../../../utils/errors";
import SkeletonDetails from "../../../../components/Loaders/SkeletonDetails";
import { ActionDetailsDiv, DetailCard } from "../../../../styles/sale.styles";
import dateFormat from "dateformat";
import { RiShieldUserFill } from "react-icons/ri";
import { FaBagShopping } from "react-icons/fa6";
import { formatCurrency } from "../../../../utils/currency";
import { Flex } from "../../../../styles/basic.styles";
import { MainButton } from "../../../../styles/links.styles";
import ModalComponent from "../../../../components/ModalComponent";
import CommentBox from "../../../../components/Sales/CommentBox";
import { toast } from "react-toastify";

const ReturnDetails = () => {
	const params = useParams();

	const { token, details } = useAppSelector((state) => state.auth);

	const [load, setLoad] = useState(false);
	const [logDetails, setLogDetails] = useState<any>({});
	const [openComment, setOpenComment] = useState(false);
	const [action, setAction] = useState("");

	const currency =
		details.business?.currency?.symbol || details.business.currencyCode;

	useEffect(() => {
		window.scrollTo(0, 0);
		if (params.id) {
			loadDetails();
		}
	}, [params]);

	const loadDetails = async () => {
		try {
			setLoad(true);
			let res = await productService.logDetails(token, params.id);
			setLoad(false);
			if (res && res.id) {
				setLogDetails(res);
			}
		} catch (err) {
			setLoad(false);
			displayError(err, true);
		}
	};

	const resolveHandler = async (comment: string) => {
		try {
			setLoad(true);
			let res = await productService.resolveReturn(token, params.id, {
				comment,
				action,
			});
			setLoad(false);
			if (res) {
				loadDetails();
				toast.success(`Product has been collected and restocked!`);
			}
		} catch (err) {
			setLoad(false);
			displayError(err, true);
		}
	};

	return (
		<div>
			<TitleCover title={`Log Details`} />
			<div className="mt-3">
				{load ? (
					<SkeletonDetails />
				) : (
					logDetails?.id && (
						<ActionDetailsDiv>
							<div className="row">
								<div className="col-lg-6 mb-4">
									<DetailCard>
										<div className="head">
											<div className="sale-info">
												<h6>
													{
														logDetails?.product
															?.summary
													}
												</h6>
												<div>
													<span
														className={`status ${logDetails.status}`}
													>
														{logDetails.status}
													</span>
													<span>
														{dateFormat(
															logDetails.createdAt,
															"mmm dd, yyyy | h:MM TT"
														)}
													</span>
												</div>
											</div>
											<div className="user-info">
												<p>
													<RiShieldUserFill />
													<span>
														{
															logDetails
																.createdByUser
																?.fullName
														}
													</span>
												</p>
												<p>
													<FaBagShopping />
													<span>
														{logDetails.shop?.name}
													</span>
												</p>
											</div>
										</div>
										<div className="body">
											<div className="row">
												<span className="col-4 mb-2">
													Reason:
												</span>
												<b className="col-8 mb-2">
													{logDetails.reason}
												</b>
												<span className="col-4 mb-2">
													Quantity:
												</span>
												<b className="col-8 mb-2">
													{logDetails.quantity}
												</b>
												<span className="col-4 mb-2">
													Price:
												</span>
												<b className="col-8 mb-2">
													{currency}{" "}
													{formatCurrency(
														Number(logDetails.price)
													)}
												</b>
												<span className="col-4 mb-2">
													Value:
												</span>
												<b className="col-8 mb-2">
													{currency}{" "}
													{formatCurrency(
														Number(
															logDetails.price
														) * logDetails.quantity
													)}
												</b>
												<span className="col-4 mb-2">
													{logDetails.sale
														? "Sale"
														: "Purchase"}
													:
												</span>
												<b className="col-8 mb-2">
													{logDetails.sale ? (
														<Link
															to={`/dashboard/sales/${logDetails.sale.uniqueRef}`}
														>
															{
																logDetails.sale
																	.uniqueRef
															}
														</Link>
													) : (
														<Link
															to={`/dashboard/purchases/${logDetails.purchase.id}`}
														>
															{
																logDetails
																	.purchase
																	.uniqueRef
															}
														</Link>
													)}
												</b>
											</div>
										</div>
									</DetailCard>
									<DetailCard>
										<div className="body-detail">
											{logDetails.customer ? (
												<>
													<p>
														Customer (Walk-in)
														Details
													</p>
													<h4>
														<Link
															to={`/dashboard/customers/walk-in/${logDetails.customerId}`}
														>
															{
																logDetails
																	.customer
																	?.fullName
															}
														</Link>
													</h4>
													<div className="mt-3">
														<p>
															{
																logDetails
																	.customer
																	?.phoneNo
															}
														</p>
														<p>
															{
																logDetails
																	.customer
																	?.email
															}
														</p>
														<p>
															{
																logDetails
																	.customer
																	?.address
															}
														</p>
													</div>
												</>
											) : logDetails.subdealer ? (
												<>
													<p>Subdealer Details</p>
													<h4>
														<Link
															to={`/dashboard/customers/subdealer/${logDetails.customerId}`}
														>
															{
																logDetails
																	.subdealer
																	?.fullName
															}
														</Link>
													</h4>
													<div className="mt-3">
														<p>
															{
																logDetails
																	.subdealer
																	?.phoneNo
															}
														</p>
														<p>
															{
																logDetails
																	.subdealer
																	?.email
															}
														</p>
														<p>
															{
																logDetails
																	.subdealer
																	?.address
															}
														</p>
													</div>
												</>
											) : (
												<>
													<p>Supplier Details</p>
													<h4>
														<Link
															to={`/dashboard/suppliers/${logDetails.supplierId}`}
														>
															{
																logDetails
																	.supplier
																	?.fullName
															}
														</Link>
													</h4>
													<div className="mt-3">
														<p>
															{
																logDetails
																	.supplier
																	?.phoneNo
															}
														</p>
														<p>
															{
																logDetails
																	.supplier
																	?.email
															}
														</p>
														<p>
															{
																logDetails
																	.supplier
																	?.address
															}
														</p>
													</div>
												</>
											)}
										</div>
									</DetailCard>
								</div>
								{logDetails.status === "pending" && (
									<div className="col-lg-6 mb-3">
										<DetailCard
											style={{
												background:
													"rgba(255, 39, 37, 0.10)",
											}}
										>
											<p>
												You can resolve or restock this
											</p>
											<Flex>
												<MainButton
													onClick={() => {
														setOpenComment(true);
														setAction("resolve");
													}}
												>
													Resolve
												</MainButton>
												<MainButton
													style={{
														marginLeft: "15px",
													}}
													bg="#F44336"
													onClick={() => {
														setOpenComment(true);
														setAction("restock");
													}}
												>
													Collect and Restock
												</MainButton>
											</Flex>
										</DetailCard>
									</div>
								)}
							</div>
						</ActionDetailsDiv>
					)
				)}
			</div>
			<ModalComponent
				open={openComment}
				close={() => setOpenComment(false)}
				title={"Collect and Restock"}
			>
				<CommentBox
					submit={(comment) => {
						setOpenComment(false);
						resolveHandler(comment);
					}}
					btnName={"Collect and Restock"}
				/>
			</ModalComponent>
		</div>
	);
};

export default ReturnDetails;
