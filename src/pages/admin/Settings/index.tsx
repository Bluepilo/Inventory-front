import TitleCover from "../../../components/TitleCover";
import { ProfileBox } from "../../../styles/profile.styles";
import { useAppSelector } from "../../../redux/hooks";
import Referral from "../../../components/Settings/Referral";

const Settings = () => {
	const { details } = useAppSelector((state) => state.auth);

	return (
		<div>
			<TitleCover title={`Settings`} />
			<div className="row mt-3">
				<div className="col-lg-8">
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
				</div>
			</div>
			{details.referralCode && <Referral code={details.referralCode} />}
		</div>
	);
};

export default Settings;
