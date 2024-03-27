import React, { useEffect } from "react";
import TitleCover from "../../../components/TitleCover";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ResourceBody } from "../../../styles/basic.styles";

const ResourceDetail = () => {
	const navigate = useNavigate();

	const params = useParams();

	const stateData = useLocation().state;

	useEffect(() => {
		if (!params.name) {
			navigate(-1);
		}
	}, [params]);

	return params?.name && stateData?.id ? (
		<div>
			<TitleCover title={`Resources`} />
			<div className="mt-4">
				<ResourceBody>
					<div
						dangerouslySetInnerHTML={{ __html: stateData.answer }}
					/>
					<div className="mt-3">
						<div className="row">
							<div className="col-lg-6">
								<div className="ratio ratio-16x9">
									<iframe
										src={stateData.videoLink}
										title={stateData.question}
										allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
										allowFullScreen
									></iframe>
								</div>
							</div>
						</div>
					</div>
				</ResourceBody>
			</div>
		</div>
	) : (
		<></>
	);
};

export default ResourceDetail;
