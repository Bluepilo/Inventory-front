import { useEffect, useState } from "react";

import { AuthCover, AuthStyle, Hint, SlideCover } from "../styles/auth.styles";
import { Col, Row } from "react-bootstrap";
import { MdQuestionMark } from "react-icons/md";
import AuthSlider from "../components/AuthSlider";
import HintPage from "../components/HintPage";
import OutsideClick from "../components/OutsideClick";
import Logo from "../assets/images/logo.svg";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getAllCountries } from "../redux/features/basic/basic-slice";

const AuthLayout = () => {
	const navigate = useNavigate();

	const dispatch = useAppDispatch();

	const [openHint, setOpenHint] = useState(false);

	const { details } = useAppSelector((state) => state.auth);

	useEffect(() => {
		if (details && details.id) {
			signIn();
		}
	}, [details]);

	useEffect(() => {
		dispatch(getAllCountries());
	}, []);

	const signIn = () => {
		if (details.role.isAdmin) {
			navigate("/admin");
		} else if (details.businessId) {
			navigate("/dashboard");
		} else {
			navigate("/add-business");
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
