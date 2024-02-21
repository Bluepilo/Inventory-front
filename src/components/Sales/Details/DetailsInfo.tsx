import { RiShieldUserFill } from "react-icons/ri";
import { DetailCard } from "../../../styles/sale.styles";
import dateFormat from "dateformat";
import { FaBagShopping } from "react-icons/fa6";
import { formatCurrency } from "../../../utils/currency";

const DetailsInfo = ({ saleDetails }: { saleDetails: any }) => {
	return (
		<>
			<DetailCard>
				<div className="head">
					<div className="sale-info">
						<h6>Sale {saleDetails.uniqueRef}</h6>
						<div>
							<span className={`status ${saleDetails.status}`}>
								{saleDetails.status}
							</span>
							<span>
								{dateFormat(
									saleDetails.createdAt,
									"mmm dd, yyyy | h:MM TT"
								)}
							</span>
						</div>
					</div>
					<div className="user-info">
						<p>
							<RiShieldUserFill />
							<span>{saleDetails.user?.fullName}</span>
						</p>
						<p>
							<FaBagShopping />
							<span>{saleDetails.shop?.name}</span>
						</p>
					</div>
				</div>
				<div className="body">
					<div className="row">
						<span className="col-4 mb-2">Total Sales:</span>
						<b className="col-8 mb-2">
							₦ {formatCurrency(saleDetails.amountExpected)}
						</b>
						<span className="col-4 mb-2">Discount Amount:</span>
						<b className="col-8 mb-2">
							₦ {formatCurrency(saleDetails.discount)}
						</b>
						<span className="col-4 mb-2">
							Discounted Total Sales:
						</span>
						<b className="col-8 mb-2">
							₦ {formatCurrency(saleDetails.amountPaid)}
						</b>
						<span className="col-4 mb-2">Actual Amount Paid:</span>
						<b className="col-8 mb-2">
							₦ {formatCurrency(saleDetails.actualAmountPaid)}
						</b>
						<span className="col-4 mb-2">New Wallet Balance:</span>
						<b className="col-8 mb-2">
							₦{" "}
							{saleDetails.transactions?.length > 0
								? formatCurrency(
										saleDetails.transactions[0].balanceAfter
								  )
								: "--"}
						</b>
						<span className="col-4 mb-2">Sales Margin:</span>
						<b className="col-8 mb-2">
							₦ {formatCurrency(saleDetails.estimatedProfit)}
						</b>
						<span className="col-4 mb-2">Comment:</span>
						<b className="col-8 mb-2">{saleDetails.comment}</b>
						<span className="col-4 mb-2">SMS:</span>
						<b className="col-8 mb-2">{saleDetails.smsResponse}</b>
					</div>
				</div>
			</DetailCard>
			<DetailCard>
				<div className="body-detail">
					<p>Purchased By:</p>
					<h4>{saleDetails.user?.fullName}</h4>
					<div className="mt-3">
						<p>{saleDetails.user?.phoneNo}</p>
						<p>{saleDetails.user?.email}</p>
						<p>{saleDetails.user?.address}</p>
					</div>
				</div>
			</DetailCard>
		</>
	);
};

export default DetailsInfo;
