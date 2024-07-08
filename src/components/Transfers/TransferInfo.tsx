import { DetailCard } from "../../styles/sale.styles";
import dateFormat from "dateformat";

const TransferInfo = ({ transferDetails }: { transferDetails: any }) => {
	return (
		<>
			<DetailCard>
				<div className="head">
					<div className="sale-info">
						<div>
							<span
								className={`status ${transferDetails.status}`}
							>
								{transferDetails.status}
							</span>
							<span>
								{dateFormat(
									transferDetails.createdAt,
									"mmm dd, yyyy | h:MM TT"
								)}
							</span>
						</div>
					</div>
				</div>
				<div className="body">
					<div className="row">
						<span className="col-4 mb-2">Transferred By:</span>
						<b className="col-8 mb-2">
							{transferDetails.createdBy?.fullName}
						</b>
						<span className="col-4 mb-2">Transfer Made From:</span>
						<b className="col-8 mb-2">
							{transferDetails.shopFrom?.name}
						</b>
						<span className="col-4 mb-2">Transfer Made To:</span>
						<b className="col-8 mb-2">
							{transferDetails.shopTo?.name}
						</b>
					</div>
				</div>
			</DetailCard>
			<DetailCard>
				<div className="head">
					<div className="sale-info">
						<div>
							<span>
								{dateFormat(
									transferDetails.updatedAt,
									"mmm dd, yyyy | h:MM TT"
								)}
							</span>
						</div>
					</div>
				</div>
				<div className="body">
					<div className="row">
						<span className="col-4 mb-2">Received By:</span>
						<b className="col-8 mb-2">
							{transferDetails.recievedBy?.fullName}
						</b>
						<span className="col-4 mb-2">Comment From Sender:</span>
						<b className="col-8 mb-2">
							{transferDetails.creatorComment}
						</b>
						<span className="col-4 mb-2">
							Comment From Receiver:
						</span>
						<b className="col-8 mb-2">
							{transferDetails.recieverComment}
						</b>
					</div>
				</div>
			</DetailCard>
		</>
	);
};

export default TransferInfo;
