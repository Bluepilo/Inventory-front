import { useEffect, useState } from "react";

import { AuthCover, AuthStyle, Hint, SlideCover } from "../styles/auth.styles";
import { Col, Row } from "react-bootstrap";
import { MdQuestionMark } from "react-icons/md";
import AuthSlider from "../components/AuthSlider";
import HintPage from "../components/HintPage";
import OutsideClick from "../components/OutsideClick";
import Logo from "../assets/images/logo.svg";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

const AuthLayout = () => {
	const navigate = useNavigate();

	const [openHint, setOpenHint] = useState(false);

	const { details } = useAppSelector((state) => state.auth);

	useEffect(() => {
		if (details && details.id) {
			signIn();
		}
	}, [details]);

	const signIn = () => {
		if (details.businessId) {
			navigate("/dashboard");
		} else {
			navigate("/admin");
		}
	};

	return (
		<AuthCover>
			<Row>
				<Col lg={7} className="d-lg-block d-none">
					<SlideCover>
						<AuthSlider />
					</SlideCover>
				</Col>
				<Col lg={5}>
					<AuthStyle>
						<div className="text-end">
							<Hint onClick={() => setOpenHint(!openHint)}>
								<MdQuestionMark size={18} />
							</Hint>
						</div>
						<div className="auth-body">
							<div className="logo">
								<img src={Logo} alt="Logo" />
							</div>
							<div className="content">
								<Outlet />
							</div>
						</div>

						{openHint && (
							<OutsideClick
								handleToggle={() => setOpenHint(false)}
							>
								<HintPage />
							</OutsideClick>
						)}
					</AuthStyle>
				</Col>
			</Row>
		</AuthCover>
	);
};

export default AuthLayout;
