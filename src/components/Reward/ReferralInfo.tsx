import { Avatar } from "../../styles/basic.styles";

const ReferralInfo = ({ detail }: { detail: any }) => {
	return (
		<div>
			<Avatar>
				{detail?.image ? <img src={detail.image} /> : <span />}
			</Avatar>
			<div className="row mt-3">
				<span className="col-4 mb-2">Full Name:</span>
				<b className="col-8 mb-2">{detail.fullName}</b>
				<span className="col-4 mb-2">Email:</span>
				<b className="col-8 mb-2">{detail.email}</b>
				<span className="col-4 mb-2">Phone Number:</span>
				<b className="col-8 mb-2">{detail.phoneNo}</b>
				<span className="col-4 mb-2">Address:</span>
				<b className="col-8 mb-2">{detail.address}</b>
				<span className="col-4 mb-2">Status:</span>
				<b className="col-8 mb-2">
					{detail.isActive ? "Active" : "Inactive"}
				</b>
			</div>
		</div>
	);
};

export default ReferralInfo;
