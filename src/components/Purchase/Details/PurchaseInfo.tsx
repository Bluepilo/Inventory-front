import { RiShieldUserFill } from "react-icons/ri";
import { DetailCard } from "../../../styles/sale.styles";
import dateFormat from "dateformat";
import { FaBagShopping } from "react-icons/fa6";
import { formatCurrency } from "../../../utils/currency";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../redux/hooks";
import { haveRole } from "../../../utils/role";

const PurchaseInfo = ({ purchaseDetails }: { purchaseDetails: any }) => {
	const { details } = useAppSelector((state) => state.auth);

	const currency =
		details.business?.currency?.symbol || details.business.currencyCode;

	return (
		<>
			<DetailCard>
				<div className="head">
					<div className="sale-info">
						<h6>
							{purchaseDetails.isOnboarding
								? "Import"
								: "Purchase"}{" "}
							{purchaseDetails.uniqueRef}
						</h6>
						<div>
							<span
								className={`status ${purchaseDetails.status}`}
							>
								{purchaseDetails.status}
							</span>
							<span>
								{dateFormat(
									purchaseDetails.createdAt,
									"mmm dd, yyyy | h:MM TT"
								)}
							</span>
						</div>
					</div>
					<div className="user-info">
						<p>
							<RiShieldUserFill />
							<span>{purchaseDetails.user?.fullName}</span>
						</p>
						<p>
							<FaBagShopping />
							<span>{purchaseDetails.shop?.name}</span>
						</p>
					</div>
				</div>
				<div className="body">
					{purchaseDetails.isOnboarding ? (
						<div className="row">
							<span className="col-4 mb-2">Total Price:</span>
							<b className="col-8 mb-2">
								{currency}{" "}
								{formatCurrency(purchaseDetails.totalPrice)}
							</b>
						</div>
					) : (
						<div className="row">
							<span className="col-4 mb-2">Total Purchase:</span>
							<b className="col-8 mb-2">
								{currency}{" "}
								{formatCurrency(
									Number(purchaseDetails.totalPrice) +
										Number(purchaseDetails.discount)
								)}
							</b>
							<span className="col-4 mb-2">Discount Amount:</span>
							<b className="col-8 mb-2">
								{currency}{" "}
								{formatCurrency(purchaseDetails.discount)}
							</b>
							<span className="col-4 mb-2">
								Discount Total Purchase:
							</span>
							<b className="col-8 mb-2">
								{currency}{" "}
								{formatCurrency(purchaseDetails.totalPrice)}
							</b>
							<span className="col-4 mb-2">Amount Paid:</span>
							<b className="col-8 mb-2">
								{currency}{" "}
								{formatCurrency(
									purchaseDetails.totalAmountPaid
								)}
							</b>
							<span className="col-4 mb-2">
								New Wallet Balance:
							</span>
							<b className="col-8 mb-2">
								{currency}{" "}
								{purchaseDetails.transaction?.length > 0
									? formatCurrency(
											purchaseDetails.transaction[0]
												.balanceAfter
									  )
									: "--"}
							</b>
							<span className="col-4 mb-2">Comment:</span>
							<b className="col-8 mb-2">
								{purchaseDetails.comment}
							</b>
						</div>
					)}
				</div>
			</DetailCard>
			{!purchaseDetails.isOnboarding && (
				<DetailCard>
					<div className="body-detail">
						<p>Supplied By:</p>
						<h4>
							{haveRole(details.businessRoleId)
								.isBusinessAdmin ? (
								<Link
									to={`/dashboard/suppliers/${purchaseDetails.supplierId}`}
								>
									{purchaseDetails.supplier?.name}
								</Link>
							) : (
								<span>{purchaseDetails.supplier?.name}</span>
							)}
						</h4>
						<div className="mt-3">
							<p>{purchaseDetails.supplier?.phoneNo}</p>
							<p>{purchaseDetails.supplier?.email}</p>
							<p>{purchaseDetails.supplier?.address}</p>
						</div>
					</div>
				</DetailCard>
			)}
		</>
	);
};

export default PurchaseInfo;
