import { useState } from "react";
import { ProfileBox } from "../../../styles/profile.styles";
import { useAppSelector } from "../../../redux/hooks";
import ModalComponent from "../../../components/ModalComponent";
import OrganizationProfile from "../../../components/Settings/OrganizationProfile";
import { useNavigate } from "react-router-dom";

const ProfileInfo = () => {
	const navigate = useNavigate();

	const { details } = useAppSelector((state) => state.auth);

	const [openOrg, setOpenOrg] = useState(false);

	return (
		<div>
			<h5>Organization Profile</h5>
			<ProfileBox>
				<div className="info">
					{details.organization?.image ? (
						<img src={details.organization.image} />
					) : (
						<span className="img" />
					)}
					<div className="content">
						<h6>{details.organization?.name}</h6>
					</div>
				</div>
				<div className="more">
					<p>{details.organization?.email}</p>
					<p>{details.organization?.phone}</p>
				</div>
				<div className="btns">
					<button onClick={() => setOpenOrg(true)}>Edit</button>
				</div>
			</ProfileBox>
			<h5>Business Profile</h5>
			<ProfileBox>
				<div className="info">
					{details.business?.image ? (
						<img src={details.business.image} />
					) : (
						<span className="img" />
					)}
					<div className="content">
						<h6>{details.business?.name}</h6>
					</div>
				</div>
				<div className="more">
					<p>{details.business?.email}</p>
					<p>{details.business?.phone}</p>
					<p>{details.business?.address}</p>
				</div>
				<div className="btns">
					<button onClick={() => navigate("edit-business")}>
						Edit
					</button>
				</div>
			</ProfileBox>

			<ModalComponent
				open={openOrg}
				close={() => setOpenOrg(false)}
				title="Organization Profile"
			>
				<OrganizationProfile
					close={(arg: string) => {
						setOpenOrg(false);
						if (arg === "close") {
							navigate("close-account");
						}
					}}
				/>
			</ModalComponent>
		</div>
	);
};

export default ProfileInfo;
