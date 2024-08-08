import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import dateFormat from "dateformat";
import { formatCurrency } from "../../utils/currency";
import ReactToPrint from "react-to-print";
import { MainButton } from "../../styles/links.styles";
import { FiPrinter } from "react-icons/fi";
import TitleCover from "../../components/TitleCover";

const TransactionReceipt = () => {
	const bodyRef = useRef(null);

	const { details } = useAppSelector((state) => state.auth);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const stateData = useLocation().state;

	const currency =
		details.business?.currency?.symbol || details.business.currencyCode;

	return (
		<>
			<TitleCover title={`Print Receipt`} />
			{stateData?.id ? (
				<div>
					<div className="mt-3 text-center">
						<ReactToPrint
							content={() => bodyRef.current}
							trigger={() => {
								return (
									<MainButton>
										<FiPrinter />
										<span>Print</span>
									</MainButton>
								);
							}}
						/>
					</div>
					<div className="container" ref={bodyRef}>
						<div className="row justify-content-center">
							<div className="col-lg-6 mt-3">
								<div className="thermal shadow-sm">
									<div className="img">
										<img
											src={details.business.image}
											alt="Business"
											style={{
												height: "80px",
												width: "80px",
											}}
										/>
										<strong>
											{details?.business?.name ||
												"Bluepilo"}
										</strong>
									</div>
									<div className="info">
										<div className="row">
											<div className="col-3 mb-2">
												<b>Ref:</b>
											</div>
											<div className="col-9 mb-2">
												<span>
													{stateData.uniqueRef}
												</span>
											</div>
											<div className="col-3 mb-2">
												<b>Shop:</b>
											</div>
											<div className="col-9 mb-2">
												<span>
													{stateData.shop?.name}
												</span>
											</div>
											<div className="col-3 mb-2">
												<b>Date:</b>
											</div>
											<div className="col-9 mb-2">
												<span>
													{dateFormat(
														stateData.createdAt,
														"mmm dd, yyyy | h:MM TT"
													)}
												</span>
											</div>
											<div className="col-3 mb-2">
												<b>Billed To:</b>
											</div>
											<div className="col-9 mb-2">
												<span>
													{stateData.customerName}
												</span>
											</div>
										</div>
									</div>

									<div className="total">
										<div className="row">
											<div className="col-3 mb-2">
												<b>Payment Method</b>
											</div>
											<div className="col-9 mb-2">
												<span>
													{
														stateData.paymentMethod
															?.name
													}
												</span>
											</div>
											<div className="col-3 mb-2">
												<b>Payment Type</b>
											</div>
											<div className="col-9 mb-2">
												<span>
													{
														stateData
															.transactionType
															?.name
													}
												</span>
											</div>
											<div className="col-3 mb-2">
												<b>Amount Paid:</b>
											</div>
											<div className="col-9 mb-2">
												<span>
													{currency}{" "}
													{formatCurrency(
														stateData.amountPaid
													)}
												</span>
											</div>
										</div>
									</div>
									<div className="text-center mt-3">
										<p>
											Attended by{" "}
											{stateData.user?.fullName}
										</p>
										<p>Thanks for your patronage</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			) : (
				<></>
			)}
		</>
	);
};

export default TransactionReceipt;
