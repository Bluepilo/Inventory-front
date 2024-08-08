import { DrawerDiv } from "../../styles/basic.styles";
import { TbView360 } from "react-icons/tb";
import { MainButton, WideButton } from "../../styles/links.styles";
import OutsideClick from "../OutsideClick";
import { formatCurrency } from "../../utils/currency";
import dateFormat from "dateformat";
import PrintLogo from "../../assets/icons/print.svg";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import ReactToPrint from "react-to-print";
import { useRef } from "react";

const DrawerInfo = ({
	close,
	details,
}: {
	close: () => void;
	details: any;
}) => {
	const bodyRef = useRef(null);

	const navigate = useNavigate();

	const { details: user } = useAppSelector((state) => state.auth);

	const currency =
		user.business?.currency?.symbol || user.business.currencyCode;

	return (
		<OutsideClick handleToggle={() => close()}>
			<DrawerDiv>
				<div className="text-end">
					<MainButton
						bg="#EDEEF0"
						color="#505BDA"
						onClick={() => close()}
					>
						Close
					</MainButton>
				</div>
				{details?.id && (
					<div className="transactions">
						<div>
							<h6>Payment Ref:</h6>
							<p>{details.uniqueRef}</p>
							<h6>Amount Paid:</h6>
							<p>
								{currency} {formatCurrency(details.amountPaid)}
							</p>
							<h6>Date Made:</h6>
							<p>
								{dateFormat(details.createdAt, "mmm dd, yyyy")}
							</p>
							<h6>Payment Method:</h6>
							<p>{details.paymentMethod?.name}</p>
							<h6>Payment Type:</h6>
							<p>{details.transactionType?.name}</p>
							<h6>Shop:</h6>
							<p>{details.shop?.name || "--"}</p>
							<h6>Staff</h6>
							<p>{details.user?.fullName || "--"}</p>
							<h6>
								{details?.supplierId
									? "Supplier:"
									: details?.subealerId
									? "Subdealer:"
									: "Walk-in Customer:"}
							</h6>
							<p>{details.customerName}</p>
						</div>
						<div className="mt-4">
							<WideButton
								onClick={() =>
									navigate("/dashboard/print-preview", {
										state: details,
									})
								}
							>
								<span>Print Receipt</span>
								<img src={PrintLogo} />
							</WideButton>

							{(details.saleId || details.purchaseId) && (
								<WideButton
									bg="#EDEEF0"
									color="#505BDA"
									className="mt-3"
									onClick={() =>
										navigate(
											details.saleId
												? `/dashboard/sales/${details.saleId}`
												: `/dashboard/purchases/${details.purchaseId}`
										)
									}
								>
									<span>
										View {details.transactionType?.name}{" "}
										Info
									</span>
									<TbView360 />
								</WideButton>
							)}
						</div>
					</div>
				)}
			</DrawerDiv>
		</OutsideClick>
	);
};

export default DrawerInfo;
