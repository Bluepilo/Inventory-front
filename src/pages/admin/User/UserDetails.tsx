import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TitleCover from "../../../components/TitleCover";
import { ActionDetailsDiv, DetailCard } from "../../../styles/sale.styles";
import rewardService from "../../../redux/features/rewards/reward-service";
import { displayError } from "../../../utils/errors";
import Loading from "../../../components/Loaders/Loading";

const UserDetails = () => {
	const navigate = useNavigate();

	const user = useLocation().state;

	const [load, setLoad] = useState(false);
	const [lists, setLists] = useState([]);

	useEffect(() => {
		if (!user?.id) {
			navigate("/");
		} else {
			loadReferrals();
		}
	}, []);

	const loadReferrals = async () => {
		try {
			setLoad(true);
			let res = await rewardService.referredListAdmin(user.id);
			setLoad(false);
			if (res?.rows) {
				setLists(res.rows);
			}
		} catch (err) {
			setLoad(false);
			displayError(err, true);
		}
	};

	return user?.id ? (
		<div>
			<TitleCover title={user.fullName || "User Details"} />
			<ActionDetailsDiv>
				<div className="row">
					<div className="col-lg-6 mb-3">
						<DetailCard>
							<div className="head">
								<div className="sale-info">
									<h6>{user.fullName}</h6>
								</div>
								<div className="user-info">
									<p>
										{user.image && <img src={user.image} />}
										<span>{user.uniqueId}</span>
									</p>
								</div>
							</div>
							<div className="body">
								<div className="row">
									<span className="col-4 mb-2">Email:</span>
									<b className="col-8 mb-2">{user.email}</b>
									<span className="col-4 mb-2">
										Phone Number:
									</span>
									<b className="col-8 mb-2">{user.phoneNo}</b>
									<span className="col-4 mb-2">
										Username:
									</span>
									<b className="col-8 mb-2">
										{user.username}
									</b>
									<span className="col-4 mb-2">Address:</span>
									<b className="col-8 mb-2">{user.address}</b>
								</div>
							</div>
						</DetailCard>
					</div>
					<div className="col-lg-6 mb-3">
						<DetailCard>
							<h5 className="mb-3">
								Organizations Referred by {user.firstName}
							</h5>
							<div className="body">
								{load ? (
									<Loading />
								) : lists?.length > 0 ? (
									lists?.map((li: any) => (
										<p key={li.id}>{li.name}</p>
									))
								) : (
									<>
										<p>No organization referred.</p>
									</>
								)}
							</div>
						</DetailCard>
					</div>
				</div>
			</ActionDetailsDiv>
		</div>
	) : (
		<></>
	);
};

export default UserDetails;
