import React from "react";
import { DetailCard } from "../../../styles/sale.styles";

const OrgStats = ({ details }: { details: any }) => {
	return (
		<DetailCard>
			<h5>Stats</h5>
			<div className="body mt-3">
				<div className="row">
					<div className="col-lg-6 mb-3">
						<div className="box">
							<h6>Businesses</h6>
							<h3>{details.businesses?.length}</h3>
						</div>
					</div>
					<div className="col-lg-6 mb-3">
						<div className="box">
							<h6>Users</h6>
							<h3>{details.users?.length}</h3>
						</div>
					</div>
				</div>
			</div>
		</DetailCard>
	);
};

export default OrgStats;
