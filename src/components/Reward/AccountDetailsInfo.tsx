const AccountDetailsInfo = ({ detail }: { detail: any }) => {
	return (
		<div>
			<div className="row">
				<span className="col-4 mb-2">Bank Name:</span>
				<b className="col-8 mb-2">{detail.bankName}</b>
				<span className="col-4 mb-2">Account Name:</span>
				<b className="col-8 mb-2">{detail.accountName}</b>
				<span className="col-4 mb-2">Account Number:</span>
				<b className="col-8 mb-2">{detail.accountNumber}</b>
			</div>
		</div>
	);
};

export default AccountDetailsInfo;
