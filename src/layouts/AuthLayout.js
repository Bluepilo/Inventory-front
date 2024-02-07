import React from "react";
import { AuthCover, SlideCover } from "../styles/auth.styles";
import { Col, Row } from "react-bootstrap";
import AuthSlider from "../components/AuthSlider";

const AuthLayout = () => {
	return (
		<AuthCover>
			<Row>
				<Col lg={7} className="d-lg-block d-none">
					<SlideCover>
						<AuthSlider />
					</SlideCover>
				</Col>
				<Col lg={5}>
					<div className="auth"></div>
				</Col>
			</Row>
		</AuthCover>
	);
};

export default AuthLayout;
