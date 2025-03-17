import { RiShieldUserFill } from "react-icons/ri";
import { DetailCard } from "../../../styles/sale.styles";
import dateFormat from "dateformat";
import { FaBagShopping } from "react-icons/fa6";
import { formatCurrency } from "../../../utils/currency";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../redux/hooks";
import { haveRole } from "../../../utils/role";
import { displayError, displaySuccess } from "../../../utils/errors";
import salesService from "../../../redux/features/sales/sales-service";
import { Flex } from "../../../styles/basic.styles";
import { MainButton } from "../../../styles/links.styles";

const DetailsInfo = ({
	saleDetails,
	setLoad,
	complete,
}: {
	saleDetails: any;
	complete: () => void;
	setLoad: (arg: boolean) => void;
}) => {
	const { details, currency } = useAppSelector((state) => state.auth);

	const resolveHandler = async (type: string) => {
		if (window.confirm(`Are you sure you want to ${type} this?`)) {
			try {
				setLoad(true);
				await salesService.resolveSales(saleDetails.uniqueRef, {
					action: type,
					comment: type,
				});
				setLoad(false);
				complete();
				displaySuccess(
					`Sale is ${
						type === "complete" ? "now resolved" : "cancelled"
					}`
				);
			} catch (err) {
				setLoad(false);
				displayError(err, true);
			}
		}
	};

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
							{currency}{" "}
							{formatCurrency(
								Number(saleDetails.amountExpected) +
									Number(saleDetails.discount)
							)}
						</b>
						<span className="col-4 mb-2">Discount Amount:</span>
						<b className="col-8 mb-2">
							{currency} {formatCurrency(saleDetails.discount)}
						</b>
						<span className="col-4 mb-2">
							Discounted Total Sales:
						</span>
						<b className="col-8 mb-2">
							{currency} {formatCurrency(saleDetails.amountPaid)}
						</b>
						<span className="col-4 mb-2">Actual Amount Paid:</span>
						<b className="col-8 mb-2">
							{currency}{" "}
							{formatCurrency(saleDetails.actualAmountPaid)}
						</b>
						<span className="col-4 mb-2">New Wallet Balance:</span>
						<b className="col-8 mb-2">
							{currency}{" "}
							{saleDetails.transactions?.length > 0
								? formatCurrency(
										saleDetails.transactions[0].balanceAfter
								  )
								: "--"}
						</b>
						{haveRole(details.businessRoleId).isBusinessAdmin && (
							<>
								<span className="col-4 mb-2">
									Sales Margin:
								</span>
								<b className="col-8 mb-2">
									{currency}{" "}
									{formatCurrency(
										saleDetails.estimatedProfit
									)}
								</b>
							</>
						)}
						<span className="col-4 mb-2">Comment:</span>
						<b className="col-8 mb-2">{saleDetails.comment}</b>
						<span className="col-4 mb-2">SMS:</span>
						<b className="col-8 mb-2">
							{saleDetails.smsResponse || "SMS Not Sent"}
						</b>
						{saleDetails.status === "preorder" && (
							<div className="line">
								<p>
									<strong>
										This is an Advanced Sale. Will you like
										to cancel or complete it?
									</strong>
								</p>
								<Flex>
									<MainButton
										onClick={() =>
											resolveHandler("complete")
										}
									>
										<span>Resolve</span>
									</MainButton>
									<MainButton
										onClick={() => resolveHandler("cancel")}
										style={{
											marginLeft: "15px",
											border: "1px solid #505BDA",
										}}
										bg="#EDEEF0"
										color="#505BDA"
									>
										<span>Cancel</span>
									</MainButton>
								</Flex>
							</div>
						)}
					</div>
				</div>
			</DetailCard>
			<DetailCard>
				<div className="body-detail">
					<p>Purchased By:</p>
					<h4>
						<Link
							to={`/dashboard/customers/${
								saleDetails.customerId
									? `walk-in/${saleDetails.customerId}`
									: `subdealer/${saleDetails.subdealerId}`
							}`}
						>
							{saleDetails.customerName}
						</Link>
					</h4>
					<div className="mt-3">
						<p>{saleDetails.customerPhoneNo}</p>
						<p>{saleDetails.customerEmail}</p>
						<p>{saleDetails.customerAddress}</p>
					</div>
				</div>
			</DetailCard>
		</>
	);
};

export default DetailsInfo;
