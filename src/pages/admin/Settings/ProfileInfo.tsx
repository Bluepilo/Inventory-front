import Referral from "../../../components/Settings/Referral";
import { ProfileBox } from "../../../styles/profile.styles";

const ProfileInfo = ({ details }: { details: any }) => {
	return (
		<div>
			<h5>Personal Information</h5>
			<ProfileBox>
				<div className="info" style={{ width: "50%" }}>
					{details.image ? (
						<img src={details.image} />
					) : (
						<span className="img" />
					)}
					<div className="content">
						<h6>{details.username}</h6>
					</div>
				</div>
				<div className="more">
					<p>{details.fullName}</p>
					<p>{details.phoneNo}</p>
					<p>{details.email}</p>
				</div>
			</ProfileBox>
			{details.referralCode && <Referral code={details.referralCode} />}
		</div>
	);
};

export default ProfileInfo;
